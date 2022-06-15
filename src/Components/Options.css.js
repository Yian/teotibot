import { css } from '@emotion/react'

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
  font-size: 1rem;

  .checkbox-container {
    display: flex;
    flex-direction: row;

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
      cursor: pointer;
    }

    span {
      font-size: 2rem;
    }
  }

  @media only screen and (max-width: 1024px) {
    font-size: 2rem;
  }

  @media only screen and (max-width: 450px) {
    font-size: 1rem;
  }
`;

export const expansionOptions = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 100%;

  img {
    width: 4rem;
  }
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