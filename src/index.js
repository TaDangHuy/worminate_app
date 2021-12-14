import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./App.js";
import "./index.js";
import { store } from "./app/store.js";



import { initFacebookSdk, jwtInterceptor, errorInterceptor, history } from './_helpers';

// setup fake backend
import { fakeBackend } from './_helpers';
fakeBackend();

jwtInterceptor();
errorInterceptor();

initFacebookSdk().then(startApp);

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );


function startApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
        </Router>
    </Provider>,
    document.getElementById("root")
  );
  
}