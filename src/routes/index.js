import { useRoutes } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRoutes";
import MainRoutes from "./MainRoutes";

// routes
import singleRoutes from "./singleRoutes";

const { LandingPageRoute, HomeRoute, ProfileRoute, ForgotPassRoute } =
  singleRoutes;

export default function Routes() {
  return useRoutes([
    LandingPageRoute,
    HomeRoute,
    ProfileRoute,
    ForgotPassRoute,
    MainRoutes,
    AuthenticationRoutes,
  ]);
}
