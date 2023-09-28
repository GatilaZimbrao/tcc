import axios from "axios";
// import Cookies from "js-cookie";
import { API_ENDPOINTS, enviroment } from "../constants/enviroment";

const BASE_URL = API_ENDPOINTS[enviroment];

export const getAPIClient = () => {
  console.log("enviroment", enviroment);
  const api = axios.create({
    baseURL: BASE_URL,
  });

  return api;
};

export const api = getAPIClient();
