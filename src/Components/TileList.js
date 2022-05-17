/** @jsx jsx */
import React, { useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { useGesture } from "react-use-gesture";
import clamp from "lodash.clamp";
import swap from "lodash-move";
import { useSprings, animated, interpolate } from "react-spring";
import {
  tileListContainer,
  topContainer,
  tileList,
  activeText,
} from "./TileList.css";

let tileWidth = 0;
let tileHeight = 0;

const fn2 = (tiles) => {};

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
          result = 50;
          break;
        case 1:
          result = 275;
          break;
        case 2:
          result = 275;
          break;
        case 3:
          result = 525;
          break;
        case 4:
          result = 525;
          break;
        case 5:
          result = 525;
          break;
        case 6:
          result = 50;
          break;
        case 7:
          result = 275;
          break;
        case 8:
          result = 525;
          break;
        default:
          result = 0;
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
        case 6:
          result = 800;
          break;
        case 7:
          result = 800;
          break;
        case 8:
          result = 800;
          break;
        default:
          result = 0;
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
          y: figureY(order.indexOf(index)),
          scale: 1,
          shadow: 1,
          immediate: false,
          src: imageUrl,
        });

    return { ...{ opacity: 1, z: 0 }, ...result };
  };

export const TileList = (props) => {
  const tiles = props.tiles;
  const ordering = props.ordering; //inital ordering;
  const lastPlayerIndex = props.lastPlayerIndex;
  const [round, setRound] = useState(0);
  const [tileSizeCalculated, setTileSizeCalculated] = useState(false);

  const [tileSprings, setSprings] = useSprings(
    tiles.length,
    fn(ordering, tiles, lastPlayerIndex)
  ); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    if (round <= 0) {
      const curIndex = ordering.indexOf(originalIndex);
      const curRow = clamp(Math.round(curIndex + y), 0, tiles.length - 1);
      const newOrder = swap(ordering, curIndex, curRow);
      setSprings(
        fn(
          newOrder,
          tiles,
          lastPlayerIndex,
          down,
          originalIndex,
          curIndex,
          y,
          props.playerCount
        )
      ); // Feed springs new style data, they'll animate the view without causing a single render
      if (!down) {
        props.setOrdering(newOrder);
        props.addToHistory({
          cycle: props.cycleCount,
          order: newOrder,
          wasShuffled: true,
        });
      }
    }
  });

  const swapArrayLocs = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  };

  const shuffleTiles = () => {
    setRound(round + 1);

    props.incrementCycle();
    let newOrder;
    let wasShuffled;
    swapArrayLocs(ordering, 0, 6);
    newOrder = ordering;

    props.addToHistory({
      cycle: props.cycleCount,
      order: newOrder,
      wasShuffled: wasShuffled,
    });

    props.setOrdering(newOrder);
    animateTiles(newOrder, props.playerCount);
  };

  const animateTiles = useCallback((newOrder) => {
    tiles.forEach((tile) => {
      tile.shuffling = true;
    });

    setSprings(fn(newOrder, tiles, lastPlayerIndex));

    setTimeout(() => {
      tiles.forEach((tile) => {
        tile.shuffling = false;
      });
      setSprings(fn(newOrder, tiles, lastPlayerIndex));
    }, 500);
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

      console.log(tileHeight);
      console.log(element.getBoundingClientRect());

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
              {...bind(i)}
              ref={getTileSize}
              draggable="false"
              key={i}
              src={src}
              style={{
                backgroundColor,
                zIndex,
                opacity,
                boxShadow: shadow.interpolate(
                  (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
                ),
                transform: interpolate(
                  [x, y, scale, z],
                  (x, y, s, z) =>
                    `rotateZ(${z}deg) translate3d(${x}px,${y}px,0) scale(${s})`
                ),
              }}
            />
          )
        )}
      </div>
    </div>
  );
};
