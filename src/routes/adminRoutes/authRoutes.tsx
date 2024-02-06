import { lazy } from "react";
import Loadable from "../../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";

const AuthLayout = Loadable(lazy(() => import("../../AdminLayout/auth")));
const Login = Loadable(lazy(() => import("../../pages/auth/login")));
const ChangePassword = Loadable(
  lazy(() => import("../../pages/changePassword"))
);

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
