/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { options } from "./AppContainer.css";
import {
  activeText,
  expansionContainer,
  expansion,
  expansionOptions,
  shadowOfXitle,
} from "./Tiles/TileList.css";
import { Checkbox } from "./Checkbox";

export const Options = (props) => {
  return (
    <div css={options}>
      <div css={activeText} onClick={props.back}>
        back
      </div>
        <h2>Expansions</h2>
        <div css={expansionContainer}>
          <div css={expansion}>
            <img src={`${process.env.PUBLIC_URL}/backgrounds/late-preclassic.jpg`} alt="late-preclassic" />
          </div>
          <div css={expansionOptions}>
            <div className={"checkbox-container"}>
              <Checkbox
                label="Priests and Priestesses"
                checked={props.isPriestAndPriestess}
                onChange={props.onChangeIsPriestAndPriestess}
              />
            </div>
            <div className={"checkbox-container"}>
              <Checkbox
                label="Height of Development"
                checked={props.isHeightOfDevelopment}
                onChange={props.onChangeIsHeightOfDevelopment}
              />
            </div>
            <div className={"checkbox-container"}>
              <Checkbox
                label="Seasons of Progress"
                checked={props.isSeasonsOfProgress}
                onChange={props.onChangeIsSeasonsOfProgress}
              />
            </div>
          </div>
        </div>
        <div css={expansionContainer}>
          <div css={expansion}>
          <img src={`${process.env.PUBLIC_URL}/backgrounds/xitle.jpg`} alt="Shadow of Xitle" />
          </div>
          <div css={expansionOptions}>
            <div className={"checkbox-container"}>
              <Checkbox
                label="Shadow of Xitle"
                checked={props.isXitle}
                onChange={props.onChangeXitle}
              />
            </div>
          </div>
        </div>
        <div css={expansionContainer}>
          <div css={expansion}>
          <img src={`${process.env.PUBLIC_URL}/backgrounds/period.jpg`} alt="Expansion Period" />
          </div>
          <div css={expansionOptions}>
            <div className={"checkbox-container"}>
              <Checkbox
                label="Expansion Period"
                checked={props.isXitle}
                onChange={props.onChangeXitle}
              />
            </div>
          </div>
        </div>
    </div>
  );
};
