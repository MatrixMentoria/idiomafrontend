import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./css/App.css";
import Login from "./Login";
import Player from "./Player";
import Audios from "./Audios";
import axios from "axios";

axios.defaults.baseURL = "https://idiomabackend.herokuapp.com";

class App extends Component {
  render = () => {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Player/:id" component={Player} />
        <Route exact path="/Audios" component={Audios} />
      </Switch>
    );
  };
}

export default App;
