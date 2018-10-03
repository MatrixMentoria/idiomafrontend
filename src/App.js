import React, { Component } from "react";
import "./App.css";
import MediaElement from "./MediaElement";
import "./App.css";
import teste from "../src/Mac Miller - Best Day Ever.mp3";
import img1 from "../src/imagens/bandeiradobrasil.png";
import img2 from "../src/imagens/bandeiradoseua.png";
import img3 from "../src/imagens/hideicon.png";

class App extends Component {
  // Other code
  /*baseCard1() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Título do Texto em Português</h5>
          <h6 className="card-subtitle mb-2 text-muted">Texto em português</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    );
  }

  textView() {
    return (
      <div>
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
      </div>
    );
  }

  baseCard2() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Título do Texto em Inglês</h5>
          <h6 className="card-subtitle mb-2 text-muted">Texto em Inglês</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    );
  }

  botoesControles() {
    return (
      <div>
        <button type="button" className="btn btn-light">
          Voltar aos textos
        </button>
        <button type="button" className="btn btn-light">
          Repetição do texto
        </button>
        <button type="button" className="btn btn-light">
          Ir para repetições
        </button>
      </div>
    );
  }*/
  render() {
    const sources = [
        {
          src: "http://www.streambox.fr/playlists/test_001/stream.m3u8",
          type: "application/x-mpegURL"
        },
        {
          src: teste,
          type: "audio/mp3"
        }
        /*{
          src: "../Music/Mac Miller - Best Day Ever.mp3",
          type: "audio/wmp"
        }*/
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
              bottom: "70%"
            }}
            align="center"
          >
            <i
              class="fas fa-clipboard-check"
              style={{
                width: "50px",
                height: "50px",
                left: "19%"
              }}
            />
            <i
              class="fas fa-backward"
              style={{
                width: "50px",
                height: "50px",
                left: "19%"
              }}
            />
            <i
              class="fas fa-redo-alt"
              style={{
                width: "50px",
                height: "50px",
                left: "19%"
              }}
            />

            <i
              class="fas fa-cog"
              style={{
                width: "50px",
                height: "50px",
                left: "19%"
              }}
            />
            <i
              class="fas fa-forward"
              style={{
                width: "50px",
                height: "50px",
                left: "19%"
              }}
            />
          </div>
          <div
            className="card "
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

        <img
          src={img1}
          style={{
            width: "50px",
            position: "absolute",
            left: "45%",
            bottom: "60%"
          }}
        />
        <img
          src={img2}
          style={{
            width: "50px",
            position: "absolute",
            left: "45%",
            bottom: "51%"
          }}
        />
        <img
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
            >
              Ir para repetições
            </button>
          </div>
        </div>
      </div>
      /*<MediaElement
        id="player1"
        mediaType="audio"
        preload="none"
        controls
        width="640"
        height="360"
        poster=""
        sources={JSON.stringify(sources)}
        options={JSON.stringify(config)}
        tracks={JSON.stringify(tracks)}
      />*/
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
