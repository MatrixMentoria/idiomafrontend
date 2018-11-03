import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
import axios from "axios";

class Login extends Component {
  state = {
    isAuthorized: false
  };

  actionLogin = event => {
    event.preventDefault();
    event.stopPropagation();
    const loginUser = {
      email: this.refs.emailLogin.value,
      password: this.refs.passwordLogin.value
    };
    axios.get("https://idiomabackend.herokuapp.com/user/1").then(result => {
      if (
        result.data.email === loginUser.email &&
        result.data.password === loginUser.password
      ) {
        this.setState({
          isAuthorized: true
        });
      } else {
        window.scrollTo(0, 0);
        document.getElementById("markAlert").innerHTML =
          '<div class="alert alert-danger" role="alert"><strong>Falha ao logar! </strong>E-mail ou senha inválidos.</div>';
        setTimeout(() => {
          document.getElementById("markAlert").innerHTML = "";
        }, 4000);
      }
    });
  };

  actionRegister = event => {
    event.preventDefault();
    event.stopPropagation();
    if (
      this.refs.passwordRegister.value ===
      this.refs.confirmPasswordRegister.value
    ) {
      const newUser = {
        email: this.refs.emailRegister.value,
        password: this.refs.passwordRegister.value,
        personData: {
          firstName: this.refs.firstnameRegister.value,
          lastName: this.refs.lastnameRegister.value
        }
      };
      //Conexão com o banco para cadastrar usuário a fazer
      window.scrollTo(0, 0);
      document.getElementById("markAlert").innerHTML =
        '<div class="alert alert-success" role="alert"><strong>Sucesso! </strong>Usuário cadastrado!</div>';
      setTimeout(() => {
        document.getElementById("markAlert").innerHTML = "";
      }, 4000);
    } else {
      window.scrollTo(0, 0);
      document.getElementById("markAlert").innerHTML =
        '<div class="alert alert-danger" role="alert"><strong>Falha ao cadastrar! </strong>Senhas não estão iguais!</div>';
      setTimeout(() => {
        document.getElementById("markAlert").innerHTML = "";
      }, 4000);
    }
  };

  checkRedirect = () => {
    if (this.state.isAuthorized) {
      return <Redirect to="/Player" />;
    }
  };

  render = () => {
    return (
      <Switch>
        <div className="container login-container">
          <div id="markAlert" />
          <div className="row">
            {this.loginArea()}
            {this.registerArea()}
          </div>
          {this.checkRedirect()}
        </div>
      </Switch>
    );
  };

  loginArea = () => {
    return (
      <div className="col-md-6 login-form-1">
        <h3>Login</h3>
        <form
          onSubmit={event => {
            this.actionLogin(event);
          }}
        >
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control"
              id="emailLogin"
              ref="emailLogin"
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              id="passwordLogin"
              ref="passwordLogin"
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btnSubmit"
              id="btnLogin"
              ref="btnLogin"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    );
  };

  registerArea = () => {
    return (
      <div className="col-md-6 login-form-2">
        <h3>Cadastre-se</h3>
        <form
          onSubmit={event => {
            this.actionRegister(event);
          }}
        >
          <div className="form-group">
            <label>Primeiro nome</label>
            <input
              type="text"
              className="form-control"
              id="firstnameRegister"
              ref="firstnameRegister"
              required
            />
          </div>
          <div className="form-group">
            <label>Último nome</label>
            <input
              type="text"
              className="form-control"
              id="lastnameRegister"
              ref="lastnameRegister"
              required
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control"
              id="emailRegister"
              ref="emailRegister"
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              id="passwordRegister"
              ref="passwordRegister"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirme a sua senha</label>
            <input
              type="password"
              className="form-control"
              id="confirmPasswordRegister"
              ref="confirmPasswordRegister"
              required
            />
          </div>
          <div className="form-group">
            <div className="form-group">
              <button
                type="submit"
                className="btnSubmit"
                id="btnRegister"
                ref="btnRegister"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
}

export default Login;
