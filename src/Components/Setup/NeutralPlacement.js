/** @jsx jsx */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { jsx } from "@emotion/react";
import useMedia from "../UseMedia";
import useMeasure from "react-use-measure";
import { useTransition, a } from "@react-spring/web";
import { startTileContainer, techTile } from "./Setup.css";
import ReactTooltip from "react-tooltip";
import shuffle from "lodash.shuffle";
import { baseTechTiles } from "../Constants";
import union from "lodash.union";

export const NeutralPlacement = (props) => {
  const stuff = useCallback((remainingStartTiles) => {
    console.log(remainingStartTiles)
    var shuffledTiles = shuffle(remainingStartTiles);
    //Draw 2 random start tiles
    var index = Math.floor(Math.random() * (remainingStartTiles.length - 1)) + 1;
    
    var numbers1 = shuffledTiles[index].numbers;

    shuffledTiles.splice(index, 1);
    index = Math.floor(Math.random() * (shuffledTiles.length - 1)) + 1;

    var numbers2 = shuffledTiles[index].numbers;
    var mergedNumbers = union(numbers1, numbers2);

  }, []);

  useEffect(() => {
    if (props?.remainingStartTiles?.length > 0) {
        stuff(props.remainingStartTiles);
    }
  }, [stuff, props.remainingStartTiles]);

  return <div css={startTileContainer} style={{ height: 260 }}></div>;
};
