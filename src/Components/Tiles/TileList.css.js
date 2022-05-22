import { css } from "@emotion/react";

export const tileListContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const tileList = css`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;

  > img {
    position: absolute;
    overflow: visible;
    pointer-events: auto;
    transform-origin: 50% 50% 0px;
    line-height: 96px;
    width: 400px;
    max-width: 100%;
    cursor: pointer;

    @media only screen and (max-width: 500px) {
      width: 200px;
    }
  }
`;

export const directionTileList = css`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;

  > img {
    position: absolute;
    overflow: visible;
    pointer-events: auto;
    transform-origin: 50% 50% 0px;
    line-height: 96px;
    width: 400px;
    max-width: 100%;
    cursor: pointer;
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
