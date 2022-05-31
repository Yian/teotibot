/** @jsx jsx */
import React, { Component, useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { useSprings, animated, to } from "@react-spring/web";
import { mainImg } from '../AppContainer.css';

import {
  tileListContainer,
  tileList,
  directionTileList,
} from "./TileList.css";
import { QuestionForm } from "../QuestionForm";
import { calculateXDirectionTile, calculateXTile, calculateYTile, right, left } from "../Logic";
import useMeasure from "react-use-measure";

let tileWidth = 0;
const row1YVal = 15;
const row2YVal = 200;

const directionTileApi = (order, tiles) => (index) => {
  const tile = tiles[index];
  const imageUrl = `${process.env.PUBLIC_URL}/BotTiles/${tile.name}.png`;

  var result = {
    y: order.indexOf(index) === 0 ? row1YVal : row2YVal,
    x: calculateXDirectionTile(index, tileWidth),
    src: imageUrl,
    w: tile.nextWValue ?? 0,
    scale: 1,
    shadow: 1,
    immediate: false,
    config: { duration: 500, velocity: 0, friction: 10 }
  };

  return { ...{ z: 0 }, ...result };
};

const tilesApi = (order, tiles, width) => (index) => {
  var result = {};
  const tile = tiles[index];
  const imageUrl = `${process.env.PUBLIC_URL}/BotTiles/${tile.name}.png`;

  console.log(width);
      result = {
        x: calculateXTile(order.indexOf(index), tileWidth),
        y: calculateYTile(order.indexOf(index, tile.type), tileWidth),
        scale: 1,
        shadow: 1,
        immediate: false,
        src: imageUrl,
        width: width,
        config: { velocity: 0, friction: 75 }
      };

  return { ...{ opacity: 1, z: 0 }, ...result };
};

export const TileList = (props) => {
  const [ref, measureAPI] = useMeasure();
  const tiles = props.tiles;
  const directionTiles = props.directionTiles;
  const ordering = props.ordering; //inital ordering;
  const directionOrdering = props.directionOrdering;
  const [round, setRound] = useState(0);
  const [tileSizeCalculated, setTileSizeCalculated] = useState(false);
  const [tilesDisabled, setTilesDisabled] = useState(false);
  const [showForm, setShowForm] = useState(false);

  console.log(measureAPI);
  const [tileSprings, setTiles] = useSprings(
    tiles.length,
    tilesApi(ordering, tiles, measureAPI.width)
  ); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const [directionTileSprings, setDirectionTiles] = useSprings(
    directionTiles.length,
    directionTileApi(directionOrdering, directionTiles)
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
    if (tilesDisabled) return;
    setTilesDisabled(true);

    setTimeout(() => {
      setTilesDisabled(false);
    }, 1000);

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
    setTiles(tilesApi(newOrder, tiles, measureAPI.width));

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

    setDirectionTiles(directionTileApi(newDirectionOrder, directionTiles));

    directionTiles.forEach((directionTile) => {
      if (directionTile.toFlip === true) {
        directionTile.toFlip = false;
        directionTile.curWValue = directionTile.nextWValue;
      }
    });
  });

  useEffect(() => {
    if (round === 0) {
      setTiles(tilesApi(props.ordering, tiles, measureAPI.width));
      setDirectionTiles(directionTileApi(props.directionOrdering, directionTiles));
    }
  }, [
    props.ordering,
    props.directionOrdering,
    setTiles,
    setDirectionTiles,
    tiles,
    directionTiles,
    round,
    measureAPI.width
  ]);

  const getTileSize = (element) => {
    if (element) {
      tileWidth = element.getBoundingClientRect().width;

      //console.log(tileHeight);
      //console.log(element.getBoundingClientRect());

      if (!tileSizeCalculated) {
        setTileSizeCalculated(true);
      }
    }
  };

  const showSteps = (i) => {
    setShowForm(true);
  }

  const onCloseClick = (i) => {
    setShowForm(false);
    shuffleTiles(i);
  }

  return (
    <div css={tileListContainer}>
      <div css={mainImg} onClick={onCloseClick} />
      <div>{showForm && <QuestionForm onCloseClick={onCloseClick}/>}</div>
      <div ref={ref} css={tileList} style={{ height: tiles.length }}>
        {tileSprings.map(
          (
            { zIndex, shadow, y, x, z, scale, opacity, backgroundColor, src, width },
            i
          ) => (
            <animated.img
              ref={getTileSize}
              draggable="false"
              key={i}
              onClick={() => {
                showSteps(i);
              }}
              src={src}
              style={{
                backgroundColor,
                zIndex,
                width: width,
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
      <div css={directionTileList} style={{ height: tiles.length }}>
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
