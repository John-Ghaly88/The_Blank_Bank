import axios from "axios";
import baseURL from "../baseurl.config";

// Request interceptor
axios.interceptors.request.use(
  function (config) {
    const accessToken =
      localStorage.getItem("jwt") && JSON.parse(localStorage.getItem("jwt"));
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    };

    config.headers.common = headers;
    config.baseURL = baseURL;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
