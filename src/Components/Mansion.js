/** @jsx jsx */
import { jsx } from "@emotion/react";
import { dFaces, getActionImage } from "./Constants";
import Dice from "react-dice-roll";
import { generateRandomInteger, getMansionResults } from "./Logic";
import { useState } from "react";
import parse from "html-react-parser";
import { mansionContainer, mansionDice } from "./Mansion.css";

export const Mansion = (props) => {
  const [diceValue, setDiceValue] = useState(0);

  const onRoll = (value) => {
    var result = false;
    setDiceValue(value);
    if (value <= 3) {
      result = true;
    }
    props.onMansionResult(result);
  }

  return (
    <div css={mansionContainer}>
      <span>
        If Teotibot moved a worker past the Mansion{" "}
        {parse(getActionImage("no1"))} Action Board, roll the die:
      </span>
      <div css={mansionDice}>
        <Dice
          faces={dFaces}
          size={50}
          rollingTime={generateRandomInteger(500, 1500)}
          onRoll={(value) => onRoll(value)}
          disabled={diceValue > 0}
        />
      </div>
      {diceValue > 0 && (
        <div>
          {parse(getMansionResults(diceValue))}{" "}
          {diceValue <= 3 && (
            <ul>
              <li>
                Discard and replace the Major Discovery tile on the Mansion
                board.
              </li>
              <li>
                If able, Teotibot spends 1 cocoa to advance once on the temple
                associated with that Royal tile.
              </li>
              <li>
                The owner of the Claim marker (whether you or Teotibot) receives
                a free power-up as normal. In Teotibot's case, it powers up its
                highest power unlocked worker.
              </li>
              <li>
                The Worship effect of the Royal tile is never performed by the
                Teotibot.
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
