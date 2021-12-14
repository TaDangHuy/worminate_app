import { lazy } from "react";

import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";

const Main = Loadable(lazy(() => import("../view/Main")));
const Detail = Loadable(lazy(() => import("../view/Detail")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/main",
      element: <Main />,
    },
    {
      path: "/detail",
      element: <Detail />,
    },
  ],
};

export default MainRoutes;
