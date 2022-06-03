/** @jsx jsx */
import React, { Component } from "react";
import { jsx } from "@emotion/react";
import parse from "html-react-parser";
import { isEmpty } from "lodash-es";
import {
  buttons,
  questionModal,
  modalClose,
  questionModalContent,
} from "./QuestionForm.css";

export class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
    };

    this.onExitForm = this.onExitForm.bind(this);
    this.onRestartQuestions = this.onRestartQuestions.bind(this);
  }

  onRestartQuestions() {
    this.setState({
      answers: {},
    });
  }

  onExitForm() {
    this.props.onCloseClick();
  }

  render() {
    var answers = this.state.answers;
    
    const questions = worshipQuestions.filter((q) => {
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
          {questions.map((question) => (
            <div>
              <Question
                isEnd={question.isEnd}
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
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function Question(props) {
  return (
    <div>
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
      ) : (
        <CloseForm
          onExitForm={props.onExitForm}
          onRestartQuestions={props.onRestartQuestions}
        />
      )}
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

const powerup = `<div>Teotibot gains
5 cocoa <img src="/resources/5cocoa.png"/>, powers up <img src="/resources/powerup.png"/> its lowest powered worker <img src="/dice/d3.png"/>, and
then advances it.</div>`;

const decorationQuestions = [
  {
    question: `<div>Does Teotibot have 2 or more gold <img src="/resources/gold.png"/> and at least one worker on the Decorations Action Board? <img src="/actions/no7.png"/></div>`,
    questionId: 1,
    condition: ({ answers }) => isEmpty(answers),
  },
  {
    question: `<div> Teotibot spends 2 gold <img src="/resources/gold.png"/> and places the topmost Decoration 
    tile onto an available Decorations space on the Pyramid grid on the Main Board (clockwise from the top). 
    Then Teotibot: <ul>
    <li>Scores 5 Victory Points.</li><li>Advances on the Pyramid track. <img src="/resources/pyramid.png"/></li>
    <li>Advances on any temple by one. <img src="/resources/tw.png"/></li>
    </ul></div>
    <div>
    Power up <img src="/resources/powerup.png"/> Teotibots worker <img src="/dice/d3.png"/> on the Decorations
    Action Board <img src="/actions/no7.png"/> (this might trigger an Ascension, which is resolved
    normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)
  </div>`,
    questionId: 2,
    condition: ({ answers }) => answers[1] === "yes",
    isEnd: true,
  },
  {
    question: `<div>Does Teotibot have at least one worker on the Gold Deposits (4) Action Board? <img src="/actions/no7.png"/></div>`,
    questionId: 3,
    condition: ({ answers }) => answers[1] === "no" && answers[3] === undefined,
  },
  {
    question: `<div>Teotibot gains 2 gold <img src="/resources/gold.png"/>
    </div>Power up Teotibots worker <img src="/resources/powerup.png"/>on the Decorations
    Action Board (this might trigger an Ascension, which is resolved
    normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)`,
    questionId: 4,
    condition: ({ answers }) => answers[3] === "yes",
    isEnd: true,
  },
  {
    question: powerup,
    questionId: 5,
    condition: ({ answers }) => answers[3] === "no",
    isEnd: true,
  },
];

const constructionQuestions = [
  {
    question: `<div>Does Teotibot have 2 or more stone <img src="/resources/stone.png"/> and at least one worker on the Construction Action Board? <img src="/actions/no8.png"/></div>`,
    questionId: 1,
    condition: ({ answers }) => isEmpty(answers),
  },
  {
    question: `<div> Teotibot spends 2 stone <img src="/resources/stone.png"/> and places the leftmost pyramid 
    tile <img src="/actions/pyramid.png"/> (rotated randomly) onto the top left,
    lowest level space available on the Pyramid grid of the Main
    Board. 
    Then Teotibot: <ul>
    <li>Scores Victory Points for the level.</li><li>Advances on the Pyramid track. <img src="/resources/pyramid.png"/></li>
    <li>Advances on any temple by one. <img src="/resources/tw.png"/></li><li>Scores an additional 2 Victory Points (Note: This represents average points the
    bot would score by matching icons.)</li>
    </ul></div>
    <div>
    Power up <img src="/resources/powerup.png"/> Teotibots worker <img src="/dice/d3.png"/> on the Construction
    Action Board <img src="/actions/no7.png"/> (this might trigger an Ascension, which is resolved
    normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)
  </div>`,
    questionId: 2,
    condition: ({ answers }) => answers[1] === "yes",
    isEnd: true,
  },
  {
    question: `<div>Does Teotibot have at least one worker on the Stone Quarry (3) Action Board? <img src="/actions/no3.png"/></div>`,
    questionId: 3,
    condition: ({ answers }) => answers[1] === "no" && answers[3] === undefined,
  },
  {
    question: `<div>Teotibot gains 2 stone <img src="/resources/stone.png"/>
    </div>Power up Teotibots worker <img src="/resources/powerup.png"/>on the Decorations
    Action Board (this might trigger an Ascension, which is resolved
    normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)`,
    questionId: 4,
    condition: ({ answers }) => answers[3] === "yes",
    isEnd: true,
  },
  {
    question: powerup,
    questionId: 5,
    condition: ({ answers }) => answers[3] === "no",
    isEnd: true,
  },
];

const noblesQuestions = [
  {
    question: `<div>Does Teotibot have 2 or more wood <img src="/resources/wood.png"/> and at least one worker on the Nobles Action Board? <img src="/actions/no6.png"/></div>`,
    questionId: 1,
    condition: ({ answers }) => isEmpty(answers),
  },
  {
    question: `<div>Teotibot spends 2 wood <img src="/resources/wood .png"/> and builds a Building.
    <ul>
    <li>Before the first Eclipse, place it in the first (top) row.</li>
    <li>After the first Eclipse (but before the second), place it in the
    second (centre) row.</li>
    <li>After the second Eclipse, place it in the third (bottom) row.</li>
    <li>If a row is full, place it into a space with the lowest printed
    Victory Point value of all three rows.</li>
    <li>Score the Victory Points shown on the space just covered,
    and advance the bot on the Avenue of the Dead (the same
    way an actual player would advance).</li>
    </ul></div>
    <div>
    Power up <img src="/resources/powerup.png"/> Teotibots worker <img src="/dice/d3.png"/> on the Construction
    Action Board <img src="/actions/no7.png"/> (this might trigger an Ascension, which is resolved
    normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)
  </div>`,
    questionId: 2,
    condition: ({ answers }) => answers[1] === "yes",
    isEnd: true,
  },
  {
    question: `<div>Does Teotibot have at least one worker on the Forest Action Board? <img src="/actions/no2.png"/></div>`,
    questionId: 3,
    condition: ({ answers }) => answers[1] === "no" && answers[3] === undefined,
  },
  {
    question: `<div>Teotibot gains 2 wood <img src="/resources/wood.png"/>
    </div>Power up Teotibots worker <img src="/resources/powerup.png"/> on the Decorations
    Action Board (this might trigger an Ascension, which is resolved
    normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)`,
    questionId: 4,
    condition: ({ answers }) => answers[3] === "yes",
    isEnd: true,
  },
  {
    question: powerup,
    questionId: 5,
    condition: ({ answers }) => answers[3] === "no",
    isEnd: true,
  },
];

const worshipQuestions = [
  {
    question: `<div>Advance Teotibots worker on a Worship space to the next
    clockwise Worship space on a temple sidebar (remember:
    Teotibot always ignores the Palace Action Board <img src="/actions/no7.png"/>).
    <ul>
    <li>If there is one of your workers on that space, the Teotibot unlocks that worker.</li>
    <li>The bot advances on the matching temple by 2 spaces,
    gaining rewards for both (and gaining printed bonuses
    instead of Discovery tiles as mentioned before).</li>
    <li>If the activated space is on the Decorations <img src="/actions/no7.png"/> Action
    Board, the bot advances on any temple by 3 instead.</li>
    </ul></div>
    <div>
    Discard the Discovery tile near the activated space, and
immediately draw a replacement for it.
  </div>`,
    questionId: 1,
    isEnd: true,
  },
];

const maskQuestions = [
  {
    question: `<div>Advance Teotibots worker on a Worship space to the next
    clockwise Worship space on a temple sidebar (remember:
    Teotibot always ignores the Palace Action Board <img src="/actions/no7.png"/>).
    <ul>
    <li>If there is one of your workers on that space, the Teotibot unlocks that worker.</li>
    <li>The bot advances on the matching temple by 2 spaces,
    gaining rewards for both (and gaining printed bonuses
    instead of Discovery tiles as mentioned before).</li>
    <li>If the activated space is on the Decorations <img src="/actions/no7.png"/> Action
    Board, the bot advances on any temple by 3 instead.</li>
    </ul></div>
    <div>
    Discard the Discovery tile near the activated space, and
immediately draw a replacement for it.
  </div>`,
    questionId: 1,
    isEnd: true,
  },
];

/*
CONSTRUCTION:
Q: If the bot has 2 or more stone and at least one worker on the
Construction (8) Action Board?
A: Spends 2 stone and places
the leftmost pyramid tile (rotated randomly) onto the top left,
lowest level space available on the Pyramid grid of the Main
Board
then
Scores Victory Points for the level.
▪▪Advances on the Pyramid track.
▪▪Scores an additional 2 Victory Points and advances on any
temple by one. (Note: This represents

Q: bot has at least one worker on
the Stone Quarry (3) Action Board?
A: Gain 2 stone

THEN
power up a worker on the relevant Action Board (this might
trigger an Ascension, which is resolved normally). Then
advance the powered-up worker (or the new worker, if the old
one triggered Ascension)

ELSE
bot gains
5 cocoa instead, powers up its lowest powered worker, and
then advances it.

ALCHEMY
Q The bot has 1 or more gold and at least one worker on the
Alchemy (5) Action Board
A Spends 1 gold and then gains
the Technology of the lowest number that does not have any
markers (yours or Teotibot’s).

Q All remaining tiles have your marker on?
A bot
gains the lowest numbered Technology which it does not
yet have, while you score the 3 Victory Points as normal

advance on the temple matching the gained
Technology and power up a worker on this Action Board
(this might trigger an Ascension, which is resolved
normally). Then the bot advances the powered-up worker
(or the new worker, if the old one triggered Ascension

Nobles
Q bot has at least 2 wood and one worker on the Nobles (6)
Action Board
*/
