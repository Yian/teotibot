/** @jsx jsx */
import { useState, useEffect, useMemo } from "react";
import { jsx } from "@emotion/react";
import {
  buttons,
  empireMap,
  modalClose,
  pathContent,
  pathTile,
  questionModal,
  questionModalContent,
  regionTooltip,
  empireMapContainer,
} from "../QuestionForm.css";
import { generateRandomInteger } from "../Logic";
import { PathSelector } from "../PathSelector";
import Tippy from "@tippyjs/react";
import { regionDescriptions, regionDescriptions2 } from "../Constants";
import { EmpireMap } from "../EmpireMap";

export const PathTiles = (props) => {
  const [tileNo, setTileNo] = useState(generateRandomInteger(1, 4));

  return (
    <div css={questionModal}>
      <div css={questionModalContent}>
        <img
          css={modalClose}
          src={`${process.env.PUBLIC_URL}/game_resources/back.png`}
          onClick={() => props.onCloseClick(false)}
          alt="Cancel"
        />
        <div css={pathContent}>
          <h2>Teotibot's Warrior Movement</h2>

          <h4>
            When one of Teotibots Warriors is pushed out of Teotihuacan, draw a
            new path tile. The tile shows the region the warrior will move into.
          </h4>

          <PathSelector />

          <h4>
            When one of Teotibot's Warriors is pushed into another region, it
            will move its Warriors so they stay in the same line.
          </h4>

          <EmpireMap />
          
          <div css={buttons(50)}>
            <div onClick={() => props.onCloseClick(false)}>continue</div>
          </div>
        </div>
      </div>
    </div>
  );
};
