/** @jsx jsx */
import React from "react";
import { jsx } from '@emotion/react';
import { AppContainer } from "./Components/AppContainer";
import { app, appHeader } from "./App.css.js"
import "./App.css";

function App() {
  return (
    <div css={app}>
      <header css={appHeader}>
        <AppContainer />
      </header>
    </div>
  );
}

export default App;
