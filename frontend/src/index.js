import React from "react";
import ReactDOM from "react-dom";

import GlobalStyle from "./assets/styles/global.js";

import Routes from "./routes.js";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
