import React, { useState } from "react";

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
const ForgotPassword = Loadable(lazy(() => import("../view/ForgotPassword")));
const Main = Loadable(lazy(() => import("../view/Main")));
const Detail = Loadable(lazy(() => import("../view/Detail")));
const Create_Edit_Post = Loadable(
  lazy(() => import("../view/Create_Edit_Post"))
);
const Login = Loadable(
  lazy(() => import("../view/pages/authentication/Login"))
);
const Register = Loadable(
  lazy(() => import("../view/pages/authentication/Register"))
);
const Token = Loadable(lazy(() => import("../view/Token")));
const Admin = Loadable(lazy(() => import("../view/Admin")));

function App() {
  const pathname = useLocation().pathname || "";
  // const [ICOState, setICOState] = useState({
  //   contracts: {},
  //   tokenPrice: "1000000000000000",
  //   tokensSold: 0,
  //   tokensAvailable: 10000000,
  //   admin: "",
  //   currentAccount: "",
  //   currentBalance: 0,
  // });
  // console.log("aapp");
  // console.log(ICOState);
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/main" component={Main} />
        <PrivateRoute
          exact
          path="/profile"
          // propsP={{ ICOState: ICOState, setICOState: setICOState }}
          component={Profile}
        />
        {/* <Route
          path="/profile"
          render={() => (
            <Profile ICOState={ICOState} setICOState={setICOState} />
          )}
        /> */}
        <Route path="/profile/:idUser" component={ViewProfile} />
        <PrivateRoute path="/posts/new" component={Create_Edit_Post} />
        <Route path="/posts/:idPost" component={Detail} />
        <Route path="/login" component={Login} />
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
