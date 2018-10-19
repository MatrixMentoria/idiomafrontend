import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Glyphicon } from "react-bootstrap";
import "./css/App.css";
import "./css/styles.css";
import axios from "axios";
import img1 from "./medias/bandeiradobrasil.png";
import img2 from "./medias/bandeiradoseua.png";
import img3 from "./medias/hideicon.png";
import img4 from "./medias/retornar3s.png";
import img5 from "./medias/avancar3s.png";
import img6 from "./medias/bookmark.png";

class App extends Component {
  state = {
    //Info Player
    audio: document.getElementsByTagName("audio"),
    velocidade: null,

    //Infos User
    userId: null,

    //Infos Audio
    audioId: null,
    link: null,
    duracao: {
      total: null,
      hor: null,
      min: null,
      seg: null
    },
    legendaEN: null,
    legendaPT: null,

    tituloEN: null,
    textoEN: null,
    tituloPT: null,
    textoPT: null,

    //Infos Marcadores
    marcadores: []
  };

  componentDidMount = () => {
    axios.get("http://idiomabackend.herokuapp.com/audio/").then(result => {
      const audioId = result.data[0].id;
      const link = result.data[0].link;
      const legendaEN = result.data[0].englishSubtitle;
      const legendaPT = result.data[0].portugueseSubtitle;
      const total = result.data[0].duration;
      const tituloEN = result.data[0].englishTitle;
      const textoEN = result.data[0].englishTranscription;
      const tituloPT = result.data[0].portugueseTitle;
      const textoPT = result.data[0].portugueseTranscription;

      this.setState({
        velocidade: "1.0x",
        audioId: audioId,
        link: link,
        duracao: {
          total: total
        },
        legendaEN: legendaEN,
        legendaPT: legendaPT,
        tituloEN: tituloEN,
        textoEN: textoEN,
        tituloPT: tituloPT,
        textoPT: textoPT
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
  };

  popularListaMarcadores = () => {
    axios
      .get(`https://idiomabackend.herokuapp.com/marking?userId=1&audioId=1`)
      .then(result => {
        const marcadores = result.data;
        this.setState({
          marcadores: marcadores
        });
      });
  };

  adicionarMarcador = novoMarcador => {
    axios
      .post("http://idiomabackend.herokuapp.com/marking/", novoMarcador)
      .then(result => {
        alert("Marcador nº " + result.data.id + " cadastrado com sucesso!");
      });
  };

  excluirMarcarao = id => {
    axios
      .delete("http://idiomabackend.herokuapp.com/marking/" + id)
      .then(() => {
        alert("Marcador nº " + id + " excluído com sucesso!");
      })
      .then(() => {
        window.location.reload(true);
      });
  };

  gerarMarcacao = () => {
    if (this.state.audio[0].currentTime < 1) var tempoMinimo = 0;
    else tempoMinimo = this.state.audio[0].currentTime - 1;

    const novoMarcador = {
      audioId: this.state.audioId,
      userId: this.state.userId,
      begin: tempoMinimo,
      end: this.state.audio[0].currentTime + 3
    };
    this.adicionarMarcador(novoMarcador);
  };

  tocarMarcacao = marcadorBegin => {
    this.state.audio[0].currentTime = marcadorBegin;
    this.state.audio[0].play();
    setTimeout(() => {
      this.state.audio[0].pause();
    }, 5000);
  };

  converterSegundos = duracao => {
    const hor = Math.trunc(duracao / 3600);
    const min = Math.trunc(duracao / 60);
    const seg = duracao % 60;

    this.setState({
      duracao: {
        hor: hor,
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

    const velocidade = this.state.audio[0].playbackRate.toFixed(1).toString();

    this.setState({
      velocidade: velocidade + "x"
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
      this.refs.titlePT.textContent = this.state.tituloPT;
      this.refs.txtPT.textContent = this.state.textoPT;
    }
  };

  exibirOcultarTxtEN = () => {
    if (this.refs.txtEN.textContent !== "") {
      this.refs.titleEN.textContent = "";
      this.refs.txtEN.textContent = "";
    } else {
      this.refs.titleEN.textContent = this.state.tituloEN;
      this.refs.txtEN.textContent = this.state.textoEN;
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
      <div className="container">
        {this.Player()}
        {this.ControlesPlayer()}
        <div className="row">
          {this.CardUm()}
          {this.Imagens_PT_EN_Null()}
          {this.CardDois()}
        </div>
        {this.ControlesPagina()}
        {this.MarcadoresLista()}
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
            controls
          />
        </div>
      </div>
    );
  };

  ControlesPlayer = () => {
    return (
      <div className="row wrapper-row">
        <div className="play-audio-buttons">
          <input
            type="image"
            alt="img"
            src={img6}
            id="icon-marcador"
            onClick={this.gerarMarcacao}
          />
          <input
            type="image"
            alt="img"
            src={img4}
            id="icon-retornar"
            onClick={this.voltarTresSegundos}
          />
          <input
            type="image"
            alt="img"
            src={img5}
            id="icon-avancar"
            onClick={this.avancarTresSegundos}
          />
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
          <label
            type="button"
            className="btn btn-light btn-text"
            id="velocidade"
          >
            {this.state.velocidade}
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
        </div>
      </div>
    );
  };

  CardUm = () => {
    return (
      <div className="col-12 col-md-5 col-lg-5 card card-portuguese ">
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Texto em Português</h6>
          <h5 className="card-title" ref="titlePT">
            {this.state.tituloPT}
          </h5>
          <p className="card-text" ref="txtPT">
            {this.state.textoPT}
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
            {this.state.tituloEN}
          </h5>
          <p className="card-text" ref="txtEN">
            {this.state.textoEN}
          </p>
        </div>
      </div>
    );
  };

  ControlesPagina = () => {
    return (
      <div className="row wrapper-row">
        <div className="col-12 col-md-4">
          <button type="button" className="btn btn-light btn-text">
            Voltar aos textos
          </button>
        </div>
        <div className="col-12 col-md-4">
          <button type="button" className="btn btn-light btn-text">
            Repetição do texto
          </button>
        </div>
        <div className="col-12 col-md-4">
          <button type="button" className="btn btn-light btn-text ">
            Ir para repetições
          </button>
        </div>
      </div>
    );
  };

  MarcadoresLista = () => {
    return (
      <div>
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
            <table style={{ marginTop: 10 }} className="table table-hover">
              <thead>
                <tr>
                  <th>Início</th>
                  <th>Fim</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {this.state.marcadores.map(marcador => {
                  return (
                    <tr key={marcador.id}>
                      <td>{marcador.begin}</td>
                      <td>{marcador.end}</td>
                      <td>
                        <a
                          href="#play"
                          onClick={() => {
                            this.tocarMarcacao(marcador.begin);
                          }}
                        >
                          <Glyphicon glyph="play" />
                        </a>
                        {"   "}
                        <a
                          href="#trash"
                          onClick={() => {
                            this.excluirMarcarao(marcador.id);
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
