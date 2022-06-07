/** @jsx jsx */
import React, { Component, useEffect } from "react";
import { jsx } from "@emotion/react";
import parse from "html-react-parser";
import { isEmpty } from "lodash-es";
import {
  buttons,
  questionModal,
  modalClose,
  questionModalContent,
  questionForm,
} from "./QuestionForm.css";

const getImage = (imagePath) => {
  return `<img src=".${imagePath}" alt={}/>`;
};

const getActionImage = (imageName) => {
  return `<img src="./actions/${imageName}.png" alt=${imageName}}/>`;
}

const getDiceImage = (imageName) => {
  return `<img src="./dice/${imageName}.png" alt=${imageName}}/>`;
}

const getResourceImage = (imageName) => {
  return `<img src="./resources/${imageName}.png" alt=${imageName}}/>`;
};

const advancement = `<ul><li>${getImage("/dice/d1.png")}${getImage(
  "/dice/d2.png"
)}${getImage(
  "/dice/d3.png"
)} clockwise to the next Action Board.</li><li>${getImage(
  "/dice/d4.png"
)}${getImage("/dice/d5.png")} clockwise to the second Action Board.</li></ul>`;

const powerup = `<div>Teotibot gains
5 cocoa ${getResourceImage("5cocoa")}, powers up ${getResourceImage(
  "powerup"
)} its lowest powered worker, and
then advances it:</div>${advancement}`;

const templeTip = `<div class="templeTip"><div>*Advance Teotibot on its highest temple ignoring topmost.</div>
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
</div></div>`;

const alchemyQuestions = [
  {
    question: `<div>Does Teotibot have 1 or more gold ${getResourceImage("gold")} and at least one worker on the Alchemy ${getActionImage("no5")} Action Board?</div>`,
    questionId: 1,
    condition: ({ answers }) => isEmpty(answers),
  },
  {
    question: `<div> Teotibot spends 1 gold ${getResourceImage("gold")} and then gains
    the Technology ${getResourceImage("tech")} of the lowest number that does not have any markers (yours or Teotibot's). 
    <ul>
    <li>If all remaining tiles have your marker on, then the bot
    gains the lowest numbered Technology which it does not
    yet have, while you score the 3 Victory Points as normal.</li></ul>
    Either way, advance on the temple ${getResourceImage("tw")} matching the gained
    Technology ${getResourceImage("tech")} and power up ${getResourceImage("powerup")} a worker on this Action Board
    (resolve any Ascensions normally). Then the bot advances the powered-up worker
    (or the new worker, if the old one triggered Ascension).
    ${advancement}
   </div>
    <div>
  </div>`,
    questionId: 2,
    condition: ({ answers }) => answers[1] === "yes",
    isEnd: true,
  },
  {
    question: `Power up ${getResourceImage("powerup")} ${getResourceImage("powerup")} its lowest unlocked worker
    by two, without carrying out any actions or advancing any
    workers.`,
    questionId: 3,
    condition: ({ answers }) => answers[1] === "no" && answers[3] === undefined,
    isEnd: true,
  },
];

