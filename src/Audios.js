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
      <React.Fragment>
        <h1>Audios ({this.state.audios.length})</h1>
        <ul>
          {this.state.audios.map(item => {
            return (
              <li key={item.id}>
                <Link to={`Player/${item.id}`}>{item.englishTitle}</Link>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default Audios;
