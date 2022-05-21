import { css } from "@emotion/react";

export const questionModal = css`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const questionModalContent = css`
  display: flex;
  justify-content: center;
  background-color: gray;
  position: relative;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
  color: whitesmoke;
  border-radius: 12px;
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

    div {
        cursor: pointer;
    }
`;