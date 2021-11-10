import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.js";
import { theme } from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
