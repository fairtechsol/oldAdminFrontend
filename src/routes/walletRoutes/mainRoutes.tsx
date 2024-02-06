import { lazy } from "react";
import Loadable from "../../utils/loadable";
import MultipleMatch from "../../pages/analysis/multipleMatch";
import { Navigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";

const MainLayout = Loadable(lazy(() => import("../../layout/main")));
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
  path: Constants.MainPaths.root,
  element: <MainLayout />,
  children: [
    {
      index: true,
      path: Constants.MainPaths.listOfClients,
      element: <ListOfClients />,
    },
    {
      path: Constants.MainPaths.match,
      element: <MatchDetail />,
    },
    {
      path: Constants.MainPaths.liveMarket,
      element: <Inplay />,
    },
    {
      path: Constants.MainPaths.liveMarketMatches,
      element: <MatchDetail />,
    },
    {
      path: Constants.MainPaths.addAccount,
      element: <AddAccount />,
    },
    {
      path: Constants.MainPaths.editAccount,
      element: <EditAccount />,
    },
    {
      path: Constants.MainPaths.marketAnalysis,
      element: <Analysis />,
    },
    {
      path: Constants.MainPaths.marketAnalysisMatches,
      element: <MatchDetail />,
    },
    {
      path: Constants.MainPaths.multipleMatch,
      element: <MultipleMatch />,
    },
    {
      path: Constants.MainPaths.reports,
      element: <Reports />,
    },
    {
      path: Constants.MainPaths.walletSettings,
      element: <WalletSettings />,
    },
    {
      path: Constants.MainPaths.myAccount,
      element: <MyAccount />,
    },
    {
      path: Constants.MainPaths.changePassword,
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <Navigate to={"/wallet/list_of_clients"} replace />,
    },
  ],
};
export default MainRoutes;
