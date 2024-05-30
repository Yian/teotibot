/** @jsx jsx */
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import { jsx } from "@emotion/react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { mainImg } from "../AppContainer.css";
import {
  tileListContainer,
  tileList,
  diceContainer,
  nav,
  navButton,
  directionTileImage,
  empire,
} from "./TileList.css";
import { QuestionForm } from "../QuestionForm";
import {
  calculateXDirectionTile,
  calculateXTile,
  calculateYTile,
  orderTiles,
  swapArrayLocs,
  calculateYDirectionTile,
  generateRandomInteger,
  getRandom,
} from "../Logic";
import useMeasure from "react-use-measure";
import useMedia from "../UseMedia";
import { shuffle } from "lodash-es";
import {
  AppScreen,
  baseDirectionTiles,
  baseStartTiles,
  xitleStartTiles,
  diceTilePositions,
  Eclipse,
  initialDirectionOrdering,
  initialAlternativeDirectionOrdering,
  initialOrdering,
  alternativeDirectionTilesStep2,
  alternativeDirectionTilesStep3,
  dFaces,
  botTiles,
} from "../Constants";
import { cloneDeep } from "lodash-es";
import Dice from "react-dice-roll";
import { reactLocalStorage } from "reactjs-localstorage";
import { PathTiles } from "./PathTiles";

