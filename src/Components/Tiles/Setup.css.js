import { css } from "@emotion/react";

export const startTile = css`
    width: 100px;
    position: absolute;

    @media only screen and (max-width: 400px) {
      width: 75px;
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

export const startTileContainer = css`
    display: flex;
    flex-direction: row;
`;