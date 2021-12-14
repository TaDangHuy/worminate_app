import React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Switch, Redirect , useLocation } from 'react-router-dom';

import {PrivateRoute} from "./components/PrivateRoute"
import { lazy } from "react";
import Loadable from "./ui-component/Loadable";

const Home = Loadable(lazy(() => import("./view/Home")));
const Profile = Loadable(lazy(() => import("./view/Profile")));
const ForgotPassword = Loadable(lazy(() => import("./view/ForgotPassword")));
const Main = Loadable(lazy(() => import("./view/Main")));
const Detail = Loadable(lazy(() => import("./view/Detail")));
const Login = Loadable(
  lazy(() => import("./view/pages/authentication/Login"))
);
const Register = Loadable(
  lazy(() => import("./view/pages/authentication/Register"))
);

const theme = createTheme();

function App() {
  const pathname = useLocation().pathname || '';

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Redirect  from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/main" component={Main} />
        <PrivateRoute path="/post/:idPost" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ForgotPassword" component={ForgotPassword } />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
