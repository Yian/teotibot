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

let tileWidth = 0;
let tileHeight = 0;

const row1YVal = 50;
const row2YVal = 250;

const fn2 = (order, tiles) => (index) => {
  const tile = tiles[index];
  const imageUrl = process.env.PUBLIC_URL + "/" + tile.name + ".png";

  const figureX2 = (index) => {
    var result = 0;
    switch(index) {
      case 0:
        result = tileWidth * 2
        break;
        case 1:
          result = tileWidth*2
          break;
          default:
            result =tileWidth*2
    }
    return result;
  }

  var result = {
    y: order.indexOf(index) === 0 ? row1YVal : row2YVal,
    x: figureX2(index),
    src: imageUrl,
    w: tile.nextWValue ?? 0,
    scale: 1,
    shadow: 1,
    immediate: false,
  };

  return { ...{ z: 0 }, ...result };
};

const fn =
  (
    order,
    tiles,
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
          result = 0;
          break;
        case 1:
          result = tileWidth/2;
          break;
        case 2:
          result = tileWidth/2;
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
          result = -tileWidth/2;
          break;
        case 2:
          result = tileWidth/2;
          break;
        case 3:
          result = -tileWidth;
          break;
        case 4:
          result = tileWidth/100;
          break;
        case 5:
          result = tileWidth;
          break;
        default:
          result = tileWidth*2;
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

  const shuffleTiles = (tileIndex) => {
    setRound(round + 1);
    props.incrementCycle();

    if (ordering.indexOf(tileIndex) >= 6) return; //clicked extra tile

    let newOrder;
    let newDirectionOrder;
    let wasShuffled;

     swapArrayLocs(ordering, 0, 6);
     swapArrayLocs(ordering, 1, 0);
     swapArrayLocs(ordering, 4, 1);

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

    directionTiles.forEach((directionTile, index) => {
        if (!directionTile.curWValue && directionTile.toFlip) {
          directionTile.nextWValue = flippedValue;
        } else if (directionTile.curWValue && directionTile.toFlip) {
          if (directionTile.curWValue === directionTile.nextWValue) {
            directionTile.nextWValue = defaultValue;
          }
        }
    })

    setDirectionTiles(fn2(newDirectionOrder, directionTiles));

    directionTiles.forEach((directionTile) => {
      if (directionTile.toFlip === true) {
        directionTile.flipped = true;
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
  }, [lastPlayerIndex, props.ordering, props.directionOrdering, setTiles, setDirectionTiles, tiles, directionTiles, round]);

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
      <div css={tileList} style={{ height: tiles.length}}>
        {tileSprings.map(
          (
            { zIndex, shadow, y, x, z, scale, opacity, backgroundColor, src },
            i
          ) => (
            <animated.img
              ref={getTileSize}
              draggable="false"
              key={i}
              onClick={() => {shuffleTiles(i)}}
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
      <div css={driectionTileList} style={{ height: tiles.length}}>
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
