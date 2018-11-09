import axios from "axios";

const urls = { audios: "audio" };

const getAudios = () => {
  return axios.get(urls.audios).catch(error => {
    if (error.response.status === 401) document.location.replace("/Login");
    return error.response;
  });
};

export default {
  getAudios
};
