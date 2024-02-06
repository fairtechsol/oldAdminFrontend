import { lazy } from "react";
import Loadable from "../../utils/loadable";
import MultipleMatch from "../../pages/analysis/multipleMatch";
import { Navigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";

const MainLayout = Loadable(lazy(() => import("../../AdminLayout/main")));
const ListOfClients = Loadable(lazy(() => import("../../pages/listOfClients")));
const ChangePassword = Loadable(
  lazy(() => import("../../pages/changePassword"))
);
const MyAccount = Loadable(lazy(() => import("../../pages/myAccount")));
const Inplay = Loadable(lazy(() => import("../../pages/inplay")));
const AddAccount = Loadable(lazy(() => import("../../pages/addAccount")));
const EditAccount = Loadable(lazy(() => import("../../pages/editAccount")));
const Analysis = Loadable(lazy(() => import("../../pages/analysis")));
const Reports = Loadable(lazy(() => import("../../pages/reports")));
const MatchDetail = Loadable(lazy(() => import("../../pages/matchDetail")));
const WalletSettings = Loadable(
  lazy(() => import("../../pages/walletSettings"))
);

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
      element: <MatchDetail />,
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
      path: "*",
      element: <Navigate to={"/old/admin/list_of_clients"} replace />,
    },
  ],
};
export default MainRoutes;
