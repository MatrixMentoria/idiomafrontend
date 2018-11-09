import axios from "axios";

const urls = { token: "oauth/token", register: "user/signup" };

const AUTH_KEY = "TOKENAUTH";
const auth_token = window.localStorage.getItem(AUTH_KEY);

if (auth_token !== null) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth_token}`;
}

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
      window.localStorage.setItem(AUTH_KEY, res.data.access_token);
      return true;
    })
    .catch(() => {
      let err = new Error(false);
      throw err;
    });
};

const register = (email, password, firstName, lastName) => {
  var config = {
    headers: {
      "Content-Type": "application/json"
      //Authorization: "Basic ZnJvbnRlbmRjbGllbnQ6YXBwZnJvbnRlbmRjbGllbnQyMDE4"
    }
  };

  const newUser = {
    email: email,
    password: password,
    personData: {
      firstName: firstName,
      lastName: lastName
    }
  };
  return axios
    .post(urls.register, newUser, config)
    .then(response => {
      return authenticate(email, password);
    })
    .catch(error => {
      throw error.response.data.detail;
    });
};

export default {
  authenticate,
  register
};
