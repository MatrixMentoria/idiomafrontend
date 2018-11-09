import axios from "axios";

const urls = { audios: "audio/", markers: "marking/" };

const getAudios = () => {
  return axios.get(urls.audios).catch(error => {
    if (error.response.status === 401) document.location.replace("/Login");
    return error.response;
  });
};

const getAudio = id => {
  return axios.get(urls.audios + id).catch(error => {
    if (error.response.status === 401) document.location.replace("/Login");
    return error.response;
  });
};

const getMarkers = audioId => {
  const url = `${urls.markers}?audioId=${audioId}`;

  return axios.get(url).catch(error => {
    if (error.response.status === 401) document.location.replace("/Login");
    return error.response;
  });
};

export default {
  getAudios,
  getAudio,
  getMarkers
  //TODO: façam nesse modelo a criação de markers
};
