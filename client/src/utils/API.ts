import axios from "axios";
import qs from "qs";

export const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: better implement
    console.error(error.message);
  },
);
