import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";

import "./App.css";
import { Container } from "@mui/material";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Container style={{ marginTop: "20px" }}>
            <Home />
          </Container>
        </Route>
        <Route path="/main" component={Main} />
        <Route path="/detail" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
