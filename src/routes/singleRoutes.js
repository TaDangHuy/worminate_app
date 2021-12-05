import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

const Home = Loadable(lazy(() => import("../view/Home")));
const Profile = Loadable(lazy(() => import("../view/Profile")));
const ForgotPassword = Loadable(lazy(() => import("../view/ForgotPassword")));

const SingleRoutes = {
  HomeRoute: {
    path: "/",
    element: <Home />,
  },
  ProfileRoute: {
    path: "/profile",
    element: <Profile />,
  },
  ForgotPassRoute: {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
};

export default SingleRoutes;
