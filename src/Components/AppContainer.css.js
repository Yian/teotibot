import { css } from "@emotion/react";

export const appContainer = css`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const mainImg = css`
  width: 100%;
  height: 100vh;
  background-image: url("./backgrounds/main.jpg");
  position: absolute;
  background-size: contain;
  z-index: 0;
  opacity: 0.4;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
`;

export const loadingText = css`
  display: flex;
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
  font-size: 2rem;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

export const start = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
  list-style: none;
  font-size: 4rem;
  padding: 0;

  li {
    cursor: pointer;
    z-index: 2;
    color: white;
  }
`;

export const heading = css`
  opacity: 1;
  transform: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 4rem;
    opacity: 1;
    z-index: 2;
    color: chocolate;
    margin: 0;
  }

  img {
    height: 5rem;
    z-index: 2;
  }
`;
