import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { theme } from "./theme/theme";

import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
