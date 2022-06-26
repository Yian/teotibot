/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/react";
import {
  options,
  optionsContainer,
  expansionOptions,
  optionsSection,
  optionsTeotibotStartingResources,
  expansion,
  expansionContainer,
  teotibotResourceContainer,
} from "./Options.css.js";
import { activeText } from "./Tiles/TileList.css";
import { Checkbox } from "./Checkbox";
import { btnNew } from "./Setup/Setup.css.js";

export const Options = (props) => {
  return (
    <div css={options}>
      <div css={activeText} onClick={props.back}>
        <img src={`${process.env.PUBLIC_URL}/resources/back.png`} alt="Back" />
      </div>
      {/* <div className={"checkbox-container"}>
            <Checkbox
              label="Ascend"
              checked={props.isAscend}
              onChange={props.onChangeIsAscend}
            />
          </div>
          <div className={"checkbox-container"}>
            <Checkbox
              label="Advanced"
              checked={props.isAdvanced}
              onChange={props.onChangeIsAdvanced}
            />
          </div> */}
      <h2>Expansions</h2>
      <div css={expansionContainer}>
        <div css={expansion}>
          <img
            src={`${process.env.PUBLIC_URL}/backgrounds/late-preclassic.jpg`}
            alt="late-preclassic"
          />
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
          {/* <div className={"checkbox-container"}>
              <Checkbox
                label="Seasons of Progress"
                checked={props.isSeasonsOfProgress}
                onChange={props.onChangeIsSeasonsOfProgress}
              />
            </div> */}
        </div>
      </div>
      <div css={expansionContainer}>
        <div css={expansion}>
          <img
            src={`${process.env.PUBLIC_URL}/backgrounds/xitle.jpg`}
            alt="Shadow of Xitle"
          />
        </div>
        <div css={expansionOptions}>
          <div className={"checkbox-container"}>
            <Checkbox
              label="Start & Tech Tiles"
              checked={props.isXitle}
              onChange={props.onChangeXitle}
            />
          </div>
        </div>
      </div>
      <div css={expansionContainer}>
        <div css={expansion}>
          <img
            src={`${process.env.PUBLIC_URL}/backgrounds/period.jpg`}
            alt="Expansion Period"
          />
        </div>
        <div css={expansionOptions}>
        <div className={"checkbox-container"}>
            <Checkbox
              label="Obsidian"
              checked={props.isObsidian}
              onChange={props.onChangeIsObsidian}
            />
          </div>
        <div className={"checkbox-container"}>
            <Checkbox
              label="Alt. Teotibot movement"
              checked={props.isAlternateTeotibotMovement}
              onChange={props.onChangeAlternateTeotibotMovement}
            />
          </div>
        </div>
      </div>
      <div css={optionsContainer}>
        <h2>Teotibot Difficulty</h2>
        <div css={optionsSection}>
          <h3>Unlocked workers power</h3>
          <div css={optionsTeotibotStartingResources}>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotWorkerPowerForAction4}>
                +
              </span>
              <img className="action" src="./actions/no4.png" alt="Gold" />
              <img src={`./dice/d${props.teotibotWorkerPowerForAction4}.png`} alt=""/>
              <span onClick={props.onDecreaseTeotibotWorkerPowerForAction4}>
                -
              </span>
            </div>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotWorkerPowerForAction6}>
                +
              </span>
              <img className="action" src="./actions/no6.png" alt="Gold" />
              <img src={`./dice/d${props.teotibotWorkerPowerForAction6}.png`} alt=""/>
              <span onClick={props.onDecreaseTeotibotWorkerPowerForAction6}>
                -
              </span>
            </div>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotWorkerPowerForAction8}>
                +
              </span>
              <img className="action" src="./actions/no8.png" alt="Gold" />
              <img src={`./dice/d${props.teotibotWorkerPowerForAction8}.png`} alt=""/>
              <span onClick={props.onDecreaseTeotibotWorkerPowerForAction8}>
                -
              </span>
            </div>
          </div>
        </div>
        <div css={optionsSection}>
          <h3>Teotibot Starting Resources</h3>
          <div css={optionsTeotibotStartingResources}>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotStartingGold}>+</span>
              <span>{props.teotibotStartingGold}</span>
              <img src="./resources/gold.png" alt="Gold" />{" "}
              <span onClick={props.onDecreaseTeotibotStartingGold}>-</span>
            </div>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotStartingWood}>+</span>
              <span>{props.teotibotStartingWood}</span>
              <img src="./resources/wood.png" alt="Wood" />{" "}
              <span onClick={props.onDecreaseTeotibotStartingWood}>-</span>
            </div>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotStartingStone}>+</span>
              <span>{props.teotibotStartingStone}</span>
              <img src="./resources/stone.png" alt="Stone" />{" "}
              <span onClick={props.onDecreaseTeotibotStartingStone}>-</span>
            </div>
          </div>
        </div>
        <div css={optionsSection}>
          <h3>VP exchange for 10 cocoa</h3>
          <div css={optionsTeotibotStartingResources}>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotVPfor10Cocoa}>+</span>
              <span>{props.teotibotVPFor10Cocoa}</span>
              <img className="vp" src="./resources/vp.png" alt="VP" />{" "}
              <img src="./resources/cocoa.png" alt="VP" />{" "}
              <span onClick={props.onDecreaseTeotibotVPfor10Cocoa}>-</span>
            </div>
          </div>
        </div>
        <div css={optionsSection}>
          <h3>Steps taken per worship</h3>
          <div css={optionsTeotibotStartingResources}>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotStepsPerWorship}>+</span>
              <span>{props.teotibotStepsPerWorship}</span>
              <img src="./resources/worshipspace.png" alt="VP" />{" "}
              <span onClick={props.onDecreaseTeotibotStepsPerWorship}>-</span>
            </div>
          </div>
        </div>
        <div css={optionsSection}>
          <h3>VP for temple bonus tiles</h3>
          <div css={optionsTeotibotStartingResources}>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotVPForTempleTiles}>+</span>
              <span>{props.teotibotVPForTempleTiles}</span>
              <img src="./resources/templebonus.jpg" alt="VP" />{" "}
              <span onClick={props.onDecreaseTeotibotVPForTempleTiles}>-</span>
            </div>
          </div>
        </div>
        <div css={optionsSection}>
          <h3>VP for tech tiles</h3>
          <div css={optionsTeotibotStartingResources}>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotVPForTechTiles}>+</span>
              <span>{props.teotibotVPForTechTiles}</span>
              <img className="vp" src="./resources/vp.png" alt="VP" />{" "}
              <img src="./resources/tech.png" alt="VP" />{" "}
              <span onClick={props.onDecreaseTeotibotVPForTechTiles}>-</span>
            </div>
          </div>
        </div>
        <div css={optionsSection}>
          <h3>Gaining resources</h3>
          <div css={optionsTeotibotStartingResources}>
            <div css={teotibotResourceContainer}>
              <span onClick={props.onIncreaseTeotibotResourcesToGain}>+</span>
              <span>{props.teotibotResourcesToGain}</span>
              <img src="./resources/any.png" alt="any" />
              <span>1</span>
              <img src="./resources/obsidian.png" alt="any" />
              <span onClick={props.onDecreaseTeotibotResourcesToGain}>-</span>
            </div>
          </div>
        </div>
        {props.isSetupComplete && (
          <div css={optionsSection}>
            <div css={btnNew} onClick={props.newGame}>
              <span>New game</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
