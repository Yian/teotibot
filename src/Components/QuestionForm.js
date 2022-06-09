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
} from "./QuestionForm.css";
import { baseStartTiles, Eclipse, TilesToQuestions } from "./Constants";
import { DicePlacement } from "./Setup/DicePlacement";
import { getNeutralArray } from "./Logic";

export class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      questions: TilesToQuestions[props.tileSrc],
      fromMastery: false,
      neutralPlacements1: props.tileName === Eclipse ? getNeutralArray(props.tiles) : [],
      neutralPlacements2: props.tileName === Eclipse ? getNeutralArray(props.tiles) : [],
    };

    this.onExitForm = this.onExitForm.bind(this);
    this.onRestartQuestions = this.onRestartQuestions.bind(this);
    this.onClickMasteryOption = this.onClickMasteryOption.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);
  }

  componentDidMount() {
    console.log("mount");
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props);
    console.log(state);
  }

  onRestartQuestions() {
    if (this.state.fromMastery) {
      this.setState({
        fromMastery: false,
        questions: TilesToQuestions["mastery"],
        answers: {},
      });
    } else {
      this.setState({
        answers: {},
      });
    }
  }

  onClickMasteryOption() {
    this.setState({
      questions: TilesToQuestions["decorations"],
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
            close
          </div>
          <h1>{this.props.tileName}</h1>
          {qs.map((question) => (
            <Question
              key={question.questionId}
              isEnd={question.isEnd}
              noButtons={question.noButtons}
              onExitForm={this.onExitForm}
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
          {this.props.tileName === Eclipse && <div>
            <h2>Neutral placements</h2>
            <h3>Neutral player 1</h3>
            <DicePlacement
              dicePlacements={neutralPlacements1}
              onRest={() => {}}
            />
            <h3>Neutral player 2</h3>
            <DicePlacement
              dicePlacements={neutralPlacements2}
              onRest={() => {}}
            />
          </div>}

          {this.props.tileName === "mastery" && !this.state.fromMastery && (
            <div>
              <div>Find the bots highest powered unlocked die.</div>
              <div>Perform that Action Boards action if possible:</div>
              <ul>
                <li>Forest (2):</li>
                <li>Stone Quarry (3):</li>
                <li>Gold Deposits (4):</li>
                <li onClick={this.onClickMasteryOption}>Alchemy (5):</li>
                <li onClick={this.onClickMasteryOption}>Nobles (6):</li>
                <li onClick={this.onClickMasteryOption}>Decorations (7):</li>
                <li onClick={this.onClickMasteryOption}>Construction (8):</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const Question = (props) => {
  return (
    <div css={questionForm}>
      {props.children}
      {!props.isEnd ? (
        <div css={buttons}>
          <div
            onClick={() => {
              props.onSelect("yes");
            }}
          >
            yes
          </div>
          <div
            onClick={() => {
              props.onSelect("no");
            }}
          >
            no
          </div>
        </div>
      ) : (!props.noButtons ?? 
        <CloseForm
          isEnd={props.isEnd}
          onExitForm={props.onExitForm}
          onRestartQuestions={props.onRestartQuestions}
        />
      )}
    </div>
  );
};

function CloseForm(props) {
  return (
    <div>
      <div css={buttons}>
        <div onClick={props.onExitForm}>continue</div>
        {!props.isEnd && <div onClick={props.onRestartQuestions}>restart</div>}
      </div>
    </div>
  );
}
