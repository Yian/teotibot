/** @jsx jsx */
import React, { useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { useGesture } from "react-use-gesture";
import clamp from "lodash.clamp";
import swap from "lodash-move";
import every from "lodash.every";
import { useSprings, animated, to } from "@react-spring/web";

import {
  tileListContainer,
  topContainer,
  tileList,
  activeText,
} from "./TileList.css";
import shuffle from "lodash.shuffle";
import { indexOf } from "lodash-es";

let tileWidth = 0;
let tileHeight = 0;

const row1YVal = 50;
const row2YVal = 275;
const row3YVal = 525;
const row4XVal = 800;

const figureW = (tile, round, bothTilesFlipped) => {
  let w = tile.nextWValue ?? 0;
  return w;
};

const fn2 = (order, tiles, round, bothTilesFlipped) => (index) => {
  const tile = tiles[index];
  const imageUrl = process.env.PUBLIC_URL + "/" + tile.name + ".png";

  var result = {
    y: order.indexOf(index) === 0 ? row1YVal : row2YVal,
    src: imageUrl,
    w: figureW(tile, round, bothTilesFlipped),
    scale: 1,
    backgroundColor: tile.name === "left" ? "red" : "blue",
    shadow: 1,
    immediate: false,
  };
  return { ...{ z: 0 }, ...result };
};

const fn =
  (
    order,
    tiles,
    lastPlayerIndex,
    heightCalculated,
    originalIndex,
    curIndex,
    y
  ) =>
  (index) => {
    var result = {};
    const tile = tiles[index];
    const imageUrl = process.env.PUBLIC_URL + "/" + tile.name + ".png";

    const figureY = (index) => {
      var result = 0;

      switch (index) {
        case 0:
          result = row1YVal;
          break;
        case 1:
          result = row2YVal;
          break;
        case 2:
          result = row2YVal;
          break;
        case 3:
          result = row3YVal;
          break;
        case 4:
          result = row3YVal;
          break;
        case 5:
          result = row3YVal;
          break;
        default:
          result = row3YVal;
      }
      return result;
    };

    const figureX = (index) => {
      var result = 0;
      switch (index) {
        case 0:
          result = -150;
          break;
        case 1:
          result = -450;
          break;
        case 2:
          result = 50;
          break;
        case 3:
          result = -650;
          break;
        case 4:
          result = -200;
          break;
        case 5:
          result = 250;
          break;
        default:
          result = 800;
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
        });

    return { ...{ opacity: 1, z: 0 }, ...result };
  };

export const TileList = (props) => {
  const tiles = props.tiles;
  const directionTiles = props.directionTiles;
  const ordering = props.ordering; //inital ordering;
  const directionOrdering = props.directionOrdering;
  const lastPlayerIndex = props.lastPlayerIndex;
  const [round, setRound] = useState(0);
  const [tileSizeCalculated, setTileSizeCalculated] = useState(false);
  const [bothTilesFlipped, setBothTilesFlipped] = useState(false);

  const [tileSprings, setSprings] = useSprings(
    tiles.length,
    fn(ordering, tiles, lastPlayerIndex)
  ); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const [directionTileSprings, setDirectionTileSprings] = useSprings(
    directionTiles.length,
    fn2(directionOrdering, directionTiles, round)
  );

  const swapArrayLocs = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };

  const shuffleTiles = () => {
    setRound(round + 1);

    props.incrementCycle();
    let newOrder;
    let newDirectionOrder;
    let wasShuffled;

    swapArrayLocs(ordering, 0, 6);
    newOrder = ordering;

    swapArrayLocs(directionOrdering, 0, 1);
    newDirectionOrder = directionOrdering;

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
    setSprings(fn(newOrder, tiles, lastPlayerIndex));

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

    directionTiles.forEach((directionTile, index) => {
        if (directionTile.toFlip && !directionTile.flipped) {
          directionTile.nextWValue = 180;
        }
        if (directionTile.toFlip && directionTile.flipped) {
          directionTile.nextWValue = 0;
          if (directionTile.nextWValue === directionTile.curWValue) {
            directionTile.nextWValue = 180;
          }
        }
    })

    setDirectionTileSprings(fn2(newDirectionOrder, directionTiles, round, bothTilesFlipped));

    directionTiles.forEach((directionTile, index) => {
      if (directionTile.toFlip === true) {
        directionTile.flipped = true;
        directionTile.toFlip = false;
        directionTile.curWValue = directionTile.nextWValue;
      }
    });
  });

  useEffect(() => {
    if (round === 0) {
      setSprings(fn(props.ordering, tiles, lastPlayerIndex));
    }
  }, [lastPlayerIndex, props.ordering, round, setSprings, tiles]);

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
            { zIndex, shadow, x, y, z, scale, opacity, backgroundColor, src },
            i
          ) => (
            <animated.img
              ref={getTileSize}
              draggable="false"
              key={i}
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
      <div css={tileList} style={{ height: tiles.length }}>
        {directionTileSprings.map(
          ({ zIndex, y, z, w, scale, opacity, backgroundColor, src }, i) => (
            <animated.img
              draggable="false"
              key={i}
              src={src}
              style={{
                backgroundColor,
                zIndex,
                transform: to(
                  [y, scale, z, w],
                  (y, s, z, w) =>
                    `rotateY(${w}deg) rotateZ(${z}deg) translate3d(0px,${y}px,0) scale(${s})`
                ),
              }}
            />
          )
        )}
      </div>
    </div>
  );
};
