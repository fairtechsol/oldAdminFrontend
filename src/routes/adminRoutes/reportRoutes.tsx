import { lazy } from "react";
import Loadable from "../../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";
import { AdminPrivateRoute } from "../../helper";

const MainLayout = Loadable(lazy(() => import("../../AdminLayout/main")));
const ProfitLossReport = Loadable(
  lazy(() => import("../../pages/reports/ProfitLoss"))
);
const AccountStatement = Loadable(
  lazy(() => import("../../pages/reports/AccountStatement"))
);
const CurrentBets = Loadable(
  lazy(() => import("../../pages/reports/CurrentBets"))
);
const GeneralReport = Loadable(
  lazy(() => import("../../pages/reports/GeneralReport"))
);

const ReportRoutes = {
  path: Constants.AdminReportsPaths.root,
  element: (
    // <AdminPrivateRoute>
    <MainLayout />
    // </AdminPrivateRoute>
  ),
  children: [
    {
      path: Constants.AdminReportsPaths.profitLoss,
      element: <ProfitLossReport />,
    },
    {
      path: Constants.AdminReportsPaths.accountStatement,
      element: <AccountStatement />,
    },
    {
      path: Constants.AdminReportsPaths.currentBet,
      element: <CurrentBets />,
    },
    {
      path: Constants.AdminReportsPaths.generalReport,
      element: <GeneralReport />,
    },
    {
      path: "*",
      element: <Navigate to={"/old/admin/list_of_clients"} replace />,
    },
  ],
};

export default ReportRoutes;
