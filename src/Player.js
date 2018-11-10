import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
import API from "./api";
import img1 from "./medias/bandeiradobrasil.png";
import img2 from "./medias/bandeiradoseua.png";
import img3 from "./medias/hideicon.png";
import img4 from "./medias/Legendas.png";
import img5 from "./medias/teclado.png";
import ReactTooltip from "react-tooltip";
import Modal from "react-responsive-modal";
import Collapse from "react-css-collapse";
import swal from "sweetalert";

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
    show: false,

    //Disabled dos botões
    bMais: false,
    bMenos: false
  };

  componentDidMount = () => {
    API.getAudio(this.props.match.params.id).then(result => {
      const audioId = result.data.id;
      const link = result.data.link;
      const subtitleEN = result.data.englishSubtitle;
      const subtitlePT = result.data.portugueseSubtitle;
      const total = result.data.duration;
      const titleEN = result.data.englishTitle;
      const transcriptionEN = result.data.englishTranscription;
      const titlePT = result.data.portugueseTitle;
      const transcriptionPT = result.data.portugueseTranscription;

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
      this.fillListMarkers();
    });

    //manipulação do player usando o teclado
    document.onkeydown = event => {
      var keycode = event.keyCode ? event.keyCode : event.which;
      var audio = document.getElementsByTagName("audio");
      // ctrl + espaço
      if (keycode === 32) {
        if (audio[0].paused) {
          void window.scrollTop;
          audio[0].play();
        } else {
          void window.scrollTop;
          audio[0].pause();
        }
      }
      // ctrl + seta esquerda
      if (keycode === 37) audio[0].currentTime -= 3;
      // ctrl + seta direita
      if (keycode === 39) audio[0].currentTime += 3;
      //ctrl + "m"
      if (keycode === 77) document.getElementById("icon-marcador").click();
      //"+" ou "="
      if (keycode === 187) document.getElementById("mais").click();
      //"-"
      if (keycode === 189) document.getElementById("menos").click();
    };
  };

  fillListMarkers = () => {
    API.getMarkers(this.props.match.params.id).then(result => {
      //if abaixo temporário até update no código backend
      if (result.data === "") {
        this.setState({
          markings: []
        });
      } else {
        this.setState({
          markings: result.data
        });
      }
    });
  };

  destroyMarker = id => {
    API.deleteMarker(id).then(() => {
      swal("Sucesso!", "Marcador excluído.", "success", {
        timer: 2500
      });
      this.fillListMarkers();
    });
  };

  createMarker = () => {
    if (this.state.audio[0].currentTime < 1) var minimumTime = 0;
    else minimumTime = this.state.audio[0].currentTime - 1;
    const newMarking = {
      audioId: this.state.audioId,
      begin: minimumTime,
      end: this.state.audio[0].currentTime + 3
    };
    API.addMarker(newMarking).then(() => {
      swal("Sucesso!", "Marcador adicionado.", "success", {
        timer: 2500
      });
      this.fillListMarkers();
    });
  };

  playMarker = markingBegin => {
    this.state.audio[0].currentTime = markingBegin;
    this.state.audio[0].play();
    setTimeout(() => {
      this.state.audio[0].pause();
    }, 5000);
  };

  changeAudioSpeed = info => {
    info === true
      ? (this.state.audio[0].playbackRate += 0.1)
      : (this.state.audio[0].playbackRate -= 0.1);

    this.state.audio[0].playbackRate > 2
      ? this.setState({ bMais: true })
      : this.setState({ bMais: false });

    this.state.audio[0].playbackRate < 0.51
      ? this.setState({ bMenos: true })
      : this.setState({ bMenos: false });

    const speed = this.state.audio[0].playbackRate.toFixed(1).toString();

    this.setState({
      speed: speed + "x"
    });
  };

  forward3Seconds = () => {
    this.state.audio[0].currentTime += 3;
  };

  back3Seconds = () => {
    this.state.audio[0].currentTime -= 3;
  };

  showHideTxtPT = () => {
    var title = document.getElementById("titlePT"),
      transcription = document.getElementById("txtPT");
    if (title.textContent !== "") {
      title.textContent = "";
      transcription.textContent = "";
    } else {
      title.textContent = this.state.titlePT;
      transcription.textContent = this.state.transcriptionPT;
    }
  };

  showHideTxtEN = () => {
    var title = document.getElementById("titleEN"),
      transcription = document.getElementById("txtEN");
    if (title.textContent !== "") {
      title.textContent = "";
      transcription.textContent = "";
    } else {
      title.textContent = this.state.titleEN;
      transcription.textContent = this.state.transcriptionEN;
    }
  };

  hideAll = () => {
    var titlePT = document.getElementById("titlePT"),
      transcriptionPT = document.getElementById("txtPT"),
      titleEN = document.getElementById("titleEN"),
      transcriptionEN = document.getElementById("txtEN");
    if (titlePT.textContent !== "" && titleEN.textContent) {
      titlePT.textContent = "";
      transcriptionPT.textContent = "";
      titleEN.textContent = "";
      transcriptionEN.textContent = "";
    } else {
      titlePT.textContent = this.state.titlePT;
      transcriptionPT.textContent = this.state.transcriptionPT;
      titleEN.textContent = this.state.titleEN;
      transcriptionEN.textContent = this.state.transcriptionEN;
    }
  };

  render = () => {
    return (
      <div>
        <div className="container" id="corpo">
          {this.pageControls()}
          <div id="markAlert" />
          {this.Player()}
          {this.controlsPlayer()}
          {this.listMarker()}
          <div className="row">
            {this.cardOne()}
            {this.Images_PT_EN_Null()}
            {this.cardTwo()}
          </div>
        </div>
      </div>
    );
  };

  listMarker = () => {
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
          <div>{this.markersList()}</div>
        </Collapse>
      </div>
    );
  };

  Player = () => {
    return (
      <div className="player-wrapper">
        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
          <ReactPlayer
            className="react-player"
            url={this.state.link}
            volume={0.5}
            loop={false}
            playbackRate={1.0}
            playing={false}
            muted={false}
            width={1140}
            height={100}
            controls
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
          />
        </div>
      </div>
    );
  };

  controlsPlayer = () => {
    return (
      <div className="row wrapper-row">
        <div className="play-audio-buttons">
          <Glyphicon
            glyph="glyphicon glyphicon-bookmark icon-highlighter"
            id="icon-marcador"
            onClick={this.createMarker}
          />

          <p data-tip=" Retroceder 3 seg ">
            <Glyphicon
              glyph="glyphicon glyphicon-repeat left-icon"
              onClick={this.back3Seconds}
            />
          </p>
          <ReactTooltip />

          <p data-tip=" Avançar 3 seg ">
            <Glyphicon
              glyph="glyphicon glyphicon-repeat icon-advance"
              onClick={this.forward3Seconds}
            />
          </p>
          <ReactTooltip />
        </div>
        <button
          type="button"
          className="btn btn-light btn-text"
          id="menos"
          disabled={this.state.bMenos}
          onClick={() => {
            this.changeAudioSpeed(false);
          }}
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
          disabled={this.state.bMais}
          onClick={() => {
            this.alterarVelocidadeAudio(true);
          }}
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
          <img src={img4} alt="" />
        </Modal>
      </div>
    );
  };

  cardOne = () => {
    return (
      <div className="col-12 col-md-5 col-lg-5 col-xl-5 card card-portuguese ">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Texto em Português</h6>
          <h5 className="card-title" id="titlePT">
            {this.state.titlePT}
          </h5>
          <p className="card-text" id="txtPT">
            {this.state.transcriptionPT}
          </p>
        </div>
      </div>
    );
  };

  Images_PT_EN_Null = () => {
    return (
      <div className="col-12 col-md-2 col-lg-2 col-xl-2">
        <div className="row flag">
          <div className="col-12">
            <input
              type="image"
              alt="img"
              src={img1}
              id="flag-brasil"
              onClick={this.showHideTxtPT}
            />
          </div>
          <div className="col-12">
            <input
              type="image"
              alt="img"
              src={img2}
              id="flag-eua"
              onClick={this.showHideTxtEN}
            />
          </div>
          <div className="col-12">
            <input
              type="image"
              alt="img"
              src={img3}
              id="hide-icon"
              onClick={this.hideAll}
            />
          </div>
        </div>
      </div>
    );
  };

  cardTwo = () => {
    return (
      <div className=" col-12 col-md-5 col-lg-5  col-xl-5 card card-english">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Texto em Inglês</h6>
          <h5 className="card-title" id="titleEN">
            {this.state.titleEN}
          </h5>
          <p className="card-text" id="txtEN">
            {this.state.transcriptionEN}
          </p>
        </div>
      </div>
    );
  };

  pageControls = () => {
    return (
      <div className="row wrapper-row">
        <div className="col-12 col-md-1">
          <button type="button" className="btn btn-light btn-text">
            <Link to="/Audios">Voltar aos áudios</Link>
          </button>
        </div>
      </div>
    );
  };

  markersList = () => {
    const ordenado = this.state.markings.sort(function(anterior, proximo) {
      return anterior.begin - proximo.begin;
    });
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
                {ordenado.map(marking => {
                  return (
                    <tr key={marking.id} id={marking.id}>
                      <td>{marking.begin}</td>
                      <td>{marking.end}</td>
                      <td>
                        <a
                          href="#play"
                          onClick={() => {
                            this.playMarker(marking.begin);
                          }}
                        >
                          <Glyphicon glyph="play" />
                        </a>
                        {"   "}
                        <a
                          href="#trash"
                          onClick={() => {
                            this.destroyMarker(marking.id);
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
