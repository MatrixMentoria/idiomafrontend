import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
import App from "./App";
import Player from "./Player";
import axios from "axios";

class Login extends Component {
  state = {
    //Infos Login
    userLogin: null,
    passwordLogin: null,

    //Infos Cadastro
    nameResgister: null,
    userRegister: null,
    passwordRegister: null,
    confirmPassword: null,

    pag: "",

    user: []
  };

  componentDidMount = () => {
    axios.get("https://idiomabackend.herokuapp.com/user/1").then(result => {
      const user = result.data;
      this.setState({
        user: user
      });
    });
  };

  validateUser = () => {
    this.refs.btnLogin.disabled;
    if (
      document.getElementById("userLogin").value == this.state.user.login &&
      document.getElementById("passwordLogin").value == this.state.user.password
    ) {
      this.setState({
        pag: "/Player"
      });
      this.refs.btnLogin.enabled;
    } else {
      this.setState({
        pag: "/Login"
      });
      alert("Informe Usuario e senha corretos!");
      this.refs.btnLogin.enabled;
    }
  };

  render = () => {
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <h3>Login</h3>
            <form>
              <div className="form-group">
                <label>Usuário</label>
                <input
                  type="text"
                  className="form-control"
                  id="userLogin"
                  value={this.state.userLogin}
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordLogin"
                  value={this.state.passwordLogin}
                />
              </div>
              <div className="form-group">
                <Link to={this.state.pag}>
                  {" "}
                  <input
                    type="submit"
                    className="btnSubmit"
                    value="Login"
                    onClick={this.validateUser}
                    ref="btnLogin"
                  />
                </Link>
              </div>
            </form>
          </div>
          <div className="col-md-6 login-form-2">
            <h3>Cadastre-se</h3>
            <form>
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.nameResgister}
                />
              </div>
              <div className="form-group">
                <label>Usuário</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.userRegister}
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.passwordRegister}
                />
              </div>
              <div className="form-group">
                <label>Confirme a sua senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.confirmPassword}
                />
              </div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Salvar" />
              </div>
            </form>
          </div>
        </div>
        <main>
          <Switch>
            {/* <Route path="/" component={App} /> */}
            <Route path="/Player" component={Player} />
          </Switch>
        </main>
      </div>
    );
  };
}

export default Login;
