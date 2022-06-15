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
} from "./QuestionForm.css";
import { powerupMsg, Eclipse, masteryQuestions, TilesToQuestions } from "./Constants";
import { DicePlacement } from "./Setup/DicePlacement";
import { getNeutralArray } from "./Logic";

export class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      masteryAnswers: [],
      questions: TilesToQuestions(props.tileSrc, props.teotibotStepsPerWorship, props.eclipseStage, props.isHeightOfDevelopment, props.isAlternateTeotibotMovement, props.topDirectionTile),
      fromMastery: false,
      neutralPlacements1:
        (props.tileName === Eclipse && props.eclipseStage <= 2) ? getNeutralArray(props.tiles) : [],
      neutralPlacements2:
        (props.tileName === Eclipse && props.eclipseStage <= 2) ? getNeutralArray(props.tiles) : [],
    };

    //console.log("I received " + JSON.stringify(props.topDirectionTile))
    this.onExitForm = this.onExitForm.bind(this);
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

  onClickMasteryOption(name) {
    this.setState({
      questions: TilesToQuestions(name),
      fromMastery: true,
    });
  }

  onExitForm() {
    this.props.onCloseClick();
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
          <div css={modalClose} onClick={this.onExitForm}>
            <img
              src={`${process.env.PUBLIC_URL}/resources/cancel.png`}
              alt="Cancel"
            />
          </div>
          <div css={modalHeading}>
            <h3>{this.props.tileName}</h3>
            {this.props.tileName !== Eclipse && (
              <img
                src={`${process.env.PUBLIC_URL}/bot_tiles/${this.props.tileSrc}.png`}
                alt={this.props.tileName}
              />
            )}
          </div>

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
          {(this.props.tileName === Eclipse && this.props.eclipseStage <= 2) && (
            <div css={questionModalPlacements}>
              <h3>Neutral placements</h3>
              <h4>Neutral player 1</h4>
              <DicePlacement
                dicePlacements={neutralPlacements1}
              />
              <h4>Neutral player 2</h4>
              <DicePlacement
                dicePlacements={neutralPlacements2}
              />
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
                    onClick={() => this.onClickMasteryOption(question.action)}
                  >
                    {parse(question.name)}
                  </li>
                ))}
              </ul>
              {this.state.masteryAnswers.length >= 7 && (
                parse(powerupMsg(this.props.isAlternateTeotibotMovement, this.props.topDirectionTile))
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
            onClick={!props.endsOnYes ? () => {
              props.onSelect("yes");
            } : () => props.onExitForm()}
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
        <div onClick={props.onExitForm}>continue</div>
        {(props.questionId !== 1 && (props.isEnd || props.fromMastery)) && (
          <div onClick={props.onRestartQuestions}>restart</div>
        )}
      </div>
    </div>
  );
}
