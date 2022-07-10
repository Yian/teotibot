import { css } from "@emotion/react";
import { mediaQueries } from "./variables";

export const questionModal = css`
  position: fixed; /* Stay in place */
  z-index: 4; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const modalHeading = (margin = 50) => css`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: ${margin}px 0 0 0;

  img {
    width: 200px;
  }
`;

export const modalHeadingEclipse = css`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin: 100px 0 0 0;

  img {
    width: 50px;
  }
`;

export const endGame = css`
  h3 {
    margin: 20px 0;
  }
`;

export const masteryForm = css`
  cursor: pointer;
`;

export const questionModalContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: gray;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 60%; /* Could be more or less, depending on screen size */
  min-height: 550px;
  font-size: 1.75rem;
  color: chocolate;
  border-radius: 12px;
  background-image: url("./backgrounds/forms.jpg");
  background-size: auto 100%;
  background-position: center;
  z-index: 4;

  ul {
    li {
      margin: 1.5rem 0;
    }
  }

  .icon {
    height: 1.75rem;
    vertical-align: middle;
  }

  @media only screen and (orientation: landscape) {
    margin: 5% auto;
  }

  @media ${mediaQueries.isMaxLg} {
    width: 90%;
    font-size: 1.2rem;
    line-height: 1.6rem;
  }

  @media ${mediaQueries.isSm} {
    width: 85%;
  }

  @media ${mediaQueries.isMaxSm} {
    width: 90%;
  }

  @media ${mediaQueries.isLg} {
    width: 65%;
  }
`;

export const questionModalPlacements = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3rem;

  h3 {
    margin: 0.5rem 0;
  }

  h4 {
    margin: 1rem 0;
  }
`;

export const strikeOut = css`
  text-decoration: line-through;
`;

export const modalClose = css`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

export const content = (margin) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: ${margin ?? 0}px 0;
  font-size: 1.75rem;

  div {
    cursor: pointer;
  }

  div:first-of-type {
    color: #30c5bd;
  }

  div:nth-of-type(2) {
    color: #d15959;
  }
`;

export const buttons = (margin) => css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 50px 0 ${margin ?? 0}px 0;
  font-size: 1.75rem;

  div {
    cursor: pointer;
  }

  div:first-of-type {
    color: #30c5bd;
  }

  div:nth-of-type(2) {
    color: #d15959;
  }
`;

export const btnContinue = css`
  margin-bottom: 100%;
`;

export const questionForm = (margin) => css`
  margin: ${margin ?? 0}px 0;
`;
