import React, { Component } from "react";
import ReactPlayer from "react-player";
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
    tempo: document.getElementsByTagName("audio"),
    audioId: null,
    link: null,
    englishTranscription: null,
    portugueseTranscription: null,
    userId: null,
    velocidade: null,

    time: {
      total: null,
      hor: null,
      min: null,
      seg: null
    },

    tempoMarcacao: {
      begin: null,
      end: null
    },
    lista: []
  };

  marcador = {
    begin: null,
    end: null,
    userId: null,
    audioId: null
  };

  buscarMarcador() {
    axios
      .get(`https://idiomabackend.herokuapp.com/marking?userId=1&audioId=1`)
      .then(res => {
        const lista = res.data;
        console.log(lista);
        this.setState({ lista });
      });
  }

  componentDidMount() {
    axios.get("http://idiomabackend.herokuapp.com/audio/").then(result => {
      const audioId = result.data[0].id;
      const link = result.data[0].link;
      const total = result.data[0].duration;
      const englishTranscription = result.data[0].englishTranscription;
      const portugueseTranscription = result.data[0].portugueseTranscription;

      this.setState({
        audioId: audioId,
        link: link,
        englishTranscription: englishTranscription,
        portugueseTranscription: portugueseTranscription,
        velocidade: "1.0x",

        time: {
          total: total
        }
      });

      this.converterSegundos(total);

      this.buscarMarcador();
    });

    axios.get("http://idiomabackend.herokuapp.com/user/1").then(response => {
      const userId = response.data.id;

      this.setState({
        userId: userId
      });
    });
  }

  adicionarMarcador(objeto) {
    axios
      .post("http://idiomabackend.herokuapp.com/marking/", objeto)
      .then(response => {
        console.log("response", response);
        alert("Marcador Cadastrado!!");
        return response.data;
      });
  }

  gerarMarcacao = event => {
    this.marcador.begin = this.state.tempo[0].currentTime - 1;
    this.marcador.end = this.state.tempo[0].currentTime + 3;
    this.marcador.userId = this.state.userId;
    this.marcador.audioId = this.state.audioId;

    this.adicionarMarcador(this.marcador);
    console.log("asdsad - ", this.marcador);
    console.log("time - ", this.state.tempo);
  };

  converterSegundos = time => {
    const hor = Math.trunc(time / 3600);
    const min = Math.trunc(time / 60);
    const seg = time % 60;

    this.setState({
      time: {
        hor: hor,
        min: min,
        seg: seg
      }
    });
  };

  alterarVelocidadeAudio = info => {

    info === true ?
      this.state.tempo[0].playbackRate += 0.1 :
      this.state.tempo[0].playbackRate -= 0.1;

    this.state.tempo[0].playbackRate > 2 ?
      this.refs.bMais.disabled = true :
      this.refs.bMais.disabled = false;

    this.state.tempo[0].playbackRate < 0.51 ?
      this.refs.bMenos.disabled = true:
      this.refs.bMenos.disabled = false;
    
    const velocidade = this.state.tempo[0].playbackRate.toFixed(1).toString();

    this.setState({
      velocidade: (velocidade + "x"),
    });
  };

  avancarTresSegundos = event => {
    this.state.tempo[0].currentTime += 3;
  };

  voltarTresSegundos = event => {
    this.state.tempo[0].currentTime -= 3;
  };

  tocarMarcacao = (marcadorBegin, marcadorEnd) => {
    this.state.tempo[0].currentTime = marcadorBegin;
  };

  // voltarAoInicio = event => {
  //   this.state.time.player1_html5.pause();
  //   this.state.time.player1_html5.currentTime = 0;
  //   this.state.time.player1_html5.playbackRate = 1.0;
  //   this.state.time.player1_html5.play();
  // };

  render() {
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
        {this.listarMarcador()}
      </div>
    );
  }

  Player() {
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
            ref={this.ref}
            controls
          />
        </div>
      </div>
    );
  }

  ControlesPlayer() {
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
            onClick={() => { this.alterarVelocidadeAudio(false); }}
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
            onClick={() => { this.alterarVelocidadeAudio(true); }}
            ref="bMais"
          >
            {" "}
            +{" "}
          </button>
        </div>
      </div>
    );
  }

  CardUm() {
    return (
      <div className="col-12 col-md-5 col-lg-4 card card-portuguese ">
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

  Imagens_PT_EN_Null() {
    return (
      <div className="col-12 col-md-2 col-lg-4 ">
        <div className="row flag">
          <div className="col-12">
            <input type="image" alt="img" src={img1} id="flag-brasil" />
          </div>
          <div className="col-12">
            <input type="image" alt="img" src={img2} id="flag-eua" />
          </div>
          <div className="col-12">
            <input type="image" alt="img" src={img3} id="hide-icon" />
          </div>
        </div>
      </div>
    );
  }

  CardDois() {
    return (
      <div className=" col-12 col-md-5 col-lg-4  card card-english">
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

  ControlesPagina() {
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
  }

  listarMarcador() {
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
                  <th>Id</th>
                  <th>Início</th>
                  <th>Fim</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.lista.map(marcador => {
                  return (
                    <tr key={marcador.id}>
                      <td>{marcador.id}</td>
                      <td>{marcador.begin}</td>
                      <td>{marcador.end}</td>

                      <td>
                        <button
                          className="btn btn-outline-primary"
                          onClick={e => {
                            this.tocarMarcacao(marcador.begin, marcador.end);
                          }}
                        >
                          Selecionar
                        </button>
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
  }
}

export default App;
