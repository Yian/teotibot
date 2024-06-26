/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/react";
import parse from "html-react-parser";
import {
  buttons,
  questionModal,
  modalClose,
  questionModalContent,
  questionForm,
  questionModalPlacements,
  modalHeading,
  strikeOut,
  masteryForm,
  btnContinue,
  modalHeadingEclipse,
  endGame,
  content,
  pathSelectorQuestion,
  pathSelectorQuestionAdvanced,
  stepContainer,
} from "./QuestionForm.css";
import {
  powerupMsg,
  getResourceImage,
  getActionImage,
  Eclipse,
  masteryQuestions,
  TilesToQuestions,
  AdvancedTilesToQuestions,
  shamanText,
  hasResourcesNoText,
  getActionBoard,
  Neutral,
} from "./Constants";
import { DicePlacement } from "./Setup/DicePlacement";
import { getNeutralArray } from "./Logic";
import { cloneDeep } from "lodash";
import { tippy } from "@tippyjs/react";
import { Mansion } from "./Mansion";
import { PathSelector } from "./PathSelector";
import { EmpireMap } from "./EmpireMap";

const Question = (props) => {
  const [isMansionResult, setIsMansionResult] = useState(false);

  const onMansionResult = (value) => {
    setIsMansionResult(value);
  };

  return (
    <div css={questionForm(props.margin)}>
      {!isMansionResult && props.isAdvanced && props.showPathSelector && (
        <div css={pathSelectorQuestionAdvanced}>
          <div css={stepContainer}>
            <span class="step">1.</span> If Teotibot has{" "}
            {parse(hasResourcesNoText("wood", props.isObsidian, 2))} and at{" "}
            <span class="bold">least 1</span> worker on the{" "}
            {parse(getActionBoard("Conquest"))}
          </div>

          <span>
            It will place two Warriors in Teotihuacan, one at a time, resolving
            all moves as explained in the Empire reward section. If it has no
            more Warriors, skip this step.
          </span>

          <PathSelector />

          <EmpireMap />
        </div>
      )}
      {/* Show path selector for basic forms */}
      {!isMansionResult && !props.isAdvanced && props.showPathSelector && (
        <div css={pathSelectorQuestion}>
          <span>
            Teotibot will place two Warriors in Teotihuacan (if able), one at a
            time. When one of its warriors is pushed out of Teotihuacan, draw a
            new path tile. The tile shows the region the warrior will move into:
          </span>
          <PathSelector />
          <EmpireMap />
        </div>
      )}
      {!isMansionResult && props.children}
      {/* Show mansion component for all forms */}
      {props.isMansion && props.showMansion && (
        <div className="mansion">
          <h4>Mansion</h4>
          <Mansion onMansionResult={onMansionResult} />
        </div>
      )}
      {props.showAltarsAndShamans &&
        props.isAltarsAndShamans &&
        parse(shamanText())}
      {!props.isEnd ? (
        <div css={content(props.margin)}>
          <div
            onClick={
              !props.endsOnYes
                ? () => {
                    props.onSelect("yes");
                  }
                : () => props.onExitForm(true)
            }
          >
            yes
          </div>
          <div
            onClick={
              !props.fromMastery
                ? () => {
                    props.onSelect("no");
                  }
                : () => {
                    props.onRestartQuestions(props.masteryQuestionId);
                  }
            }
          >
            no
          </div>
        </div>
      ) : !props.noButtons ? (
        <CloseForm
          margin={props.margin}
          isEnd={props.isEnd}
          onExitForm={props.onExitForm}
          fromMastery={props.fromMastery}
          questionId={props.questionId}
          onRestartQuestions={props.onRestartQuestions}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

function CloseForm(props) {
  return (
    <div>
      <div css={buttons(props.margin)}>
        <div onClick={() => props.onExitForm(true)}>continue</div>
        {props.questionId !== 1 && (props.isEnd || props.fromMastery) && (
          <div onClick={props.onRestartQuestions}>restart</div>
        )}
      </div>
    </div>
  );
}

export class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      masteryAnswers: [],
      questions: [],
      fromMastery: false,
      neutralPlacements1: [],
      neutralPlacements2: [],
    };

    this.onExitForm = this.onExitForm.bind(this);
    this.onCancelEclipse = this.onCancelEclipse.bind(this);
    this.onExitNeutral = this.onExitNeutral.bind(this);
    this.onRestartQuestions = this.onRestartQuestions.bind(this);
    this.onClickMasteryOption = this.onClickMasteryOption.bind(this);
  }

  componentDidMount() {
    const props = this.props;
    var tiles = cloneDeep(props.tiles);

    this.setState({
      neutralPlacements1:
        (props.tileName === Eclipse && props.eclipseStage <= 2) ||
        props.tileName === Neutral
          ? getNeutralArray(tiles)
          : [],
      neutralPlacements2:
        (props.tileName === Eclipse && props.eclipseStage <= 2) ||
        props.tileName === Neutral
          ? getNeutralArray(tiles)
          : [],
      questions: !props.isAdvanced
        ? TilesToQuestions(
            props.tileSrc,
            props.isAlternateTeotibotMovement,
            props.topDirectionTile,
            props.isObsidian,
            props.teotibotResourcesToGain,
            props.eclipseStage,
            props.teotibotStepsPerWorship,
            props.teotibotVPFor10Cocoa,
            props.isHeightOfDevelopment,
            props.isEmpires
          )
        : AdvancedTilesToQuestions(
            props.tileSrc,
            props.isAlternateTeotibotMovement,
            props.topDirectionTile,
            props.isObsidian,
            props.teotibotResourcesToGain,
            props.eclipseStage,
            props.teotibotStepsPerWorship,
            props.teotibotVPFor10Cocoa,
            props.isHeightOfDevelopment,
            props.isEmpires
          ),
    });
  }

  componentDidUpdate() {
    tippy(".temple-tip", {
      allowHTML: true,
      content: `<div class="templeTip"><div>*Advance Teotibot on its highest temple ignoring topmost.</div>
    <div class="priority">
      Temple priority: <br/>
      ${getResourceImage("tb")} ->
      ${getResourceImage("tr")} ->
      ${getResourceImage("tg")}
    </div>
    <div class="priority">
      Resource priority:<br/>
      Least -> ${getResourceImage("gold")} -> ${getResourceImage(
        "stone"
      )} -> ${getResourceImage("wood")}
    </div></div>`,
    });
    tippy(".ascend-tip", {
      allowHTML: true,
      content: `<div class="templeTip">
      <div class="tooltip-text">
       <span>- Advance when worker ${getResourceImage(
         "worker"
       )} reaches level 6</span>
       <span>- Advance Marker one step on the avenue ${getResourceImage(
         "avenue"
       )} track.</span>
       <span>- Move new die to the Palace action board ${getActionImage(
         "no1"
       )}</span>
       <span>- Select the reward: 5vp, 5 cocoa, Temple Advance.</span>
        <span>- Pay 3 to advance twice on 1 or 2 temples.</span>
        <span>- If only 3 workers, gain your 4th worker starting power of 3, place in palace 1 general area.</span>
        <span>- Advance the light disc on the Calendar track by one. This might trigger an Eclipse.</span>
      </div></div>`,
    });
  }

  onRestartQuestions(i) {
    if (this.state.fromMastery) {
      const masteryAnswers =
        i > 0 ? [...this.state.masteryAnswers, i] : this.state.masteryAnswers;
      this.setState({
        fromMastery: false,
        questions: TilesToQuestions("mastery"),
        masteryAnswers,
        answers: {},
      });
    } else {
      this.setState({
        answers: {},
      });
    }
  }

  onClickMasteryOption(
    tileSrc,
    isAlternateTeotibotMovement,
    topDirectionTile,
    isObsidian,
    teotibotResourcesToGain,
    eclipseStage
  ) {
    this.setState({
      questions: TilesToQuestions(
        tileSrc,
        isAlternateTeotibotMovement,
        topDirectionTile,
        isObsidian,
        teotibotResourcesToGain,
        eclipseStage
      ),
      fromMastery: true,
    });
  }

  onExitForm(shouldShuffle) {
    this.props.onCloseClick(shouldShuffle);
  }

  onCancelEclipse() {
    this.props.onCancelEclipseClick();
  }

  onExitNeutral() {
    this.props.onCloseNeutral();
  }

  render() {
    var answers = this.state.answers;
    var questions = this.state.questions;
    var neutralPlacements1 = this.state.neutralPlacements1;
    var neutralPlacements2 = this.state.neutralPlacements2;
    var fromMastery = this.state.fromMastery;

    const qs = questions.filter((q) => {
      if (!q.condition) {
        // no condition set; always visible
        return true;
      }
      return q.condition({ answers });
    });

    return (
      <div css={questionModal}>
        <div css={questionModalContent}>
          {this.props.isMoveNeutral && (
            <div
              css={modalClose}
              onClick={
                this.props.tileName === Eclipse
                  ? () => this.onCancelEclipse()
                  : () => this.onExitForm(false)
              }
            >
              <img
                src={`${process.env.PUBLIC_URL}/game_resources/back.png`}
                alt="Cancel"
              />
            </div>
          )}

          {/* //Heading */}
          {this.props.tileName === Eclipse ? (
            <div css={modalHeadingEclipse}>
              <h2>{this.props.tileName}</h2>
              <img
                src={`${process.env.PUBLIC_URL}/game_resources/${this.props.tileSrc}.png`}
                alt={this.props.tileName}
              />
            </div>
          ) : this.props.tileName === Neutral ? (
            <div css={modalHeadingEclipse}>
              <h2>Neutral Player</h2>
              <img
                src={`${process.env.PUBLIC_URL}/game_resources/${this.props.tileSrc}.png`}
                alt={this.props.tileName}
              />
            </div>
          ) : (
            <div
              css={modalHeading(
                this.props.isAdvanced ||
                  this.props.tileName === "Empire and Build"
                  ? 100
                  : 70
              )}
            >
              <h2>{this.props.tileName}</h2>
              <img
                src={`${process.env.PUBLIC_URL}/bot_tiles/${this.props.tileSrc}.png`}
                alt={this.props.tileName}
              />
            </div>
          )}

          {/* Questions */}
          {qs.map((question) => (
            <Question
              key={question.questionId}
              masteryQuestionId={question.masteryQuestionId}
              questionId={question.questionId}
              isEnd={question.isEnd}
              endsOnYes={question.endsOnYes}
              noButtons={question.noButtons}
              margin={question.margin}
              isMansion={this.props.isMansion}
              isAltarsAndShamans={this.props.isAltarsAndShamans}
              showMansion={question.showMansion}
              showPathSelector={question.showPathSelector}
              isAdvanced={question.isAdvanced}
              showAltarsAndShamans={question.showAltarsAndShamans}
              onExitForm={this.onExitForm}
              fromMastery={fromMastery}
              onRestartQuestions={this.onRestartQuestions}
              onSelect={(answer) => {
                const answers = {
                  ...this.state.answers,
                  [question.questionId]: answer,
                };
                this.setState({ answers });
              }}
            >
              {parse(question.question)}
            </Question>
          ))}

          {this.props.tileName === Eclipse && this.props.eclipseStage <= 2 && (
            <div css={questionModalPlacements}>
              <h3>Neutral placements</h3>
              <h4>Neutral player 1</h4>
              <DicePlacement dicePlacements={neutralPlacements1} />
              <h4>Neutral player 2</h4>
              <DicePlacement dicePlacements={neutralPlacements2} />
            </div>
          )}

          {this.props.tileName === Neutral && (
            <div css={questionModalPlacements}>
              <h3>Neutral placements</h3>
              <h4>Neutral player 1</h4>
              <DicePlacement dicePlacements={neutralPlacements1} />
              <h4>Neutral player 2</h4>
              <DicePlacement dicePlacements={neutralPlacements2} />
            </div>
          )}

          {this.props.eclipseStage === 3 && (
            <div css={endGame}>
              <h3>End Game</h3>
              <div>
                Each player who has qualified for one or more Temple Bonus tiles
                (by being on the penultimate or topmost step of a temple) scores
                additional Victory Points based on any Bonus tiles they have
                reached. Refer to the Appendix for an explanation of all Bonus
                tiles.
              </div>
              <h3>Teotibot scoring</h3>
              <ul>
                <li>
                  <span className="bold">1</span> Victory Point per leftover
                  resource/cocoa.
                </li>
                <li>
                  <span className="bold">
                    {this.props.teotibotVPForTechTiles}
                  </span>{" "}
                  Victory Points for Technology{" "}
                  {parse(getResourceImage("tech"))} it has a marker on.
                </li>
                <li>
                  <span className="bold">
                    {this.props.teotibotVPForTempleTiles}
                  </span>{" "}
                  Victory Points for each Temple Bonus tile{" "}
                  {parse(getResourceImage("templebonus"))} it has reached
                  (instead of scoring them normally).
                </li>
              </ul>
            </div>
          )}

          {this.props.tileName === Eclipse && (
            <div css={buttons}>
              <div css={btnContinue} onClick={() => this.onExitForm(false)}>
                continue
              </div>
            </div>
          )}

          {this.props.tileName === Neutral && (
            <div css={buttons}>
              <div css={btnContinue} onClick={this.onExitNeutral}>
                continue
              </div>
            </div>
          )}

          {!this.props.isAdvanced &&
            this.props.tileName === "Mastery" &&
            !this.state.fromMastery && (
              <div css={masteryForm}>
                <div>Find the bots highest powered unlocked die.</div>
                <div>Select the Action Board below:</div>
                <ul>
                  {masteryQuestions(this.props.isEmpires).map((question) => (
                    <li
                      css={
                        this.state.masteryAnswers.indexOf(question.id) >= 0
                          ? strikeOut
                          : {}
                      }
                      key={question.id}
                      onClick={() =>
                        this.onClickMasteryOption(
                          question.action,
                          this.props.isAlternateTeotibotMovement,
                          this.props.topDirectionTile,
                          this.props.isObsidian,
                          this.props.teotibotResourcesToGain,
                          this.props.eclipseStage
                        )
                      }
                    >
                      {parse(question.name)}
                    </li>
                  ))}
                </ul>
                {this.state.masteryAnswers.length >= 7 && (
                  <div>
                    {parse(
                      powerupMsg(
                        this.props.isAlternateTeotibotMovement,
                        this.props.topDirectionTile,
                        this.props.teotibotVPFor10Cocoa
                      )
                    )}
                    <div css={buttons(50)}>
                      <div onClick={() => this.onExitForm(true)}>continue</div>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    );
  }
}
