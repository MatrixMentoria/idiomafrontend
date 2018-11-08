import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./css/App.css";
import Login from "./Login";
import Player from "./Player";
import axios from "axios";

axios.defaults.baseURL = "https://idiomabackend.herokuapp.com";

class App extends Component {
  render = () => {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Player" component={Player} />
      </Switch>
    );
  };
}

export default App;
