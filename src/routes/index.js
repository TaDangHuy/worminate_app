import { useRoutes } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRoutes";
import MainRoutes from "./MainRoutes";

// import config from "../config";

// routes
import singleRoutes from "./singleRoutes";

const { HomeRoute, ProfileRoute, ForgotPassRoute } = singleRoutes;

export default function Routes() {
  return useRoutes([
    HomeRoute,
    ProfileRoute,
    ForgotPassRoute,
    MainRoutes,
    AuthenticationRoutes,
  ]);
}
