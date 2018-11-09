import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
import authService from "./authService";

class Login extends Component {
  state = {
    isAuthorized: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  actionLogin = event => {
    event.preventDefault();
    event.stopPropagation();
    authService
      .authenticate(this.state.email, this.state.password)
      .then(result => {
        this.setState({
          isAuthorized: result
        });
      })
      .catch(() => {
        window.scrollTo(0, 0);
        document.getElementById("markAlert").innerHTML =
          '<div class="alert alert-danger" role="alert"><strong>Falha ao logar! </strong>E-mail ou senha inválidos.</div>';
        setTimeout(() => {
          document.getElementById("markAlert").innerHTML = "";
        }, 4000);
      })
      .then(() => {
        console.log(this.state.isAuthorized);
      });
  };

  actionRegister = event => {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.password === this.state.confirmPassword) {
      authService
        .register(
          this.state.email,
          this.state.password,
          this.state.firstName,
          this.state.lastName
        )
        .then(result => {
          this.setState({
            isAuthorized: result
          });
          window.scrollTo(0, 0);
          document.getElementById("markAlert").innerHTML =
            '<div class="alert alert-success" role="alert"><strong>Sucesso! </strong>Usuário ' +
            this.state.firstName +
            " " +
            this.state.lastName +
            " cadastrado!</div>";
          setTimeout(() => {
            document.getElementById("markAlert").innerHTML = "";
          }, 4000);
        })
        .catch(error => {
          window.scrollTo(0, 0);
          document.getElementById("markAlert").innerHTML =
            '<div class="alert alert-danger" role="alert"><strong>Falha ao cadastrar! </strong>' +
            error +
            "</div>";
          setTimeout(() => {
            document.getElementById("markAlert").innerHTML = "";
          }, 4000);
        });
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
      <div className="container login-container">
        <div id="markAlert" />
        <div className="row">
          {this.loginArea()}
          {this.registerArea()}
        </div>
        {this.checkRedirect()}
      </div>
    );
  };

  loginArea = () => {
    return (
      <div className="col-md-6 login-form-1">
        <h3>Login</h3>
        <form onSubmit={this.actionLogin}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              email="password"
              name="password"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btnSubmit">
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
              name="firstName"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Último nome</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirme a sua senha</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="form-group">
              <button type="submit" className="btnSubmit">
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
