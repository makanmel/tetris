import React, { Component } from "react";
import "./App.css";
import MainMenu from "./components/menu/MainMenu";
import Game from "./containers/Game";
import Leaders from "./containers/Leaders";
import LoadGame from "./containers/LoadGame";
import { Route, BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="app-body">
            <Route component={MainMenu} />
            <Route component={Game} />
            <Route component={Game} />
            <Route component={Leaders} />
            <Route component={LoadGame} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
