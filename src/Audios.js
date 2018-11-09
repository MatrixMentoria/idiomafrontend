import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "./api";

class Audios extends Component {
  state = { audios: [{ id: 1 }, { id: 2 }] };

  componentDidMount = () => {
    API.getAudios().then(response => {
      const audios = response.data;
      this.setState({ audios });
    });
  };

  render() {
    return (
      <div className="container">
        <h3>Olá, usuário!</h3>
        <div style={{ overflow: "auto", height: 200 }} id="listaMarcadores">
          <h5
            className="navbar  justify-content-center"
            style={{ color: "#000" }}
          >
            Lista de Áudios ({this.state.audios.length})
          </h5>
          <div className="container">
            <div className="row">
              <div className="col-sm-12" />
            </div>
            <div>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Título EN</th>
                    <th>Título PT</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.audios.map(audio => {
                    return (
                      <tr key={audio.id}>
                        <td>{audio.englishTitle}</td>
                        <td>{audio.portugueseTitle}</td>
                        <td>
                          <Link to={`Player/${audio.id}`}>Acessar</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Audios;