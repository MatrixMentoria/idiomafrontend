import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";

import App from "./Login";
import Player from "./Player";

class Login extends Component {
  render = () => {
    return (
      <div>
        <main>
          <Switch>
            <Route path="/Player" component={Player} />
            <Route path="/App" component={App} />
            <Route path="/" component={App} />
          </Switch>
        </main>
      </div>
    );
  };
}

export default Login;
