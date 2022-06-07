/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { options } from "./AppContainer.css";
import {
  activeText,
  latePreclassicContainer,
  latePreclassic,
  latePreclassicOptions,
  shadowOfXitle,
} from "./Tiles/TileList.css";
import { Checkbox } from "./Checkbox";

export const Options = (props) => {
  return (
    <div css={options}>
      <div css={activeText} onClick={props.back}>
        back
      </div>
      <div>
        <div className={"checkbox-container"}>
          <Checkbox
            label="App controlled dice"
            checked={props.isAppControlledDice}
            onChange={props.onChangeisAppControlledDice}
          />
        </div>
      </div>
      <div>
        <h2>Expansions</h2>
        <div css={latePreclassicContainer}>
          <div css={latePreclassic}>
            <img src="/backgrounds/late-preclassic.jpg" alt="Late Preclassic"></img>
          </div>
          <div css={latePreclassicOptions}>
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
        <div css={latePreclassicContainer}>
          <div css={shadowOfXitle}>
            <img src="/backgrounds/xitle.jpg" alt="Shadow of Xitle"></img>
          </div>
          <div css={latePreclassicOptions}>
            <div className={"checkbox-container"}>
              <Checkbox
                label="Shadow of Xitle"
                checked={props.isXitle}
                onChange={props.onChangeXitle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
