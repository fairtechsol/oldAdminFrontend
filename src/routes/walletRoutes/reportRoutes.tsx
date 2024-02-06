import { lazy } from "react";
import Loadable from "../../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";

const MainLayout = Loadable(lazy(() => import("../../layout/main")));
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
  path: Constants.ReportsPaths.root,
  element: <MainLayout />,
  children: [
    {
      path: Constants.ReportsPaths.profitLoss,
      element: <ProfitLossReport />,
    },
    {
      path: Constants.ReportsPaths.accountStatement,
      element: <AccountStatement />,
    },
    {
      path: Constants.ReportsPaths.currentBet,
      element: <CurrentBets />,
    },
    {
      path: Constants.ReportsPaths.generalReport,
      element: <GeneralReport />,
    },
    {
      path: "*",
      element: <Navigate to={"/wallet/list_of_clients"} replace />,
    },
  ],
};

export default ReportRoutes;
