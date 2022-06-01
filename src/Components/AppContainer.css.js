
import { css } from '@emotion/react'

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
    height: 100%;
    background-image: url("/background.jpg");
    position: absolute;
    background-size: contain;
    z-index: 0;
    opacity: 0.4;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
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
  font-size: 5rem;
  padding: 0;

  li {
    cursor: pointer;
    z-index: 2;
    color: white;
  }
`;

export const optionsButton = css`
  position: absolute;
  top: 0;
  right: 0;
`;

export const options = css`
  margin: auto auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 5rem;

  .checkbox-container {
    display: flex;
    flex-direction: column;

    .checkbox-item {
      display: flex;
      align-items: center;
      cursor: pointer;

      &.disabled {
        pointer-events: none;
        opacity: 0.7;
      }
    }

    input[type="checkbox"] {
      width: 45px;
      height: 45px;
      margin-left: 5%;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 1024px) {
    font-size: 5rem;
  }

  @media only screen and (max-width: 450px) {
    font-size: 2.5rem;
  }
`;