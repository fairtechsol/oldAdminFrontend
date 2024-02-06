import AuthRoutes from "./authRoutes";
import MainRoutes from "./mainRoutes";
import ReportRoutes from "./reportRoutes";
import WalletRoutes from "./walletRoutes";

export default function walletRoute() {
  return [AuthRoutes, MainRoutes, ReportRoutes, WalletRoutes];
}
