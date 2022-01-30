import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  timeout: 10000,
});

// Insert jwt token from localstorage in authorization header of all requests
api.interceptors.request.use(
  (config) => {
    // Check internet connection
    if (!window.navigator.onLine) {
      // DOC: https://fkhadra.github.io/react-toastify/introduction/
      toast.error("Parece que você está sem conexão com a internet.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (localStorage[process.env.REACT_APP_STORAGE_KEY]) {
      config.headers = {
        Authorization: `Bearer ${
          localStorage[process.env.REACT_APP_STORAGE_KEY]
        }`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // Renew Token
    if (response.data.hasOwnProperty("newToken")) {
      localStorage[process.env.REACT_APP_STORAGE_KEY] = response.data.newToken;
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // delete localStorage[process.env.REACT_APP_STORAGE_KEY];
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
