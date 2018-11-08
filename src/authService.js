import axios from "axios";

const urls = { token: "oauth/token" };

const authenticate = (username, password) => {
  var config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic ZnJvbnRlbmRjbGllbnQ6YXBwZnJvbnRlbmRjbGllbnQyMDE4"
    }
  };
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", "password");
  params.append("client", "frontendclient");

  return axios
    .post(urls.token, params, config)
    .then(res => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${
        res.data.access_token
      }`;
      return true;
    })
    .catch(error => {
      console.log(error.response.data);
      return false;
    });
};

export default {
  authenticate
};
