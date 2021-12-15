import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App.js";
import { store } from "./app/store.js";
import 'mapbox-gl/dist/mapbox-gl.css';

import axios from "axios"

axios.defaults.baseURL="https://shielded-sands-12116.herokuapp.com/api"
// import {
//   initFacebookSdk,
//   jwtInterceptor,
//   errorInterceptor,
//   history,
// } from "./_helpers";

// // setup fake backend
// import { fakeBackend } from "./_helpers";

// fakeBackend();

// jwtInterceptor();
// errorInterceptor();

// initFacebookSdk().then(startApp);

// function startApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
// }
