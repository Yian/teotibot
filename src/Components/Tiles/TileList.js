/** @jsx jsx */
import React, {
  Component,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { jsx } from "@emotion/react";
import { useSprings, animated, to, useTransition } from "@react-spring/web";
import { mainImg } from "../AppContainer.css";

import { tileListContainer, tileList, directionTileList } from "./TileList.css";
import { QuestionForm } from "../QuestionForm";
import {
  calculateXDirectionTile,
  calculateXTile,
  calculateYTile,
  right,
  left,
  orderTiles,
  swapArrayLocs,
  calculateYDirectionTile,
} from "../Logic";
import useMeasure from "react-use-measure";
import useMedia from "../UseMedia";
import { shuffle } from "lodash-es";
import { baseBotTiles, baseDirectionTiles, initialDirectionOrdering, initialOrdering } from "../Constants";
import { cloneDeep } from "lodash-es";

export const TileList = (props) => {
  const [tiles, setTiles] = useState(baseBotTiles);
  const [directionTiles, setDirectionTiles] = useState(baseDirectionTiles);
  const [ordering, setOrdering] = useState(shuffle(initialOrdering)); //inital ordering;
  const [directionOrdering, setDirectionOrdering] = useState(shuffle(initialDirectionOrdering));
  const [round, setRound] = useState(0);
  const [tileSizeCalculated, setTileSizeCalculated] = useState(false);
  const [tilesDisabled, setTilesDisabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);

  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)", "(max-width: 480px)"],
    [6, 5, 4, 3],
    4
  );
  // Hook2: Measure the width of the container element
  const [ref, { width }] = useMeasure();

  var tileWidth = width/columns;
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
    update: ({ x, y, width }) => ({ x, y, width, }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 25,
  });

  const [directionTileHeights, directionTileItems] = useMemo(() => {
    let directionTileHeights = new Array(columns).fill(0); // Each column gets a height starting with zero
    let directionTileItems = directionTiles?.map((child, i) => {
      const column = directionTileHeights.indexOf(Math.min(...directionTileHeights)); // Basic masonry-grid placing, puts tile into the smallest column using Math.min
      const x = calculateXDirectionTile(directionOrdering.indexOf(i), tileWidth, columns);
      const y = calculateYDirectionTile(directionOrdering.indexOf(i), tileWidth, columns);
      console.log(x);
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
    from: ({ x, y, rotateY, width  }) => ({ x, y, width, rotateY, opacity: 0 }),
    enter: ({ x, y, rotateY, width  }) => ({ x, y, width, rotateY, opacity: 1 }),
    update: ({ x, y, rotateY, width  }) => ({ x, y, width, rotateY, }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 50 },
    trail: 25,
  });

  const shuffleTiles = (tileIndex) => {
   props.incrementCycle();

    if (tilesDisabled) return;

    setTilesDisabled(true);

    setTimeout(() => {
      setTilesDisabled(false);
    }, 1000);

    if (ordering.indexOf(tileIndex) >= 6) return; //clicked extra tile

    let newOrder = cloneDeep(ordering);;
    let newDirectionOrder = cloneDeep(directionOrdering);
    let newDirectionTiles = cloneDeep(directionTiles);
    let wasShuffled;

    orderTiles(newOrder, newOrder.indexOf(tileIndex), newDirectionTiles[0], newDirectionTiles[1]);

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

    props.addToHistory({
      cycle: props.cycleCount,
      order: newOrder,
      wasShuffled: wasShuffled,
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
    if (round === 0) {
      setDirectionTiles(shuffle(baseDirectionTiles));
    }
  }, [ ]);

  const showSteps = (i) => {
    setSelectedTileIndex(i);
    setShowForm(true);
  };

  const onCloseClick = (i) => {
    setShowForm(false);
    shuffleTiles(selectedTileIndex);
  };

  return (
    <div css={tileListContainer}>
      <div css={mainImg} onClick={onCloseClick} />
      <div>
        {showForm && (
          <QuestionForm
            onCloseClick={onCloseClick}
            tileName={"alchemy"}
          />
        )}
      </div>
      <div ref={ref} css={tileList} style={{ height: tiles.length }}>
        {tileTransitions((style, tile) => (
          <animated.img
            draggable="false"
            key={tile.key}
            onClick={() => {
              showSteps(tile.index);
            }}
            src={`${process.env.PUBLIC_URL}/BotTiles/${tile.name}.png`}
            style={style}
          />
        ))}
      </div>
      <div css={tileList} style={{ height: tiles.length }}>
        {directionTileTransitions((style, directionTile) => (
            <animated.img
              draggable="false"
              key={directionTile.index}
              src={`${process.env.PUBLIC_URL}/BotTiles/${directionTile.name}.png`}
              style={style}
            />
          ))}
      </div>
    </div>
  );
};
