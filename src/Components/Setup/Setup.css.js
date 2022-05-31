import { css } from "@emotion/react";

export const setupContainer = css`
  color: #eeeddb;
`;
export const startTileContainer = css``;

export const tileContainer = css`
  display: flex;
  flex-direction: row;
`;

export const startTile = css`
  width: 100px;
  position: absolute;
  cursor: pointer;

  @media only screen and (max-width: 400px) {
    width: 75px;
  }
`;

export const resourceContainer = css`
  
`;

export const resource = css`
  display: flex;
  height: 50px;
  position: absolute;

  @media only screen and (max-width: 400px) {
    height: 50px;
  }
`;

export const startResource = css`
  display: flex;
  height: 50px;
  position: absolute;

  @media only screen and (max-width: 400px) {
    height: 50px;
  }
`;

export const techTile = css`
  width: 150px;
  position: absolute;

  @media only screen and (max-width: 400px) {
    width: 100px;
  }
`;

export const templeTile = css`
  width: 180px;
  position: absolute;
`;

export const action = css`
  width: 35px;
`;

export const actionText = css`
  display: block;
`;

export const diceFace = css`
  width: 58px;
`;

export const neutralContainer = css`
  display: flex;
`;

export const diceContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