const decorationQuestions = [
  {
    question: `<div>Does Teotibot have 2 or more gold ${getResourceImage("gold")} and at least one worker on the Decorations ${getActionImage("no7")} Action Board?</div>`,
    questionId: 1,
    condition: ({ answers }) => isEmpty(answers),
  },
  {
    question: `<div> Teotibot spends 2 gold ${getResourceImage("gold")} and places the topmost Decoration 
    tile onto an available Decorations space on the Pyramid grid on the Main Board (clockwise from the top). 
    Then Teotibot: <ul>
    <li>Scores 5 Victory Points.</li><li>Advances on the Pyramid track. ${getResourceImage("pyramid")}</li>
    <li><span class="bold" data-tip data-for='templeAdvance'>Advances*</span> on any temple by one. ${getResourceImage("tw")}</li>
    </ul></div>
    <div>
    Power up ${getResourceImage("powerup")} Teotibots worker ${getDiceImage("d3")} on the Decorations
    Action Board ${getActionImage("no7")} (resolve any Ascensions normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)
    ${advancement}
    ${templeTip}
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
    question: `<div>Teotibot gains 2 gold ${getResourceImage("gold")}
    </div>Power up Teotibots worker ${getResourceImage("powerup")} on the Gold Deposits ${getActionImage("no4")}
    Action Board (resolve any Ascensions normally). Then advance the powered-up worker (or the new worker, if the
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
    question: `<div>Does Teotibot have 2 or more stone ${getResourceImage("stone")} and at least one worker on the Construction ${getActionImage("no8")} Action Board?</div>`,
    questionId: 1,
    condition: ({ answers }) => isEmpty(answers),
  },
  {
    question: `<div>Teotibot spends 2 stone ${getResourceImage("stone")} and places the leftmost pyramid <img src="/resources/pyramid.png"/>
    tile (rotated randomly) onto the top left,
    lowest level space available on the Pyramid grid of the Main
    Board. 
    Then Teotibot: <ul>
    <li>Scores Victory Points for the level.</li><li>Advances on the Pyramid ${getResourceImage("pyramid")} track.</li>
    <li><span class="bold">Advances*</span> on any temple by one. ${getResourceImage("tw")}</li><li>Scores an additional 2 Victory Points (Note: This represents average points the
    bot would score by matching icons.)</li>
    </ul></div>
    <div>
    Power up ${getResourceImage("powerup")} Teotibots worker ${getDiceImage("d3")} on the Construction ${getActionImage("no7")}
    Action Board (resolve any Ascensions normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)
    ${advancement}
    ${templeTip}
  </div>`,
    questionId: 2,
    condition: ({ answers }) => answers[1] === "yes",
    isEnd: true,
  },
  {
    question: `<div>Does Teotibot have at least one worker on the Stone Quarry ${getActionImage("no3")} Action Board?</div>`,
    questionId: 3,
    condition: ({ answers }) => answers[1] === "no" && answers[3] === undefined,
  },
  {
    question: `<div>Teotibot gains 2 stone ${getResourceImage("stone")}

    </div>Power up Teotibots worker ${getResourceImage("powerup")} on the Stone Quarry ${getActionImage("no3")}
    Action Board (this might trigger an Ascension, which is resolved
    normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)
    ${advancement}
    `,
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
    question: `<div>Does Teotibot have 2 or more wood ${getResourceImage("wood")} and at least one worker on the Nobles Action Board? ${getActionImage("no6")}</div>`,
    questionId: 1,
    condition: ({ answers }) => isEmpty(answers),
  },
  {
    question: `<div>Teotibot spends 2 wood ${getResourceImage("wood")} and builds a Building.
    <ul>
    <li>Before the first Eclipse, place it in the first (top) row.</li>
    <li>After the first Eclipse (but before the second), place it in the
    second (centre) row.</li>
    <li>After the second Eclipse, place it in the third (bottom) row.</li>
    <li>If a row is full, place it into a space with the lowest printed
    Victory Point value of all three rows.</li>
    <li>Score the Victory Points shown on the space just covered,
    and advance the bot on the Avenue of the Dead ${getResourceImage("powerup")} (the same
    way an actual player would advance).</li>
    </ul></div>
    <div>
    Power up ${getResourceImage("powerup")} Teotibots worker ${getDiceImage("d3")} on the Nobles
    Action Board ${getActionImage("no6")} (this might trigger an Ascension, which is resolved
    normally). Then advance the powered-up worker (or the new worker, if the
    old one triggered Ascension)
  </div>`,
    questionId: 2,
    condition: ({ answers }) => answers[1] === "yes",
    isEnd: true,
  },
  {
    question: `<div>Does Teotibot have at least one worker on the Forest Action Board? ${getActionImage("no2")}</div>`,
    questionId: 3,
    condition: ({ answers }) => answers[1] === "no" && answers[3] === undefined,
  },
  {
    question: `<div>Teotibot gains 2 wood <img src="/resources/wood.png"/>
    </div>Power up Teotibots worker <img src="/resources/powerup.png"/> on the Forest ${getActionImage("no2")}
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
    Teotibot always ignores the Palace Action Board ${getActionImage("no7")}).
    <ul>
    <li>If there is one of your workers on that space, the Teotibot unlocks that worker.</li>
    <li>The bot advances on the matching temple by 2 spaces,
    gaining rewards for both (and gaining printed bonuses
    instead of Discovery tiles as mentioned before).</li>
    <li>If the activated space is on the Decorations ${getActionImage("no7")} Action
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
    Teotibot always ignores the Palace Action Board ${getActionImage("no7")}).
    <ul>
    <li>If there is one of your workers on that space, the Teotibot unlocks that worker.</li>
    <li>The bot advances on the matching temple by 2 spaces,
    gaining rewards for both (and gaining printed bonuses
    instead of Discovery tiles as mentioned before).</li>
    <li>If the activated space is on the Decorations ${getActionImage("no7")} Action
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

const TilesToQuestions = {
  alchemy: alchemyQuestions,
  construction: constructionQuestions,
  decorations: decorationQuestions,
  mask_collection: maskQuestions,
  mastery: [],
  nobles: noblesQuestions,
  worship: worshipQuestions,
};
export class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: {},
      questions: TilesToQuestions[props.tileSrc],
      fromMastery: false,
    };

    this.onExitForm = this.onExitForm.bind(this);
    this.onRestartQuestions = this.onRestartQuestions.bind(this);
    this.onClickMasteryOption = this.onClickMasteryOption.bind(this);
  }

  onRestartQuestions() {
    if (this.state.fromMastery) {
      this.setState({
        fromMastery: false,
        questions: TilesToQuestions["Mastery"],
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
      questions: TilesToQuestions["Decorations"],
      fromMastery: true,
    });
  }

  onExitForm() {
    this.props.onCloseClick();
  }

  render() {
    var answers = this.state.answers;
    var questions = this.state.questions;

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
              key={question.id}
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
          ))}
          {this.props.tileName === "Mastery" && !this.state.fromMastery && (
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
      ) : (
        <CloseForm
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
        <div onClick={props.onRestartQuestions}>restart</div>
      </div>
    </div>
  );
}