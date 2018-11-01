import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Glyphicon } from "react-bootstrap";
import "./css/App.css";
import "./css/styles.css";
import axios from "axios";
import img1 from "./medias/bandeiradobrasil.png";
import img2 from "./medias/bandeiradoseua.png";
import img3 from "./medias/hideicon.png";
import img4 from "./medias/Legendas.png";
import img5 from "./medias/teclado.png";
import ReactTooltip from "react-tooltip";
import Modal from "react-responsive-modal";

import Collapse from "react-css-collapse";

class App extends Component {
  state = {
    //Info Player
    audio: document.getElementsByTagName("audio"),
    speed: "",

    //Infos User
    userId: "",

    //Infos Audio
    audioId: "",
    link: "",
    duration: {
      total: "",
      hour: "",
      min: "",
      seg: ""
    },
    subtitleEN: "",
    subtitlePT: "",

    titleEN: "",
    transcriptionEN: "",
    titlePT: "",
    transcriptionPT: "",

    //Infos Marcadores
    markings: [],

    //collapse
    isOpen: false,

    //modal
    show: false
  };

  componentDidMount = () => {
    axios.get("http://idiomabackend.herokuapp.com/audio/").then(result => {
      const audioId = result.data[0].id;
      const link = result.data[0].link;
      const subtitleEN = result.data[0].englishSubtitle;
      const subtitlePT = result.data[0].portugueseSubtitle;
      const total = result.data[0].duration;
      const titleEN = result.data[0].englishTitle;
      const transcriptionEN = result.data[0].englishTranscription;
      const titlePT = result.data[0].portugueseTitle;
      const transcriptionPT = result.data[0].portugueseTranscription;

      this.setState({
        speed: "1.0x",
        audioId: audioId,
        link: link,
        duration: {
          total: total
        },
        subtitleEN: subtitleEN,
        subtitlePT: subtitlePT,
        titleEN: titleEN,
        transcriptionEN: transcriptionEN,
        titlePT: titlePT,
        transcriptionPT: transcriptionPT
      });

      this.converterSegundos(total);
      this.popularListaMarcadores();
    });

    axios.get("http://idiomabackend.herokuapp.com/user/1").then(result => {
      const userId = result.data.id;
      this.setState({
        userId: userId
      });
    });

    //manipulação do player usando o teclado
    document.onkeydown = function(event) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      var audio = document.getElementsByTagName("audio");
      // ctrl + espaço
      if (keycode === 32) {
        if (audio[0].paused) {
          window.scrollTop;
          audio[0].play();
        } else {
          window.scrollTop;
          audio[0].pause();
        }
        console.log(audio);
        console.log("*", keycode);
      }
      // ctrl + seta esquerda
      if (keycode === 37) {
        audio[0].currentTime -= 3;
        console.log("**", keycode);
      }
      // ctrl + seta direita
      if (keycode === 39) {
        audio[0].currentTime += 3;
        console.log("***", keycode);
      }
      //ctrl + "m"
      if (keycode === 77) {
        document.getElementById("icon-marcador").click();
        console.log("****", keycode);
      }
      //"+" ou "="
      if (keycode === 187) {
        document.getElementById("mais").click();
        console.log("****", keycode);
      }
      //"-"
      if (keycode === 189) {
        document.getElementById("menos").click();
        console.log("****", keycode);
      }

      //alert(keycode);
    };
  };

  popularListaMarcadores = () => {
    axios
      .get(`https://idiomabackend.herokuapp.com/marking?userId=1&audioId=1`)
      .then(result => {
        const marking = result.data;
        this.setState({
          markings: marking
        });
      });
  };

  adicionarMarcador = novoMarcador => {
    axios
      .post("http://idiomabackend.herokuapp.com/marking/", novoMarcador)
      .then(() => {
        document.getElementById("markAlert").innerHTML =
          '<div class="alert alert-success" role="alert"><strong>Sucesso!</strong> Novo marcador criado.</div>';
      })
      .catch(() => {
        document.getElementById("markAlert").innerHTML =
          '<div class="alert alert-danger" role="alert"><strong>Erro!</strong> Falha ao criar novo marcador.</div>';
      })
      .then(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
          document.getElementById("markAlert").innerHTML = "";
        }, 3000);
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      });
  };

  excluirMarcarao = id => {
    axios
      .delete("http://idiomabackend.herokuapp.com/marking/" + id)
      .then(() => {
        document.getElementById("markAlert").innerHTML =
          '<div class="alert alert-info" role="alert"><strong>Sucesso!</strong> Marcador excluído.</div>';
      })
      .catch(() => {
        document.getElementById("markAlert").innerHTML =
          '<div class="alert alert-warning" role="alert"><strong>Erro!</strong> Falha ao excluir marcador.</div>';
      })
      .then(() => {
        window.scrollTo(0, 0);
        document.getElementById(id.toString()).remove();
        setTimeout(() => {
          document.getElementById("markAlert").innerHTML = "";
        }, 3000);
      });
  };

  gerarMarcacao = () => {
    if (this.state.audio[0].currentTime < 1) var minimumTime = 0;
    else minimumTime = this.state.audio[0].currentTime - 1;

    const newMarking = {
      audioId: this.state.audioId,
      userId: this.state.userId,
      begin: minimumTime,
      end: this.state.audio[0].currentTime + 3
    };
    this.adicionarMarcador(newMarking);
  };

  tocarMarcacao = markingBegin => {
    this.state.audio[0].currentTime = markingBegin;
    this.state.audio[0].play();
    setTimeout(() => {
      this.state.audio[0].pause();
    }, 5000);
  };

  converterSegundos = duration => {
    const hour = Math.trunc(duration / 3600);
    const min = Math.trunc(duration / 60);
    const seg = duration % 60;

    this.setState({
      duration: {
        hour: hour,
        min: min,
        seg: seg
      }
    });
  };

  alterarVelocidadeAudio = info => {
    info === true
      ? (this.state.audio[0].playbackRate += 0.1)
      : (this.state.audio[0].playbackRate -= 0.1);

    this.state.audio[0].playbackRate > 2
      ? (this.refs.bMais.disabled = true)
      : (this.refs.bMais.disabled = false);

    this.state.audio[0].playbackRate < 0.51
      ? (this.refs.bMenos.disabled = true)
      : (this.refs.bMenos.disabled = false);

    const speed = this.state.audio[0].playbackRate.toFixed(1).toString();

    this.setState({
      speed: speed + "x"
    });
  };

  avancarTresSegundos = () => {
    this.state.audio[0].currentTime += 3;
  };

  voltarTresSegundos = () => {
    this.state.audio[0].currentTime -= 3;
  };

  exibirOcultarTxtPT = () => {
    if (this.refs.txtPT.textContent !== "") {
      this.refs.titlePT.textContent = "";
      this.refs.txtPT.textContent = "";
    } else {
      this.refs.titlePT.textContent = this.state.titlePT;
      this.refs.txtPT.textContent = this.state.transcriptionPT;
    }
  };

  exibirOcultarTxtEN = () => {
    if (this.refs.txtEN.textContent !== "") {
      this.refs.titleEN.textContent = "";
      this.refs.txtEN.textContent = "";
    } else {
      this.refs.titleEN.textContent = this.state.titleEN;
      this.refs.txtEN.textContent = this.state.transcriptionEN;
    }
  };

  ocultarTodos = () => {
    this.refs.titlePT.textContent = "";
    this.refs.txtPT.textContent = "";
    this.refs.titleEN.textContent = "";
    this.refs.txtEN.textContent = "";
  };

  render = () => {
    return (
      <div>
        <div className="container" id="corpo">
          {this.ControlesPagina()}
          <div id="markAlert" />
          {this.Player()}
          {this.ControlesPlayer()}
          {this.MarkLista()}
          <div className="row">
            {this.CardUm()}
            {this.Imagens_PT_EN_Null()}
            {this.CardDois()}
          </div>
        </div>
      </div>
    );
  };

  MarkLista = () => {
    return (
      <div>
        <button
          className="btn btn-primary"
          id="btn-marcadores"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          Marcadores
        </button>
        <Collapse isOpen={this.state.isOpen}>
          <div>{this.MarcadoresLista()}</div>
        </Collapse>
      </div>
    );
  };

  Player = () => {
    return (
      <div className="player-wrapper">
        <div className="col-12 col-md-12">
          <ReactPlayer
            className="react-player"
            url={this.state.link}
            volume={0.5}
            loop={false}
            playbackRate={1.0}
            playing={false}
            muted={false}
            width={1140}
            controls
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
          />
        </div>
      </div>
    );
  };

  ControlesPlayer = () => {
    return (
      <div className="row wrapper-row">
        <div className="play-audio-buttons">
          <Glyphicon
            glyph="glyphicon glyphicon-bookmark icon-highlighter"
            id="icon-marcador"
            onClick={this.gerarMarcacao}
          />

          <p data-tip=" Retroceder 3 seg ">
            <Glyphicon
              glyph="glyphicon glyphicon-repeat left-icon"
              onClick={this.voltarTresSegundos}
            />
          </p>
          <ReactTooltip />

          <p data-tip=" Avançar 3 seg ">
            <Glyphicon
              glyph="glyphicon glyphicon-repeat icon-advance"
              onClick={this.avancarTresSegundos}
            />
          </p>
          <ReactTooltip />
        </div>
        <button
          type="button"
          className="btn btn-light btn-text"
          id="menos"
          onClick={() => {
            this.alterarVelocidadeAudio(false);
          }}
          ref="bMenos"
        >
          {" "}
          -{" "}
        </button>
        <label type="button" className="btn btn-light btn-text" id="velocidade">
          {this.state.speed}
        </label>
        <button
          type="button"
          className="btn btn-light btn-text"
          id="mais"
          onClick={() => {
            this.alterarVelocidadeAudio(true);
          }}
          ref="bMais"
        >
          {" "}
          +{" "}
        </button>
        <input
          type="image"
          alt="img"
          src={img5}
          id="btn-modal"
          onClick={() => this.setState({ show: !this.state.show })}
        />
        <Modal
          open={this.state.show}
          onClose={() => this.setState({ show: !this.state.show })}
        >
          <img src={img4} />
        </Modal>
      </div>
    );
  };

  CardUm = () => {
    return (
      <div className="col-12 col-md-5 col-lg-5 card card-portuguese ">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Texto em Português</h6>
          <h5 className="card-title" ref="titlePT">
            {this.state.titlePT}
          </h5>
          <p className="card-text" ref="txtPT">
            {this.state.transcriptionPT}
          </p>
        </div>
      </div>
    );
  };

  Imagens_PT_EN_Null = () => {
    return (
      <div className="col-12 col-md-2 col-lg-2 ">
        <div className="row flag">
          <div className="col-12">
            <input
              type="image"
              alt="img"
              src={img1}
              id="flag-brasil"
              onClick={this.exibirOcultarTxtPT}
            />
          </div>
          <div className="col-12">
            <input
              type="image"
              alt="img"
              src={img2}
              id="flag-eua"
              onClick={this.exibirOcultarTxtEN}
            />
          </div>
          <div className="col-12">
            <input
              type="image"
              alt="img"
              src={img3}
              id="hide-icon"
              onClick={this.ocultarTodos}
            />
          </div>
        </div>
      </div>
    );
  };

  CardDois = () => {
    return (
      <div className=" col-12 col-md-5 col-lg-5  card card-english">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Texto em Inglês</h6>
          <h5 className="card-title" ref="titleEN">
            {this.state.titleEN}
          </h5>
          <p className="card-text" ref="txtEN">
            {this.state.transcriptionEN}
          </p>
        </div>
      </div>
    );
  };

  ControlesPagina = () => {
    return (
      <div className="row wrapper-row">
        <div className="col-12 col-md-1">
          <button type="button" className="btn btn-light btn-text">
            Voltar aos áudios
          </button>
        </div>
      </div>
    );
  };

  MarcadoresLista = () => {
    return (
      <div style={{ overflow: "auto", height: 200 }} id="listaMarcadores">
        <h5
          className="navbar  justify-content-center"
          style={{ color: "#000" }}
        >
          Lista de Marcadores
        </h5>
        <div className="container">
          <div className="row">
            <div className="col-sm-12" />
          </div>

          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Início</th>
                  <th>Fim</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {this.state.markings.map(marking => {
                  return (
                    <tr key={marking.id} id={marking.id}>
                      <td>{marking.begin}</td>
                      <td>{marking.end}</td>
                      <td>
                        <a
                          href="#play"
                          onClick={() => {
                            this.tocarMarcacao(marking.begin);
                          }}
                        >
                          <Glyphicon glyph="play" />
                        </a>
                        {"   "}
                        <a
                          href="#trash"
                          onClick={() => {
                            this.excluirMarcarao(marking.id);
                          }}
                        >
                          <Glyphicon glyph="trash" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
}

export default App;
