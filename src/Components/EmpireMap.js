/** @jsx jsx */
import { jsx } from "@emotion/react";
import Tippy from "@tippyjs/react";
import React from "react";
import { checkboxTooltip, checkbox } from "./Checkbox.css";
import { regionDescriptions } from "./Constants";
import {
  empireMap,
  empireMapContainer,
  regionTooltip,
} from "./QuestionForm.css";

export class EmpireMap extends React.Component {
  render() {
    return (
      <div css={empireMapContainer}>
        {regionDescriptions.map((region) => {
          return (
            <Tippy
              content={
                <div className="region-descriptions">
                  <img
                    src={`${process.env.PUBLIC_URL}/empire/${region.name}.jpg`}
                  />
                  <div>{region.description}</div>
                  {region.teotibotDescription && (
                    <div>{region.teotibotDescription}</div>
                  )}
                </div>
              }
            >
              <div css={regionTooltip(region.top, region.left)}>?</div>
            </Tippy>
          );
        })}
        <img
          css={empireMap}
          src={`${process.env.PUBLIC_URL}/empire/empire_map_teotibot.jpg`}
        />
      </div>
    );
  }
}
