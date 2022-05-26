import { css } from "@emotion/react";

export const setupContainer = css`
  color: #eeeddb;
`
export const startTileContainer = css`
    display: flex;
    flex-direction: row;
    cursor: pointer;
`;

export const startTile = css`
    width: 100px;
    position: absolute;

    @media only screen and (max-width: 400px) {
      width: 75px;
    }
`;

export const resourceContainer = css`
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
    width: 200px;
    position: absolute;

    @media only screen and (max-width: 400px) {
      width: 100px;
    }
`;

export const templeTile = css`
    width: 200px;
    position: absolute;
`;

export const diceFace = css`
  width: 50px;
`;

export const neutralContainer = css`
  display: flex;
`;