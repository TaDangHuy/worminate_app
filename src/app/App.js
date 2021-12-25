import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { PrivateRoute } from "../components/PrivateRoute";
import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

import { theme } from "../theme/theme";

const LandingPage = Loadable(lazy(() => import("../view/LandingPage")));
const Home = Loadable(lazy(() => import("../view/Home")));
const Profile = Loadable(lazy(() => import("../view/Profile")));
const ForgotPassword = Loadable(lazy(() => import("../view/ForgotPassword")));
const Main = Loadable(lazy(() => import("../view/Main")));
const Detail = Loadable(lazy(() => import("../view/Detail")));
const Login = Loadable(
  lazy(() => import("../view/pages/authentication/Login"))
);
const Register = Loadable(
  lazy(() => import("../view/pages/authentication/Register"))
);

function App() {
  const pathname = useLocation().pathname || "";

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" component={LandingPage} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/main" component={Main} />
        <PrivateRoute path="/posts/:idPost" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ForgotPassword" component={ForgotPassword} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
