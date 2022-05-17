/** @jsx jsx */
import React from "react";
import { jsx } from '@emotion/react';
import { AppContainer } from "./Components/AppContainer";
import { appHeader } from "./App.css.js"
import "./App.css";

function App() {
  return (
    <div className="App">
      <header css={appHeader}>
        <AppContainer />
      </header>
    </div>
  );
}

export default App;
