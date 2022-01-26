import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App.js";
import { store } from "./app/store.js";
import "mapbox-gl/dist/mapbox-gl.css";

import axios from "axios";

axios.defaults.baseURL = "https://shrouded-taiga-91101.herokuapp.com/api";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
