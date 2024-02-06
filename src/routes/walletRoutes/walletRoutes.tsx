import { lazy } from "react";
import Loadable from "../../utils/loadable";
import { Navigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";

const MainLayout = Loadable(lazy(() => import("../../layout/main")));
const DepositAndWithdrawBox = Loadable(
  lazy(() => import("../../components/walletSettings/DepositAndWithdrawBox"))
);

const WalletRoutes = {
  path: Constants.WalletSettingsPaths.root,
  element: <MainLayout />,
  children: [
    {
      path: Constants.WalletSettingsPaths.deposit,
      element: <DepositAndWithdrawBox />,
    },
    {
      path: Constants.WalletSettingsPaths.withdraw,
      element: <DepositAndWithdrawBox />,
    },
    {
      path: Constants.WalletSettingsPaths.creditReference,
      element: <DepositAndWithdrawBox />,
    },
    {
      path: "*",
      element: <Navigate to={"/wallet/list_of_clients"} replace />,
    },
  ],
};
export default WalletRoutes;
