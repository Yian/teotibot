import { css } from "@emotion/react";
import { mediaQueries } from "./variables";

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

  h2 {
    text-align: center;
  }

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

      span {
        margin-left: 1rem;
        font-size: 1.5rem;

        @media ${mediaQueries.isMaxXs} {
          font-size: 1rem;
        }
      }
    }

    input[type="checkbox"] {
      width: 42px;
      height: 42px;
      cursor: pointer;

      @media ${mediaQueries.isMaxXs} {
        width: 30px;
        height: 30px;
      }
    }

    span {
      font-size: 2rem;
    }
  }
`;

export const optionsContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0 0 0;

  h3 {
    margin-bottom: 1rem;
  }
`;

export const teotibotResourceContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;

  @media ${mediaQueries.isMaxSm} {
    margin-bottom: 20px;
  }
`;

export const optionsTeotibotStartingResources = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .action {
    width: 2.5rem;
  }

  .vp {
    width: 2rem;
  }

  img {
    width: 4rem;
    margin: 0 5px;
  }

  span {
    display: flex;
    font-size: 4rem;
    margin: 0 5px;
    cursor: pointer;
  }

  @media ${mediaQueries.isMaxSm} {
    flex-direction: column;
  }
`;

export const expansionOptions = css`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 100%;
  margin-left: 1rem;
  img {
    width: 4rem;
  }
`;

export const optionsSection = css`
  margin: 2rem 0;
`;

export const expansionContainer = css`
  display: flex;
  flex-direction: row;
  margin: 1rem 1rem;
`;

export const expansion = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 50%;

  img {
    width: 100%;
    max-width: 300px;
  }
`;
