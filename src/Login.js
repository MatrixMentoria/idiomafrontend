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
    password: ""
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
      .catch(error => {
        console.log(error.response.data);
      });

    // axios
    //   .get("https://idiomabackend.herokuapp.com/user/1")
    //   .then(result => {
    //     if (
    //       result.data.email === this.state.email &&
    //       result.data.password === this.state.password
    //     ) {
    //       this.setState({
    //         isAuthorized: true
    //       });
    //     } else {
    //       window.scrollTo(0, 0);
    //       document.getElementById("markAlert").innerHTML =
    //         '<div class="alert alert-danger" role="alert"><strong>Falha ao logar! </strong>E-mail ou senha inválidos.</div>';
    //       setTimeout(() => {
    //         document.getElementById("markAlert").innerHTML = "";
    //       }, 4000);
    //     }
    //   })
    //   .catch(result => {
    //     //pegue os erros com o catch
    //     window.scrollTo(0, 0);
    //     document.getElementById("markAlert").innerHTML =
    //       '<div class="alert alert-danger" role="alert"><strong>Falha ao logar! </strong>E-mail ou senha inválidos.</div>';
    //     setTimeout(() => {
    //       document.getElementById("markAlert").innerHTML = "";
    //     }, 4000);
    //   });
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
        '<div class="alert alert-success" role="alert"><strong>Sucesso! </strong>Usuário ' +
        newUser.personData.firstName +
        " " +
        newUser.personData.lastName +
        " cadastrado!</div>";
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
              value={this.state.email}
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
