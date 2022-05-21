/** @jsx jsx */
import React, { Component, useCallback, useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import { useSprings, animated, to } from "@react-spring/web";
import { mainImg } from './AppContainer.css';

import {
  tileListContainer,
  tileList,
  driectionTileList,
} from "./TileList.css";
import { QuestionForm } from "./QuestionForm";
import { calculateXDirectionTile, calculateXTile, calculateYTile, right, left } from "./Logic";


export const Setup = (props) => {

  return (
    <div css={tileListContainer}>
     
    </div>
  );
};
