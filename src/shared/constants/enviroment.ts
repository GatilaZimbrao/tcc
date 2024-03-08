export const isDev = process.env.VITE_ENVIROMENT === "dev";

export const enviroment = isDev ? "dev" : "prod";

export const API_ENDPOINTS = {
  dev: "http://localhost:5000/api/v1",
  prod: "http://localhost:5000/api/v1",
};
