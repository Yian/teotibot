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

  .icon {
    height: 1.75rem;
    vertical-align: middle;
  }
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

  @media only screen and (orientation: landscape) {
    margin: 5% auto;
  }

  @media ${mediaQueries.isMaxXs} {
    width: 90%;
    font-size: 2rem;
  }

  @media ${mediaQueries.isMaxSm} {
    width: 90%;
  }

  @media ${mediaQueries.isLg} {
    width: 65%;
  }

  .icon {
    height: 1.75rem;
    vertical-align: middle;
  }

  .bold {
    color: #35a7c6;
  }

  .templeTip {
    margin: 15px 0;
    color: #35a7c6;
    font-size: 1.5rem;
  }

  .priority {
    margin: 10px 0;
  }
`;

export const modalClose = css`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const buttons = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px 0;

  div {
    cursor: pointer;
  }

  div:first-child {
    color: #30c5bd;
  }

  div:nth-child(2) {
    color: #d15959;
  }
`;

export const questionForm = css`
  margin: 50px 0;
`;
