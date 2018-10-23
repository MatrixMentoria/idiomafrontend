import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
import Login from "./Login";
import Player from "./Player";

class App extends Component {
  render = () => {
    return (
      <div>
        <main>
          <Switch>
            <Route path="/Player" component={Player} />
            <Route path="/App" component={Login} />
            <Route path="/" component={Login} />
          </Switch>
        </main>
      </div>
    );
  };
}

export default App;
