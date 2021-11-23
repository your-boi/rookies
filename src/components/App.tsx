import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import HomePage from "./routes/home/HomePage";
import { PlayerPage } from "./routes/player/PlayerPage";
import { YearComparisonPage } from "./routes/YearComparisonPage";
import settings from "../../settings";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <HashRouter basename={settings.repoPath}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/comparison" component={PlayerPage} />
          <Route path="/year" component={YearComparisonPage} />
        </Switch>
      </HashRouter>
    </>
  );
}
