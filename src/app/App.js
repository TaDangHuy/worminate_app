import React from "react";

// import { ThemeProvider } from "@mui/material/styles";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";

import { PrivateRoute } from "../components/PrivateRoute";
import { lazy } from "react";
import FileNotFound from "../view/FileNotFound";

import ThemeConfig from "../theme";
import ScrollToTop from "../components/ScrollToTop";
import Loadable from "../components/Loadable";

const LandingPage = Loadable(lazy(() => import("../view/LandingPage")));
const Home = Loadable(lazy(() => import("../view/Home")));
const Profile = Loadable(lazy(() => import("../view/Profile")));
const ViewProfile = Loadable(lazy(() => import("../view/ViewProfile")));
const Main = Loadable(lazy(() => import("../view/Main")));
const Detail = Loadable(lazy(() => import("../view/Detail")));
const Create_Edit_Post = Loadable(
  lazy(() => import("../view/Create_Edit_Post"))
);
const Login = Loadable(
  lazy(() => import("../view/pages/authentication/Login"))
);
const ForgotPassword = Loadable(
  lazy(() => import("../view/pages/authentication/ForgotPassword"))
);
const Register = Loadable(
  lazy(() => import("../view/pages/authentication/Register"))
);

const UpdatePassword = Loadable(
  lazy(() => import("../view/pages/authentication/UpdatePassword"))
);
const Token = Loadable(lazy(() => import("../view/Token")));
const Admin = Loadable(lazy(() => import("../view/Admin")));

function App() {
  const pathname = useLocation().pathname || "";

  return (
    <ThemeConfig>
      <ScrollToTop />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/main" component={Main} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route path="/profile/:idUser" component={ViewProfile} />
        <PrivateRoute path="/posts/new" component={Create_Edit_Post} />
        <Route path="/posts/:idPost" component={Detail} />
        <Route path="/login" component={Login} />
        <Route path="/update-password/:token" component={UpdatePassword} />
        <Route path="/register" component={Register} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/token" render={() => <Token />} />
        <Route path="/admin" component={Admin} />
        <Route path="*">
          <FileNotFound />
        </Route>
      </Switch>
    </ThemeConfig>
  );
}

export default App;
