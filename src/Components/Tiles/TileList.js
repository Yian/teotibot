/** @jsx jsx */
import React, {
  Component,
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { jsx } from "@emotion/react";
import { useSpring, animated, to, useTransition } from "@react-spring/web";
import { mainImg } from "../AppContainer.css";
import {
  tileListContainer,
  tileList,
  diceButton,
  diceContainer,
  nav,
  navButton,
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
} from "../Logic";
import useMeasure from "react-use-measure";
import useMedia from "../UseMedia";
import { shuffle } from "lodash-es";
import {
  AppScreen,
  baseBotTiles,
  baseDirectionTiles,
  diceTilePositions,
  Eclipse,
  initialDirectionOrdering,
  initialOrdering,
} from "../Constants";
import { cloneDeep } from "lodash-es";
import Dice from "react-dice-roll";

export const TileList = (props) => {
  const [tiles, setTiles] = useState(baseBotTiles);
  const [directionTiles, setDirectionTiles] = useState(baseDirectionTiles);
  const [ordering, setOrdering] = useState(shuffle(initialOrdering)); //inital ordering;
  const [directionOrdering, setDirectionOrdering] = useState(
    shuffle(initialDirectionOrdering)
  );
  const [eclipse, setEclipse] = useState(0);
  const [tileSizeCalculated, setTileSizeCalculated] = useState(false);
  const [tilesDisabled, setTilesDisabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showEclipseForm, setShowEclipseForm] = useState(false);
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);
  const [showDice, setShowDice] = useState(false);
  const [dice1Rolled, setDice1Rolled] = useState(0);
  const [dice2Rolled, setDice2Rolled] = useState(0);
  const [endOfGame, setEndOfGame] = useState(false);

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
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();
  const refDice1 = useRef(null);
  const refDice2 = useRef(null);

  const { transform } = useSpring({
    from: { x: 0 },
    config: { mass: 5, tension: 500, friction: 50, duration: 500 },
    transform: `translateX(${showDice ? 0 : -2000}px)`,
  });

  var tileWidth = width / (columns);
  // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
  const [tileHeights, tileItems] = useMemo(() => {
    let tileHeights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let tileItems = tiles?.map((child, i) => {
      const column = tileHeights.indexOf(Math.min(...tileHeights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = calculateXTile(ordering.indexOf(i), tileWidth, columns);
      const y = calculateYTile(ordering.indexOf(i), tileWidth, columns);
      return {
        ...child,
        index: i,
        width: tileWidth,
        x,
        y,
      };
    });
    return [tileHeights, tileItems];
  }, [ordering, columns, tiles, tileWidth]);

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
      const deg = child.nextWValue ?? 0;
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
    let wasShuffled;

    orderTiles(
      newOrder,
      newOrder.indexOf(tileIndex),
      newDirectionTiles[0],
      newDirectionTiles[1]
    );

    swapArrayLocs(newDirectionOrder, 0, 1);

    newDirectionTiles.forEach((directionTile, index) => {
      if (newDirectionOrder.indexOf(index) === 0) {
        //to move to top
        directionTile.top = true;
      } else {
        //top to bottom, and flip
        directionTile.top = false;
        directionTile.toFlip = true;
      }
    });

    setOrdering(newOrder);
    setDirectionOrdering(newDirectionOrder);

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
    setDirectionTiles(shuffle(baseDirectionTiles));
  }, []);

  useEffect(() => {
    if (dice1Rolled > 0 && dice2Rolled > 0) {
      let diceTotal = dice1Rolled + dice2Rolled;
      var tilePosition = diceTilePositions[diceTotal];
      toggle(true);
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
    setTimeout(() => {
      setShowForm(true);
      toggle(false);
    }, 700);
  };

  const onCloseClick = () => {
    setShowForm(false);
    setShowEclipseForm(false);
    setTileSizeCalculated();
    shuffleTiles(selectedTileIndex);
    setShowDice(false);
  };

  const handleClick = () => {
    setShowDice(true);
    refDice1.current.rollDice();
    refDice2.current.rollDice();
  };

  const handleEclipse = () => {
    if (eclipse <= 3) {
      setEclipse(eclipse + 1);
      setShowEclipseForm(true);
    } else {
      setEndOfGame();
    }
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

  const dFaces = [
    `${process.env.PUBLIC_URL}/dice/d1.png`,
    `${process.env.PUBLIC_URL}/dice/d2.png`,
    `${process.env.PUBLIC_URL}/dice/d3.png`,
    `${process.env.PUBLIC_URL}/dice/d4.png`,
    `${process.env.PUBLIC_URL}/dice/d5.png`,
    `${process.env.PUBLIC_URL}/dice/d6.png`,
  ];

  return (
    <div css={tileListContainer}>
      <div css={mainImg} />
      <div>
        {showForm && (
          <QuestionForm
            onCloseClick={onCloseClick}
            tileName={tiles[selectedTileIndex].name}
            eclipseStage={eclipse}
            tileSrc={tiles[selectedTileIndex].src}
          />
        )}
        {showEclipseForm && (
          <QuestionForm
            tiles={props.startTiles}
            onCloseClick={onCloseClick}
            tileName={Eclipse}
            eclipseStage={eclipse}
            tileSrc={"eclipse"}
            endOfGame={endOfGame}
            isHeightOfDevelopment={props.isHeightOfDevelopment}
          />
        )}
      </div>
      <div ref={ref} css={tileList} style={{ height: 0 }}>
        {tileTransitions((style, tile) => (
          <animated.img
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
          <animated.img
            draggable="false"
            key={directionTile.index}
            src={`${process.env.PUBLIC_URL}/bot_tiles/${directionTile.src}.png`}
            style={style}
          />
        ))}
      </div>
      <div css={nav}>
        <div css={navButton} onClick={handleClick}>
        <span>ROLL</span>
          <img src={`${process.env.PUBLIC_URL}/dice/d3.png`} alt="d3"/>
        </div>
        <span css={navButton} onClick={handleEclipse}>
          <img src={`${process.env.PUBLIC_URL}/resources/eclipse.png`} alt="eclipse"/>
          {eclipse <= 2 ? `Eclipse ${eclipse}` : "End game"}
        </span>
        <div css={navButton}>
        <img
            css={{}}
            onClick={() => props.options(AppScreen)}
            src="./resources/settings.png"
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
            size={100}
            rollingTime={generateRandomInteger(500, 1500)}
            onRoll={(value) => setDice1Rolled(value)}
            disabled
          />
          <Dice
            ref={refDice2}
            faces={dFaces}
            size={100}
            rollingTime={generateRandomInteger(500, 1500)}
            onRoll={(value) => setDice2Rolled(value)}
            disabled
          />
        </animated.div>
      </div>
    </div>
  );
};
