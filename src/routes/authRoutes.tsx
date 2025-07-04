// import Loadable from "../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

import AuthLayout from "../layout/auth";
import Login from "../pages/auth/login";
import ChangePassword from "../pages/changePassword";

// const Login = Loadable(() => import("../pages/auth/login"));
// const ChangePassword = Loadable(() => import("../pages/changePassword"));

const AuthRoutes = {
  path: Constants.AdminAuthPaths.root,
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={Constants.AdminAuthPaths.login} replace />,
    },
    {
      path: Constants.AdminAuthPaths.login,
      element: <Login />,
    },
    {
      path: Constants.AdminAuthPaths.changePassword,
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"old/admin/login"} replace />,
    },
  ],
};
export default AuthRoutes;
