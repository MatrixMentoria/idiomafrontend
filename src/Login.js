import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
import App from "./App";
import Player from "./Player";

class Login extends Component {
  state = {
    //Infos Login
    usuario: null,
    senha: null,

    //Infos Cadastro
    nome: null,
    usuario: null,
    senha: null,
    confirmarSenha: null
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
                  value={this.state.usuario}
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.senha}
                />
              </div>
              <div classNameName="form-group">
                <Link to="/Player">
                  {" "}
                  <input type="submit" className="btnSubmit" value="Login" />
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
                  value={this.state.nome}
                />
              </div>
              <div className="form-group">
                <label>Usuário</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.usuario}
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.senha}
                />
              </div>
              <div className="form-group">
                <label>Confirme a sua senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.confirmarSenha}
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
