import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./routes/home/HomePage";
import { PlayerPage } from "./routes/player/PlayerPage";
import settings from "../../settings";

export default function App() {
  return (
    <BrowserRouter basename={settings.repoPath}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/player/:id" component={PlayerPage} />
      </Switch>
    </BrowserRouter>
  );
}
