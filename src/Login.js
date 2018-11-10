import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
import authService from "./authService";
import swal from "sweetalert";

class Login extends Component {
  state = {
    isAuthorized: false,
    firstName: "",
    lastName: "",
    email: "aaa@aaa.com",
    password: "123456",
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
        swal("Falha ao logar!", "E-mail ou senha inválidos.", "error", {
          timer: 2500
        });
      })
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
          swal(
            "Sucesso!",
            "Usuário " +
              this.state.firstName +
              " " +
              this.state.lastName +
              " cadastrado!",
            "success",{
              timer: 2500
            }
          );
        })
        .catch(error => {
          swal("Falha ao cadastrar!", "" + error + "", "error", {
            timer: 2500
          });
        });
    } else {
      swal("Falha ao cadastrar!", "As senhas não são iguais.", "warning", {
        timer: 2500
      });
    }
  };

  checkRedirect = () => {
    if (this.state.isAuthorized) {
      return <Redirect to="/Audios" />;
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
              Login
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
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
}

export default Login;
