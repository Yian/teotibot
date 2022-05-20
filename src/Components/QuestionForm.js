/** @jsx jsx */
import React, { Component } from "react";
import { jsx } from "@emotion/react";
import {
  buttons,
  questionModal,
  questionModalContent,
} from "./QuestionForm.css";

export class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestion1: true,
      showAnswer1: false,
      showQuestion2: false,
      showAnswer2: false,
      showNeither: false,
    };

    this.onQ1YesClick = this.onQ1YesClick.bind(this);
    this.onQ1NoClick = this.onQ1NoClick.bind(this);
    this.onQ2YesClick = this.onQ2YesClick.bind(this);
    this.onQ2NoClick = this.onQ2NoClick.bind(this);
    this.onExitForm = this.onExitForm.bind(this);
    this.onRestartQuestions = this.onRestartQuestions.bind(this);
  }

  onQ1YesClick() {
    this.setState({
      showAnswer1: true,
      showQuestion1: false,
    });
  }

  onQ1NoClick() {
    this.setState({
      showQuestion2: true,
      showQuestion1: false,
    });
  }

  onQ2YesClick() {
    this.setState({
      showAnswer2: true,
      showQuestion2: false,
    });
  }

  onQ2NoClick() {
    this.setState({
      showQuestion2: false,
      showNeither: true,
    });
  }

  onExitForm() {
    this.props.onCloseClick(3);
  }

  onRestartQuestions() {
    this.setState({
      showQuestion1: true,
      showAnswer1: false,
      showQuestion2: false,
      showAnswer2: false,
      showNeither: false,
    });
  }

  render() {
    return (
      <div css={questionModal}>
        <div css={questionModalContent}>
          {this.state.showQuestion1 && (
            <Question
              onYesClick={this.onQ1YesClick}
              onNoClick={this.onQ1NoClick}
            >
              <div>
                2 or more gold and at least one worker on the Decorations (7)
                Action Board?
              </div>
            </Question>
          )}
          {this.state.showAnswer1 && (
            <Answer
              onExitForm={this.onExitForm}
              onRestartQuestions={this.onRestartQuestions}
            >
              <div>
                spends 2 gold and places the topmost Decoration tile onto an
                available Decorations space on the Pyramid grid on the Main
                Board (clockwise from the top). Then the bot: ▪ Scores 5 Victory
                Points. ▪Advances on the Pyramid track. ▪Advances on any temple
                by one
              </div>
              <PowerUp />
            </Answer>
          )}
          {this.state.showQuestion2 && (
            <Question
              onYesClick={this.onQ2YesClick}
              onNoClick={this.onQ2NoClick}
            >
              <div>
                At least one worker on the Gold Deposits (4) Action Board
              </div>
            </Question>
          )}
          {this.state.showNeither && (
            <Answer
              onExitForm={this.onExitForm}
              onRestartQuestions={this.onRestartQuestions}
            >
              <div>
                {" "}
                The bot gains 5 cocoa instead, powers up its lowest powered
                worker, and then advances it.
              </div>
            </Answer>
          )}
          {this.state.showAnswer2 && (
            <Answer
              onExitForm={this.onExitForm}
              onRestartQuestions={this.onRestartQuestions}
            >
              <div>Gain 2 gold</div>
              <PowerUp />
            </Answer>
          )}
        </div>
      </div>
    );
  }
}

function Question(props) {
  return (
    <div>
      {props.children}
      <div css={buttons}>
        <div onClick={props.onYesClick}>yes</div>
        <div onClick={props.onNoClick}>no</div>
      </div>
    </div>
  );
}

function CloseForm(props) {
  return (
    <div>
      <div css={buttons}>
        <div onClick={props.onExitForm}>continue</div>
        <div onClick={props.onRestartQuestions}>restart</div>
      </div>
    </div>
  );
}

function PowerUp() {
  return (
    <div>
      power up a worker on the relevant Action Board (this might trigger an
      Ascension, which is resolved normally). Then advance the powered-up worker
      (or the new worker, if the old one triggered Ascension)
    </div>
  );
}

function Answer(props) {
  return (
    <div>
      {props.children}
      <CloseForm
        onExitForm={props.onExitForm}
        onRestartQuestions={props.onRestartQuestions}
      />
    </div>
  );
}
