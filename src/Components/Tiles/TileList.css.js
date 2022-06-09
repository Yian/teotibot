import { css } from "@emotion/react";
import { mediaQueries } from "../variables";

export const tileListContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const tileList = css`
  display: flex;
  justify-content: center;
  position: relative;

  > img {
    position: fixed;
    top: 35%;
    overflow: visible;
    pointer-events: auto;
    transform-origin: 50% 50% 0px;
    line-height: 96px;
    width: 400px;
    max-width: 100%;
    cursor: pointer;
    z-index: 2;

    @media only screen and (orientation: landscape) {
      top: 10%;
    }
  }
`;

export const topContainer = css`
  display: flex;
  position: absolute;
  width: 100%;
  top: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  z-index: 999;
`;

export const expansionContainer = css`
  display: flex;
  flex-direction: row;
  margin: 50px 0;
`;

export const expansion = css`
  display: flex;
  justify-content: center;
  flex: 50%;
  img {
    width: 100%;
    max-width: 300px;
  }
`;

export const expansionOptions = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 100%;
`;

export const diceButton = css`
  z-index: 999;
`;

export const diceContainer = css`
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

export const activeText = css`
  cursor: pointer;
  color: gold;
  font-size: 3rem;

  &.disabled {
    pointer-events: none;
    opacity: 0.7;
  }

  @media only screen and (min-width: 451px) and (max-width: 1024px) {
    font-size: 3rem;
  }

  @media only screen and (max-width: 450px) {
    font-size: 2rem;
  }
`;
