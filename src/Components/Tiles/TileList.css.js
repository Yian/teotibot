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
      top: 20%;
    }

    @media only screen and (min-height: 24rem) {
      top: 12%;
    }
  }
`;

export const directionTileImage = css`
    position: fixed;
    display: block;
    top: 35%;
    overflow: visible;
    transform-origin: 50% 50% 0px;
    line-height: 96px;
    width: 400px;
    height: 100%;
    max-width: 100%;
    cursor: pointer;
    z-index: 2;

    @media only screen and (orientation: landscape) {
      top: 20%;
    }

    @media only screen and (min-height: 24rem) {
      top: 12%;
    }
   background-size: contain;
   background-repeat: no-repeat;
`;

export const directionTileLeft = css`
  background-image: url("./bot_tiles/left.png");
`;
export const directionTileRight = css`
  background-image: url("./bot_tiles/right.png");
`;

export const directionTileLeft2Step = css`
  background-image: url("./bot_tiles/leftstep2.png");
`;

export const directionTileLeft2StepFlipped = css`
  background-image: url("./bot_tiles/leftstep2flipped.png");
`;

export const directionTileLeft3Step = css`
  background-image: url("./bot_tiles/leftstep3.png");
`;

export const directionTileLeft3StepFlipped = css`
  background-image: url("./bot_tiles/leftstep3flipped.png");
`;

export const directionTileRight2Step = css`
  background-image: url("./bot_tiles/rightstep2.png");
`;

export const directionTileRight2StepFlipped = css`
  background-image: url("./bot_tiles/rightstep2flipped.png");
`;

export const directionTileRight3Step = css`
  background-image: url("./bot_tiles/rightstep3.png");
`;

export const directionTileRight3StepFlipped = css`
  background-image: url("./bot_tiles/rightstep3flipped.png");
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

export const nav = css`
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  background: #ffffff42;
  height: 50px;

  img {
    padding-right: 5px;
  }
  
  @media only screen and (max-width: 480px) { 
    font-size: 1rem;
  }

  @media only screen and (max-width: 400px) { 
    height: 40px;
  }
`;

export const navButton = css`
  display: flex;
  align-items: center;
  z-index: 999;
  cursor: pointer;

  img {
    height: 100%;
  }
`;

export const diceContainer = css`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

export const activeText = css`
  display: flex;
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
