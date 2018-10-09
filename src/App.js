import React, { Component } from "react";
import "./App.css";
import MediaElement from "./MediaElement";
import img1 from "../src/imagens/bandeiradobrasil.png";
import img2 from "../src/imagens/bandeiradoseua.png";
import img3 from "../src/imagens/hideicon.png";
import axios from "../node_modules/axios";

class App extends Component {
  state = {
    time: document.getElementsByTagName("audio"),
    ms: 0,
    s: 0,
    min: 0,
    h: 0,
    hora: null,
    audios: []
  };

  marcador = event => {
    var time = [];

    time[0] = this.state.time.player1_html5.currentTime - 1;
    time[1] = this.state.time.player1_html5.currentTime + 3;

    this.calculoMarcador(time);
  };

  calculoMarcador = time => {
    var ms, seg, min, hor, inicio, final;

    for (var posicao = 0; posicao < 2; posicao++) {
      ms = time[posicao] - Math.trunc(time[posicao]);
      seg = Math.trunc(time[posicao]);

      min = Math.trunc(seg / 60);
      seg %= 60;

      hor = Math.trunc(min / 60);
      min %= 60;

      if (posicao === 0) inicio = hor + ":" + min + ":" + seg;
      if (posicao === 1) final = hor + ":" + min + ":" + seg;
    }

    console.log(inicio, final); //teste de tempo do marcador
  };

  retorna = event => {
    this.state.time.player1_html5.currentTime =
      this.state.time.player1_html5.currentTime - 3;
  };

  atrasa = event => {
    this.state.time.player1_html5.playbackRate = 0.5;
  };

  repete = event => {
    this.state.time.player1_html5.pause();
    this.state.time.player1_html5.currentTime = 0;
    this.state.time.player1_html5.playbackRate = 1.0;
    this.state.time.player1_html5.play();
  };

  normaliza = event => {
    this.state.time.player1_html5.playbackRate = 1.0;
  };

  avanca = event => {
    this.state.time.player1_html5.currentTime =
      this.state.time.player1_html5.currentTime + 3;
  };

  componentDidMount() {
    axios.get("http://idiomabackend.herokuapp.com/audio/").then(result => {
      const audios = result.data[0].link;
      this.setState({ audios });
    });
  }

  render() {
    const sources = [
        {
          src: this.state.audios.toString(),
          type: "audio/mp3"
        }
      ],
      config = {},
      tracks = {};
    return (
      <div>
        <div>
          <div
            style={{
              position: "absolute",
              left: "18%",
              bottom: "85%"
            }}
          >
            <MediaElement
              id="player1"
              mediaType="audio"
              preload="none"
              controls
              width="788"
              height="360"
              poster=""
              sources={JSON.stringify(sources)}
              options={JSON.stringify(config)}
              tracks={JSON.stringify(tracks)}
            />
          </div>
          <div
            style={{
              width: "788px",
              height: "80px",
              position: "absolute",
              left: "19%",
              bottom: "72%"
            }}
            align="center"
          >
            <button className="btn btn-light" type="image">
              <i
                className="fas fa-clipboard-check"
                style={{
                  width: "20px",
                  height: "20px",
                  left: "19%"
                }}
                onClick={this.marcador}
              />
            </button>
            <button className="btn btn-light" type="image">
              <i
                className="fas fa-fast-backward"
                style={{
                  width: "20px",
                  height: "20px",
                  left: "19%"
                }}
                onClick={this.retorna}
              />
            </button>
            <button className="btn btn-light" type="image">
              <i
                className="fas fa-backward"
                style={{
                  width: "20px",
                  height: "20px",
                  left: "19%"
                }}
                onClick={this.atrasa}
              />
            </button>
            <button className="btn btn-light" type="image">
              <i
                className="fas fa-redo-alt"
                style={{
                  width: "20px",
                  height: "20px",
                  left: "19%"
                }}
                onClick={this.repete}
              />
            </button>
            <button className="btn btn-light" type="image">
              <i
                className="fas fa-play"
                style={{
                  width: "20px",
                  height: "20px",
                  left: "19%"
                }}
                onClick={this.normaliza}
              />
            </button>
            <button className="btn btn-light" type="image">
              <i
                className="fas fa-fast-forward"
                style={{
                  width: "20px",
                  height: "20px",
                  left: "19%"
                }}
                onClick={this.avanca}
              />
            </button>
          </div>
          <div
            className="card"
            style={{
              width: "350px",
              height: "300px",
              position: "absolute",
              left: "18%",
              bottom: "30%"
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Título do Texto em Português</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Texto em português
              </h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <input
          type="image"
          src={img1}
          style={{
            width: "50px",
            position: "absolute",
            left: "45%",
            bottom: "60%"
          }}
          onClick={this.formartarHora}
        />
        <input
          type="image"
          src={img2}
          style={{
            width: "50px",
            position: "absolute",
            left: "45%",
            bottom: "51%"
          }}
        />
        <input
          type="image"
          src={img3}
          style={{
            width: "50px",
            position: "absolute",
            left: "45%",
            bottom: "40%"
          }}
        />

        <div>
          <div
            className="card"
            style={{
              width: "350px",
              height: "300px",
              position: "absolute",
              left: "50%",
              bottom: "30%"
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Título do Texto em Inglês</h5>
              <h6 className="card-subtitle mb-2 text-muted">Texto em Inglês</h6>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-light"
              style={{
                width: "200px",
                position: "absolute",
                left: "19%",
                bottom: "20%"
              }}
            >
              Voltar aos textos
            </button>
            <button
              type="button"
              className="btn btn-light"
              style={{
                width: "200px",
                position: "absolute",
                left: "39%",
                bottom: "20%"
              }}
            >
              Repetição do texto
            </button>
            <button
              type="button"
              className="btn btn-light"
              style={{
                width: "200px",
                position: "absolute",
                left: "59%",
                bottom: "20%"
              }}
              onClick={evet => {}}
            >
              Ir para repetições
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default class MostrarDadosNaTela extends Component {
  render() {
    return (
      <div className="root">
        <App />
      </div>
    );
  }
}
