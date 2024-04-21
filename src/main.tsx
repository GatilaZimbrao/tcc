import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./styles/index.global.css";
import "./styles/scrollbar.global.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
