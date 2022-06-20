/** @jsx jsx */
import React, { Component, useEffect } from "react";
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
} from "./QuestionForm.css";
import {
  powerupMsg,
  getResourceImage,
  Eclipse,
  masteryQuestions,
  TilesToQuestions,
} from "./Constants";
import { DicePlacement } from "./Setup/DicePlacement";
import { getNeutralArray } from "./Logic";

export class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      masteryAnswers: [],
      questions: TilesToQuestions(
        props.tileSrc,
        props.teotibotStepsPerWorship,
        props.teotibotVPFor10Cocoa,
        props.eclipseStage,
        props.isHeightOfDevelopment,
        props.isAlternateTeotibotMovement,
        props.topDirectionTile
      ),
      fromMastery: false,
      neutralPlacements1:
        props.tileName === Eclipse && props.eclipseStage <= 2
          ? getNeutralArray(props.tiles)
          : [],
      neutralPlacements2:
        props.tileName === Eclipse && props.eclipseStage <= 2
          ? getNeutralArray(props.tiles)
          : [],
    };
    this.onExitForm = this.onExitForm.bind(this);
    this.onCancelEclipse = this.onCancelEclipse.bind(this);
    this.onRestartQuestions = this.onRestartQuestions.bind(this);
    this.onClickMasteryOption = this.onClickMasteryOption.bind(this);
  }

  onRestartQuestions(i) {
    if (this.state.fromMastery) {
      const masteryAnswers = [...this.state.masteryAnswers, i];
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

  onClickMasteryOption(tileSrc, isAlternateTeotibotMovement, topDirectionTile) {
    this.setState({
      questions: TilesToQuestions(
        tileSrc,
        null,
        null,
        null,
        null,
        isAlternateTeotibotMovement,
        topDirectionTile
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
          <div
            css={modalClose}
            onClick={
              this.props.tileName === Eclipse
                ? () => this.onCancelEclipse()
                : () => this.onExitForm(false)
            }
          >
            <img
              src={`${process.env.PUBLIC_URL}/resources/back.png`}
              alt="Cancel"
            />
          </div>

            {this.props.tileName !== Eclipse ? (
                        <div css={modalHeading}>
                        <h2>{this.props.tileName}</h2>
              <img
                src={`${process.env.PUBLIC_URL}/bot_tiles/${this.props.tileSrc}.png`}
                alt={this.props.tileName}
              />   </div>
            ) : (
              <div css={modalHeadingEclipse}>
            <h2>{this.props.tileName}</h2>
              <img
                src={`${process.env.PUBLIC_URL}/resources/${this.props.tileSrc}.png`}
                alt={this.props.tileName}
              />
              </div>
            )}


          {qs.map((question) => (
            <Question
              key={question.questionId}
              masteryQuestionId={question.masteryQuestionId}
              questionId={question.questionId}
              isEnd={question.isEnd}
              endsOnYes={question.endsOnYes}
              noButtons={question.noButtons}
              margin={question.margin}
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
                  <span class="bold">1</span> Victory Point per leftover
                  resource/cocoa.
                </li>
                <li>
                  <span class="bold">{this.props.teotibotVPForTechTiles}</span>{" "}
                  Victory Points for Technology{" "}
                  {parse(getResourceImage("tech"))} it has a marker on.
                </li>
                <li>
                  <span class="bold">
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

          {this.props.tileName === "Mastery" && !this.state.fromMastery && (
            <div css={masteryForm}>
              <div>Find the bots highest powered unlocked die.</div>
              <div>Perform that Action Boards action if possible:</div>
              <ul>
                {masteryQuestions.map((question) => (
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
                        this.props.topDirectionTile
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

const Question = (props) => {
  return (
    <div css={questionForm(props.margin)}>
      {props.children}
      {!props.isEnd ? (
        <div css={buttons(props.margin)}>
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
