/** @jsx jsx */
import React, { useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { useSprings, animated, to } from "@react-spring/web";

import {
  tileListContainer,
  tileList,
  driectionTileList,
  topContainer,
  activeText,
} from "./TileList.css";
import { toInteger } from "lodash-es";

let tileWidth = 0;
let tileHeight = 0;

const row1YVal = 15;
const row2YVal = 200;

const fn2 = (order, tiles) => (index) => {
  const tile = tiles[index];
  const imageUrl = process.env.PUBLIC_URL + "/" + tile.name + ".png";

  const figureX2 = (index) => {
    var result = 0;
    switch (index) {
      case 0:
        result = tileWidth * 2;
        break;
      case 1:
        result = tileWidth * 2;
        break;
      default:
        result = tileWidth * 2;
    }
    return result;
  };

  var result = {
    y: order.indexOf(index) === 0 ? row1YVal : row2YVal,
    x: figureX2(index),
    src: imageUrl,
    w: tile.nextWValue ?? 0,
    scale: 1,
    shadow: 1,
    immediate: false,
    config: { duration: 500, velocity: 0, friction: 10 }
  };

  return { ...{ z: 0 }, ...result };
};

const fn = (order, tiles, originalIndex, curIndex, y) => (index) => {
  var result = {};
  const tile = tiles[index];
  const imageUrl = process.env.PUBLIC_URL + "/" + tile.name + ".png";

  const figureY = (index) => {
    var result = 0;

    switch (index) {
      case 0:
        result = 0;
        break;
      case 1:
        result = tileWidth / 2;
        break;
      case 2:
        result = tileWidth / 2;
        break;
      case 3:
        result = tileWidth;
        break;
      case 4:
        result = tileWidth;
        break;
      case 5:
        result = tileWidth;
        break;
      default:
        result = tileWidth;
    }
    return result;
  };

  const figureX = (index) => {
    var result = 0;
    switch (index) {
      case 0:
        result = 0;
        break;
      case 1:
        result = -tileWidth / 2;
        break;
      case 2:
        result = tileWidth / 2;
        break;
      case 3:
        result = -tileWidth;
        break;
      case 4:
        result = tileWidth / 100;
        break;
      case 5:
        result = tileWidth;
        break;
      default:
        result = tileWidth * 2;
    }
    return result;
  };

  index === originalIndex
    ? (result = {
        y: curIndex + y,
        scale: 1,
        shadow: 15,
        immediate: (n) => n === "y" || n === "zIndex",
      })
    : // initial position
      (result = {
        x: figureX(order.indexOf(index)),
        y: figureY(order.indexOf(index, tile.type)),
        scale: 1,
        shadow: 1,
        immediate: false,
        src: imageUrl,
        config: { velocity: 0, friction: 10 }
      });

  return { ...{ opacity: 1, z: 0 }, ...result };
};

const right = "right";
const left = "left";

export const TileList = (props) => {
  const tiles = props.tiles;
  const directionTiles = props.directionTiles;
  const ordering = props.ordering; //inital ordering;
  const directionOrdering = props.directionOrdering;
  const lastPlayerIndex = props.lastPlayerIndex;
  const [round, setRound] = useState(0);
  const [tileSizeCalculated, setTileSizeCalculated] = useState(false);

  const [tileSprings, setTiles] = useSprings(
    tiles.length,
    fn(ordering, tiles, lastPlayerIndex)
  ); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const [directionTileSprings, setDirectionTiles] = useSprings(
    directionTiles.length,
    fn2(directionOrdering, directionTiles)
  );

  const swapArrayLocs = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };

  const orderTiles = (tileIndex) => {
    var topDirectionTile = directionTiles[directionOrdering[0]];
    var bottomDirectionTile = directionTiles[directionOrdering[1]];

    const topTileRight =
      (topDirectionTile.name === right && !topDirectionTile.flipped) ||
      (topDirectionTile.name === left && topDirectionTile.flipped);

    const topTileLeft =
      (topDirectionTile.name === left && !topDirectionTile.flipped) ||
      (topDirectionTile.name === right && topDirectionTile.flipped);

    const bottomTileLeft =
      (bottomDirectionTile.name === left && !bottomDirectionTile.flipped) ||
      (bottomDirectionTile.name === right && bottomDirectionTile.flipped);

    const bottomTileRight =
      (bottomDirectionTile.name === right && !bottomDirectionTile.flipped) ||
      (bottomDirectionTile.name === left && bottomDirectionTile.flipped);

    if (tileIndex === 0) {
      swapArrayLocs(ordering, tileIndex, 6);
      // right, left
      if (topTileRight && bottomTileLeft) {
        swapArrayLocs(ordering, 1, tileIndex);
        swapArrayLocs(ordering, 4, 1);
      }

      // left, right
      if (topTileLeft && bottomTileRight) {
        swapArrayLocs(ordering, 2, tileIndex);
        swapArrayLocs(ordering, 4, 2);
      }

      // right right
      if (topTileRight && bottomTileRight) {
        swapArrayLocs(ordering, 1, tileIndex);
        swapArrayLocs(ordering, 3, 1);
      }

      // left left
      if (topTileLeft && bottomTileLeft) {
        swapArrayLocs(ordering, 2, tileIndex);
        swapArrayLocs(ordering, 5, 2);
      }
    }

    if (tileIndex === 1) {
      // right, left || right, right
      if (topTileRight) {
        swapArrayLocs(ordering, tileIndex, 6);
        swapArrayLocs(ordering, 3, tileIndex);
      }

      // left, right || left left
      if (topTileLeft) {
        swapArrayLocs(ordering, tileIndex, 6);
        swapArrayLocs(ordering, 4, tileIndex);
      }
    }

    //Position 2
    if (tileIndex === 2) {
      // right, left || right, right
      if (topTileRight) {
        swapArrayLocs(ordering, tileIndex, 6);
        swapArrayLocs(ordering, 4, tileIndex);
      }

      // left, right || left left
      if (topTileLeft) {
        swapArrayLocs(ordering, tileIndex, 6);
        swapArrayLocs(ordering, 5, tileIndex);
      }
    }

    //Position 3
    if (tileIndex === 3) {
      swapArrayLocs(ordering, tileIndex, 6);
    }

    //Position 4
    if (tileIndex === 4) {
      swapArrayLocs(ordering, tileIndex, 6);
    }

    //Position 5
    if (tileIndex === 5) {
      swapArrayLocs(ordering, tileIndex, 6);
    }
  };

  const shuffleTiles = (tileIndex) => {
    setRound(round + 1);
    props.incrementCycle();

    if (ordering.indexOf(tileIndex) >= 6) return; //clicked extra tile

    let newOrder;
    let newDirectionOrder;
    let wasShuffled;

    orderTiles(ordering.indexOf(tileIndex));
    newOrder = ordering;

    swapArrayLocs(directionOrdering, 0, 1);
    newDirectionOrder = directionOrdering;

    directionTiles.forEach((directionTile, index) => {
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

    props.setOrdering(newOrder);
    props.setDirectionOrdering(newDirectionOrder);

    animateTiles(newOrder, newDirectionOrder, props.playerCount);
  };

  const animateTiles = useCallback((newOrder, newDirectionOrder) => {
    setTiles(fn(newOrder, tiles));

    const flippedValue = 180;
    const defaultValue = 0;

    directionTiles.forEach((directionTile) => {
      if (!directionTile.curWValue && directionTile.toFlip) {
        directionTile.nextWValue = flippedValue;
        directionTile.flipped = true;
      } else if (directionTile.curWValue && directionTile.toFlip) {
        if (directionTile.curWValue === directionTile.nextWValue) {
          directionTile.nextWValue = defaultValue;
          directionTile.flipped = false;
        }
      }
    });

    setDirectionTiles(fn2(newDirectionOrder, directionTiles));

    directionTiles.forEach((directionTile) => {
      if (directionTile.toFlip === true) {
        directionTile.toFlip = false;
        directionTile.curWValue = directionTile.nextWValue;
      }
    });
  });

  useEffect(() => {
    if (round === 0) {
      setTiles(fn(props.ordering, tiles));
      setDirectionTiles(fn2(props.directionOrdering, directionTiles));
    }
  }, [
    lastPlayerIndex,
    props.ordering,
    props.directionOrdering,
    setTiles,
    setDirectionTiles,
    tiles,
    directionTiles,
    round,
  ]);

  const getTileSize = (element) => {
    if (element) {
      tileHeight = element.getBoundingClientRect().height;
      tileWidth = element.getBoundingClientRect().width;

      //console.log(tileHeight);
      //console.log(element.getBoundingClientRect());

      if (!tileSizeCalculated) {
        setTileSizeCalculated(true);
      }
    }
  };

  return (
    <div css={tileListContainer}>
      <div css={topContainer}>
        <div css={activeText} onClick={props.back}>
          Back
        </div>
        <div css={activeText} onClick={shuffleTiles}>
          Cycle: {props.cycleCount}
        </div>
      </div>
      <div css={tileList} style={{ height: tiles.length }}>
        {tileSprings.map(
          (
            { zIndex, shadow, y, x, z, scale, opacity, backgroundColor, src },
            i
          ) => (
            <animated.img
              ref={getTileSize}
              draggable="false"
              key={i}
              onClick={() => {
                shuffleTiles(i);
              }}
              src={src}
              style={{
                backgroundColor,
                zIndex,
                opacity,
                boxShadow: shadow.to(
                  (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
                ),
                transform: to(
                  [x, y, scale, z],
                  (x, y, s, z) =>
                    `rotateZ(${z}deg) translate3d(${x}px,${y}px,0) scale(${s})`
                ),
              }}
            />
          )
        )}
      </div>
      <div css={driectionTileList} style={{ height: tiles.length }}>
        {directionTileSprings.map(
          ({ zIndex, x, y, z, w, scale, opacity, backgroundColor, src }, i) => (
            <animated.img
              draggable="false"
              key={i}
              src={src}
              style={{
                backgroundColor,
                zIndex,
                transform: to(
                  [y, x, scale, z, w],
                  (y, x, s, z, w) =>
                    `translate3d(${x}px,${y}px,0) rotateY(${w}deg) rotateZ(${z}deg) scale(${s})` //https://stackoverflow.com/questions/31079910/translate3d-rotatey-working-but-perspective-origin-not-working-why
                ),
              }}
            />
          )
        )}
      </div>
    </div>
  );
};
