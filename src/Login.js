import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
//import App from "./App";
import Player from "./Player";
import axios from "axios";

class Login extends Component {
  state = {
    //Infos Login
    usuarioLogin: null,
    senhaLogin: null,

    //Infos Cadastro
    nomeCadastro: null,
    usuarioCadastro: null,
    senhaCadastro: null,
    confirmarSenhaCadastro: null,

    pagina: "",

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

  validarUsuario = () => {
    this.refs.btnLogin.disabled = true;
    if (
      document.getElementById("usuarioLogin").value === this.state.user.login &&
      document.getElementById("senhaLogin").value === this.state.user.password
    ) {
      this.setState({
        pagina: "/Player"
      });
    } else {
      this.setState({
        pagina: "/Login"
      });
      alert("Informe Usuario e senha corretos!");
    }
    this.refs.btnLogin.disabled = false;
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
                  id="usuarioLogin"
                  value={this.state.usuarioLogin}
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="senhaLogin"
                  value={this.state.senhaLogin}
                />
              </div>
              <div className="form-group">
                <Link to={this.state.pagina}>
                  {" "}
                  <input
                    type="submit"
                    className="btnSubmit"
                    value="Login"
                    onClick={this.validarUsuario}
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
                  value={this.state.nomeCadastro}
                />
              </div>
              <div className="form-group">
                <label>Usuário</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.usuarioCadastro}
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.senhaCadastro}
                />
              </div>
              <div className="form-group">
                <label>Confirme a sua senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.confirmarSenhaCadastro}
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
