import { css, keyframes } from "@emotion/react";

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

const lolzorific = (x) => keyframes`
    0% {
    transform: translateX(${x}px) scale(1, 1);
    }

    50% {
    transform: translateX(${x}px) scale(1.1, 1.1);
    }

    100% {
    transform: translateX(${x}px) scale(1, 1);
    }
`
export const animationTest = (x) => css`
  animation: ${lolzorific(600)} 1s linear infinite;
`;