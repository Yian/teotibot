/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import { options } from "./AppContainer.css";
import { activeText } from "./Tiles/TileList.css";
import { Checkbox } from "./Checkbox";

export const Options = (props) => {
  return (
    <div css={options}>
      <div css={activeText} onClick={props.back}>
        back
      </div>
      <h3>Expansions</h3>
      <h4>Late Preclassic</h4>
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
      <div className={"checkbox-container"}>
        <Checkbox
          label="Shadow of Xitle"
          checked={props.isXitle}
          onChange={props.onChangeXitle}
        />
      </div>
    </div>
  );
};
