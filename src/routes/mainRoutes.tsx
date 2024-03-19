import Loadable from "../utils/loadable";
import MultipleMatch from "../pages/analysis/multipleMatch";
import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

import MainLayout from "../layout/main";

const ListOfClients = Loadable(() => import("../pages/listOfClients"));
const ChangePassword = Loadable(() => import("../pages/changePassword"));
const MyAccount = Loadable(() => import("../pages/myAccount"));
const Inplay = Loadable(() => import("../pages/inplay"));
const AddAccount = Loadable(() => import("../pages/addAccount"));
const EditAccount = Loadable(() => import("../pages/editAccount"));
const Analysis = Loadable(() => import("../pages/analysis"));
const Reports = Loadable(() => import("../pages/reports"));
const MatchDetail = Loadable(() => import("../pages/matchDetail"));
const WalletSettings = Loadable(() => import("../pages/walletSettings"));
const LockMatchScreen = Loadable(() => import("../pages/lockMatchDetail"));
const ProfitLossReport = Loadable(() => import("../pages/reports/ProfitLoss"));
const AccountStatement = Loadable(
  () => import("../pages/reports/AccountStatement")
);
const CurrentBets = Loadable(() => import("../pages/reports/CurrentBets"));
const GeneralReport = Loadable(() => import("../pages/reports/GeneralReport"));

const MainRoutes = {
  path: Constants.AdminMainPaths.root,
  element: <MainLayout />,
  children: [
    {
      path: Constants.AdminMainPaths.listOfClients,
      element: <ListOfClients />,
    },
    {
      path: Constants.AdminMainPaths.match,
      element: <LockMatchScreen />,
    },
    {
      path: Constants.AdminMainPaths.liveMarket,
      element: <Inplay />,
    },
    {
      path: Constants.AdminMainPaths.liveMarketMatches,
      element: <MatchDetail />,
    },
    {
      path: Constants.AdminMainPaths.addAccount,
      element: <AddAccount />,
    },
    {
      path: Constants.AdminMainPaths.editAccount,
      element: <EditAccount />,
    },
    {
      path: Constants.AdminMainPaths.marketAnalysis,
      element: <Analysis />,
    },
    {
      path: Constants.AdminMainPaths.marketAnalysisMatches,
      element: <MatchDetail />,
    },
    {
      path: Constants.AdminMainPaths.multipleMatch,
      element: <MultipleMatch />,
    },
    {
      path: Constants.AdminMainPaths.reports,
      element: <Reports />,
    },
    {
      path: Constants.AdminMainPaths.walletSettings,
      element: <WalletSettings />,
    },
    {
      path: Constants.AdminMainPaths.myAccount,
      element: <MyAccount />,
    },
    {
      path: Constants.AdminMainPaths.changePassword,
      element: <ChangePassword />,
    },
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
export default MainRoutes;
