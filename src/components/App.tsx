import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomePage from "./routes/home/HomePage";
import { PlayerPage } from "./routes/player/PlayerPage";
import { YearComparisonPage } from "./routes/YearComparisonPage";
import settings from "../../settings";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Outfit', sans-serif;
    height: 100%;
  }
  body {
    height: 100%;
  }
  p {
    margin-block-start:0; margin-block-end:0; margin-inline-start:0; margin-inline-end:0;
    padding-block-start:0; padding-block-end:0; padding-inline-start:0; padding-inline-end:0;

  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <HashRouter basename={settings.repoPath}>
        <Switch>
          <Route exact path="/" component={PlayerPage} />
          <Route path="/comparison" component={PlayerPage} />
          <Route path="/year" component={YearComparisonPage} />
        </Switch>
      </HashRouter>
    </>
  );
}
