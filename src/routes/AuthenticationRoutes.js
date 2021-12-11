import { lazy } from "react";

import AuthenLayout from "../layout/AuthenLayout";
import Loadable from "../ui-component/Loadable";

const Login = Loadable(
  lazy(() => import("../view/pages/authentication/Login"))
);
const Register = Loadable(
  lazy(() => import("../view/pages/authentication/Register"))
);

const AuthenticationRoutes = {
  path: "/",
  element: <AuthenLayout />,
  children: [
    {
      path: "/pages/login",
      element: <Login />,
    },
    {
      path: "/pages/register",
      element: <Register />,
    },
  ],
};

export default AuthenticationRoutes;
