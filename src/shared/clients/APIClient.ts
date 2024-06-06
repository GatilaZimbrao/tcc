import axios from "axios";
import { API_ENDPOINTS, enviroment } from "../constants/enviroment";
import Cookies from "js-cookie";
import { SESSION_TOKEN } from "../constants/cookies";

const BASE_URL = API_ENDPOINTS[enviroment];

export const getAPIClient = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const sessionToken = Cookies.get(SESSION_TOKEN);

    if (sessionToken) config.headers["Authorization"] = sessionToken;

    return config;
  });

  return api;
};

export const api = getAPIClient();