export const TileList = (props) => {
  const getInitialDirectionTileOrder = useCallback(() => {
    var currentDirectionTileOrdering = JSON.parse(
      reactLocalStorage.get("directionTileOrdering") ?? null
    );

    var defaultDirectionTileOrdering = shuffle(
      props.isAlternateTeotibotMovement
        ? initialAlternativeDirectionOrdering
        : initialDirectionOrdering
    );

    if (
      (currentDirectionTileOrdering && currentDirectionTileOrdering.length) !==
      defaultDirectionTileOrdering.length
    ) {
      //we've changed the setting
      currentDirectionTileOrdering = defaultDirectionTileOrdering;
    }

    return currentDirectionTileOrdering ?? defaultDirectionTileOrdering;
  }, [props.isAlternateTeotibotMovement]);

  const getInitialOrdering = useCallback(() => {
    return (
      JSON.parse(reactLocalStorage.get("tileOrdering") ?? null) ??
      shuffle(initialOrdering)
    );
  }, []);

  const getInitialEclipseStage = useCallback(() => {
    return JSON.parse(reactLocalStorage.get("eclipseStage") ?? null) ?? 0;
  }, []);

  const getInitialStepsUntilEclipse = useCallback(() => {
    return (
      JSON.parse(reactLocalStorage.get("stepsUntilEclipse") ?? null) ??
      initialStepsUntilEclipse
    );
  }, []);

  const initialStepsUntilEclipse = 10;
  const [tiles, setTiles] = useState([]);
  const [startTiles, setStartTiles] = useState([]);
  const [directionTiles, setDirectionTiles] = useState([]);
  const [ordering, setOrdering] = useState(getInitialOrdering); //inital ordering;
  const [directionOrdering, setDirectionOrdering] = useState(
    getInitialDirectionTileOrder
  );
  const [eclipseStage, setEclipseStage] = useState(getInitialEclipseStage);
  const [stepsUntilEclipse, setStepsUntilEclipse] = useState(
    getInitialStepsUntilEclipse
  );
  const [tilesDisabled, setTilesDisabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEmpire, setShowEmpire] = useState(false);
  const [showEclipseForm, setShowEclipseForm] = useState(false);
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);
  const [showDice, setShowDice] = useState(false);
  const [enableRoll, setEnableRoll] = useState(true);
  const [dice1Rolled, setDice1Rolled] = useState(0);
  const [dice2Rolled, setDice2Rolled] = useState(0);

  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    [
      "(min-width: 1500px)",
      "(min-width: 1000px)",
      "(min-width: 600px)",
      "(max-width: 480px)",
    ],
    [4, 4, 4, 3],
    4
  );

  const checkOrientation = useMedia(
    ["(orientation: landscape)"],
    [true],
    false
  );

  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();
  const refDice1 = useRef(null);
  const refDice2 = useRef(null);

  const { transform } = useSpring({
    from: { x: 0 },
    config: { mass: 5, tension: 500, friction: 50, duration: 500 },
    transform: `translateX(${showDice ? 0 : -2000}px)`,
  });

  var tileWidth = width / columns;
  var mapWidth = width / (columns*2);

  if (checkOrientation) {
    tileWidth = width / (columns / 0.8);
  }

  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [tileHeights, tileItems] = useMemo(() => {
    let tileHeights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let tileItems = tiles?.map((child, i) => {
      const column = tileHeights.indexOf(Math.min(...tileHeights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = calculateXTile(
        ordering.indexOf(i),
        tileWidth,
        columns,
        props.isAlternateTeotibotMovement
      );
      const y = calculateYTile(
        ordering.indexOf(i),
        tileWidth,
        columns,
        props.isAlternateTeotibotMovement
      );
      return {
        ...child,
        index: i,
        width: tileWidth,
        x,
        y,
      };
    });
    return [tileHeights, tileItems];
  }, [ordering, columns, tiles, tileWidth, props.isAlternateTeotibotMovement]);

  const tileTransitions = useTransition(tileItems, {
    key: (item) => item.index,
    from: ({ x, y, width }) => ({ x, y, width, opacity: 0 }),
    enter: ({ x, y, width }) => ({ x, y, width, opacity: 1 }),
    update: ({ x, y, width }) => ({ x, y, width }),
    leave: { height: 0, opacity: 0 },
    config: { duration: 500, mass: 5, tension: 500, friction: 50 },
    trail: 25,
  });

  const [directionTileHeights, directionTileItems] = useMemo(() => {
    let directionTileHeights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let directionTileItems = directionTiles?.map((child, i) => {
      const column = directionTileHeights.indexOf(
        Math.min(...directionTileHeights)
      ); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = calculateXDirectionTile(
        directionOrdering.indexOf(i),
        tileWidth,
        columns
      );
      const y = calculateYDirectionTile(
        directionOrdering.indexOf(i),
        tileWidth,
        columns
      );

      let deg = child.nextWValue ?? 0;

      if (child.nextWValue === 0 && child.stepTile) {
        child.css = child.initialCss;
      } else if (child.nextWValue === 180 && child.stepTile) {
        child.css = child.flippedCss;
      }

      return {
        ...child,
        index: i,
        width: tileWidth,
        x,
        y,
        rotateY: deg,
      };
    });
    return [directionTileHeights, directionTileItems];
  }, [directionOrdering, columns, directionTiles, tileWidth]);

  const directionTileTransitions = useTransition(directionTileItems, {
    key: (item) => item.index,
    from: ({ x, y, rotateY, width }) => ({ x, y, width, rotateY, opacity: 0 }),
    enter: ({ x, y, rotateY, width }) => ({ x, y, width, rotateY, opacity: 1 }),
    update: ({ x, y, rotateY, width }) => ({ x, y, width, rotateY }),
    leave: { height: 0, opacity: 0 },
    config: { duration: 500, mass: 5, tension: 500, friction: 50 },
    trail: 25,
  });

  // const [empireTileItems] = useMemo(() => {
  //   let empireTileItems = empireTiles?.map((child, i) => {
  //     const x = calculateXEmpireTile(mapWidth, columns, props.isAlternateTeotibotMovement);
  //     const y = calculateYEmpireTile(mapWidth, columns, props.isAlternateTeotibotMovement);

  //     return {
  //       ...child,
  //       width: mapWidth,
  //       x,
  //       y,
  //     };
  //   });
  //   return [empireTileItems];
  // }, [columns, mapWidth, tileWidth, props.isAlternateTeotibotMovement]);

  // const empireTileItemTransitions = useTransition(empireTileItems, {
  //   key: (item) => item.index,
  //   from: ({ x, y, rotateY, width }) => ({ x, y, width, rotateY, opacity: 0 }),
  //   enter: ({ x, y, rotateY, width }) => ({ x, y, width, rotateY, opacity: 1 }),
  //   update: ({ x, y, rotateY, width }) => ({ x, y, width, rotateY }),
  //   leave: { height: 0, opacity: 0 },
  //   config: { duration: 500, mass: 5, tension: 500, friction: 50 },
  //   trail: 25,
  // });

  const shuffleTiles = (tileIndex) => {
    if (ordering.indexOf(tileIndex) >= 6 || ordering.indexOf(tileIndex) === 4)
      return; //clicked extra tiles

    if (tilesDisabled) return;

    setTilesDisabled(true);

    setTimeout(() => {
      setTilesDisabled(false);
    }, 1000);

    let newOrder = cloneDeep(ordering);
    let newDirectionOrder = cloneDeep(directionOrdering);
    let newDirectionTiles = cloneDeep(directionTiles);

    orderTiles(
      newOrder,
      newOrder.indexOf(tileIndex),
      newDirectionTiles[newDirectionOrder[0]],
      newDirectionTiles[newDirectionOrder[1]]
    );

    if (props.isAlternateTeotibotMovement) {
      //4 Direction tiles
      swapArrayLocs(newDirectionOrder, 0, 3);
      swapArrayLocs(newDirectionOrder, 0, 2);
      swapArrayLocs(newDirectionOrder, 0, 1);
    } else {
      //Just 2 tiles
      swapArrayLocs(newDirectionOrder, 0, 1);
    }

    newDirectionTiles.forEach((directionTile, index) => {
      if (newDirectionOrder.indexOf(index) === 0) {
        //to move to top
        directionTile.top = true;
      } else if (
        newDirectionOrder.indexOf(index) ===
        newDirectionOrder.length - 1
      ) {
        //top to bottom, and flip
        directionTile.top = false;
        directionTile.toFlip = true;
      }
    });

    setOrdering(newOrder);
    reactLocalStorage.set("tileOrdering", JSON.stringify(newOrder));
    setDirectionOrdering(newDirectionOrder);
    reactLocalStorage.set(
      "directionTileOrdering",
      JSON.stringify(newDirectionOrder)
    );

    animateTiles(newDirectionTiles);
  };

  const animateTiles = useCallback((newDirectionTiles) => {
    const flippedValue = 180;
    const defaultValue = 0;

    newDirectionTiles.forEach((directionTile) => {
      if (!directionTile.curWValue && directionTile.toFlip) {
        directionTile.nextWValue = flippedValue;
        directionTile.flipped = true;
      } else if (directionTile.curWValue && directionTile.toFlip) {
        if (directionTile.curWValue === directionTile.nextWValue) {
          directionTile.nextWValue = defaultValue;
          directionTile.flipped = false;
        }
      }
    }, []);

    newDirectionTiles.forEach((directionTile) => {
      if (directionTile.toFlip === true) {
        directionTile.toFlip = false;
        directionTile.curWValue = directionTile.nextWValue;
      }
    });

    setDirectionTiles(newDirectionTiles);
  });

  useEffect(() => {
    setTiles(botTiles(props.isAltarsAndShamans, props.isEmpires));
  }, [props.isAltarsAndShamans, props.isEmpires]);

  useEffect(() => {
    const tiles = props.isXitle
      ? [...baseStartTiles, ...xitleStartTiles]
      : baseStartTiles;
    setStartTiles(tiles);
  }, [props.isXitle]);

  useEffect(() => {
    const directionTilesList = props.isAlternateTeotibotMovement
      ? [
          ...baseDirectionTiles,
          ...getRandom(alternativeDirectionTilesStep2, 1),
          ...getRandom(alternativeDirectionTilesStep3, 1),
        ]
      : baseDirectionTiles;
    setDirectionTiles(directionTilesList);

    setDirectionOrdering(getInitialDirectionTileOrder);
  }, [props.isAlternateTeotibotMovement, getInitialDirectionTileOrder]);

  useEffect(() => {
    if (dice1Rolled > 0 && dice2Rolled > 0) {
      let diceTotal = dice1Rolled + dice2Rolled;
      var tilePosition = diceTilePositions[diceTotal];
      setDice1Rolled(0);
      setDice2Rolled(0);
      showSteps(ordering[tilePosition]);
      setTimeout(() => {
        setShowDice(false);
      }, 500);
    }
  }, [dice1Rolled, dice2Rolled, ordering]);

  const [state, toggle] = useState(false);

  const { x, api } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
    loop: true,
  });

  const showSteps = (i) => {
    setSelectedTileIndex(i);
    toggle(true);
    setTimeout(() => {
      setShowForm(true);
      toggle(false);
    }, 700);
  };

  const onCloseClick = (shouldShuffle) => {
    setShowForm(false);
    setShowEclipseForm(false);
    setShowEmpire(false);
    if (shouldShuffle) {
      shuffleTiles(selectedTileIndex);
    }
    setShowDice(false);
  };

  const handleRollClick = () => {
    if (enableRoll) {
      setShowDice(true);
      refDice1.current.rollDice();
      refDice2.current.rollDice();
      setEnableRoll(false);

      setTimeout(() => {
        setEnableRoll(true);
      }, 2000);
    }
  };

  const moveEclipse = (newEclipseValue) => {
    setEclipseStage(newEclipseValue);
    reactLocalStorage.set("eclipseStage", JSON.stringify(newEclipseValue));
  };

  const handleEclipseClick = () => {
    if (props.isAscend) return;

    if (eclipseStage <= 2) {
      moveEclipse(eclipseStage + 1);

      setShowEclipseForm(true);
    }
  };

  const getStepsLimit = (isDarkEclipse) => {
    return !isDarkEclipse ? 0 : 1;
  };

  const handleAscendClick = () => {
    let newStepsUntilEclipse = 0;

    if (eclipseStage <= 2) {
      newStepsUntilEclipse = stepsUntilEclipse - 1;
      setStepsUntilEclipse(newStepsUntilEclipse);
      reactLocalStorage.set(
        "stepsUntilEclipse",
        JSON.stringify(newStepsUntilEclipse)
      );
    }

    if (
      stepsUntilEclipse <= getStepsLimit(props.isDarkEclipse) &&
      eclipseStage <= 2
    ) {
      let eclipseValue = eclipseStage + 1;
      newStepsUntilEclipse = initialStepsUntilEclipse - eclipseValue;

      moveEclipse(eclipseValue);
      setStepsUntilEclipse(newStepsUntilEclipse);
      reactLocalStorage.set(
        "stepsUntilEclipse",
        JSON.stringify(newStepsUntilEclipse)
      );
      setShowEclipseForm(true);
    }
  };

  const onCancelEclipseClick = () => {
    let newEclipseValue = eclipseStage - 1;

    setEclipseStage(newEclipseValue);
    reactLocalStorage.set("eclipseStage", JSON.stringify(newEclipseValue));

    setStepsUntilEclipse(getStepsLimit(props.isDarkEclipse));
    reactLocalStorage.set(
      "stepsUntilEclipse",
      JSON.stringify(getStepsLimit(props.isDarkEclipse))
    );

    setShowEclipseForm(false);
  };

  const onShowEmpireClick = () => {
    setShowEmpire(true);
  };

  const getStyle = useCallback(
    (item) => {
      var test = {
        scale: x.to({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
        }),
      };

      return item.index === selectedTileIndex ? test : {};
    },
    [x, selectedTileIndex]
  );

  return (
    <div css={tileListContainer}>
      <div css={mainImg} />
      <div>
        {showForm && (
          <QuestionForm
            onCloseClick={(shouldShuffle) => onCloseClick(shouldShuffle)}
            tileName={tiles[selectedTileIndex].name}
            eclipseStage={eclipseStage}
            tileSrc={tiles[selectedTileIndex].src}
            teotibotResourcesToGain={props.teotibotResourcesToGain}
            teotibotStepsPerWorship={props.teotibotStepsPerWorship}
            teotibotVPFor10Cocoa={props.teotibotVPFor10Cocoa}
            isAlternateTeotibotMovement={props.isAlternateTeotibotMovement}
            isObsidian={props.isObsidian}
            isMansion={props.isMansion}
            isAltarsAndShamans={props.isAltarsAndShamans}
            isEmpires={props.isEmpires}
            isAdvanced={props.isAdvanced}
            topDirectionTile={directionTiles[directionOrdering[0]]}
          />
        )}
        {showEclipseForm && (
          <QuestionForm
            tiles={cloneDeep(startTiles)}
            onCloseClick={(shouldShuffle) => onCloseClick(shouldShuffle)}
            onCancelEclipseClick={(shouldShuffle) =>
              onCancelEclipseClick(shouldShuffle)
            }
            tileName={Eclipse}
            eclipseStage={eclipseStage}
            tileSrc={"eclipse"}
            isHeightOfDevelopment={props.isHeightOfDevelopment}
            teotibotVPForTechTiles={props.teotibotVPForTechTiles}
            teotibotVPForTempleTiles={props.teotibotVPForTempleTiles}
          />
        )}
      </div>
      {props.isEmpires && <img
        css={empire}
        src={`${process.env.PUBLIC_URL}/empire/empire_map.jpg`}
        onClick={onShowEmpireClick}
      />}
      {showEmpire && (
        <PathTiles
          onCloseClick={(shouldShuffle) => onCloseClick(shouldShuffle)}
        />
      )}
      <div ref={ref} css={tileList} style={{ height: 0 }}>
        {tileTransitions((style, tile) => (
          <animated.img
            onContextMenu={(e) => e.preventDefault()}
            draggable="false"
            key={tile.key}
            onClick={() => {
              showSteps(tile.index);
            }}
            src={`${process.env.PUBLIC_URL}/bot_tiles/${tile.src}.png`}
            style={{ ...style, ...getStyle(tile) }}
          />
        ))}
      </div>
      <div css={tileList} style={{ height: 0 }}>
        {directionTileTransitions((style, directionTile) => (
          <animated.div
            onContextMenu={(e) => e.preventDefault()}
            draggable="false"
            key={directionTile.index}
            css={[directionTileImage, directionTile.css]}
            style={style}
          />
        ))}
      </div>
      {/* <div css={tileList}>
        {empireTileItemTransitions((style, empireTile) => (
          <animated.img
            onContextMenu={(e) => e.preventDefault()}
            draggable="false"
            key={empireTile.index}
            onClick={onShowEmpireClick}
            src={`${process.env.PUBLIC_URL}/empire/${empireTile.name}.jpg`}
            style={style}
          />
        ))}
      </div> */}
      <div css={nav}>
        <div css={navButton} onClick={handleRollClick}>
          <img src={`${process.env.PUBLIC_URL}/dice/d3.png`} alt="d3" />
        </div>
        {props.isAscend && (
          <span css={navButton} onClick={handleAscendClick}>
            <img
              src={`${process.env.PUBLIC_URL}/game_resources/ascension.png`}
              alt="eclipse"
            />
            {eclipseStage <= 2 ? `Eclipse in ${stepsUntilEclipse}` : ""}
          </span>
        )}
        <span css={navButton} onClick={handleEclipseClick}>
          <img
            src={`${process.env.PUBLIC_URL}/game_resources/eclipse.png`}
            alt="eclipse"
          />
          {eclipseStage <= 2 ? `Eclipse ${eclipseStage}` : "Game over"}
        </span>
        <div css={navButton}>
          <img
            css={{}}
            onClick={() => props.options(AppScreen)}
            src="./game_resources/settings.png"
            alt="Settings"
          />
        </div>
      </div>
      <div css={diceContainer} style={{ zIndex: showDice ? 5 : 1 }}>
        <animated.div
          style={{
            display: "flex",
            transform,
          }}
        >
          <Dice
            ref={refDice1}
            faces={dFaces}
            size={150}
            rollingTime={generateRandomInteger(500, 1500)}
            onRoll={(value) => setDice1Rolled(value)}
            disabled
          />
          <Dice
            ref={refDice2}
            faces={dFaces}
            size={150}
            rollingTime={generateRandomInteger(500, 1500)}
            onRoll={(value) => setDice2Rolled(value)}
            disabled
          />
        </animated.div>
      </div>
    </div>
  );
};
