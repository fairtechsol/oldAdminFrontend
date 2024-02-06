import { Navigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

export const formatNumber = (value?: any, isRound?: any) => {
  if (value >= 1000) {
    // return (value / 1000).toFixed(1) + "k";
    return isRound
      ? Math.round(value / 1000) + "k"
      : (value / 1000).toFixed(1) + "k";
  } else {
    return isRound ? Math.round(value) : value;
    // return value
  }
};

export const checkUserType = () => {
  return window.location.pathname.includes("wallet")
    ? Constants.wallet
    : Constants.oldAdmin;
};

export const WalletPrivateRoute = ({ children }: any) => {
  const userRole: any = sessionStorage.getItem("userRole");
  if (!["fairGameAdmin", "fairGameWallet"].includes(userRole)) {
    return <Navigate to="/old/admin" replace />;
  }
  return children;
};

export const AdminPrivateRoute = ({ children }: any) => {
  const userRole: any = sessionStorage.getItem("userRole");
  // Conditionally render the header
  if (!["master", "admin", "superAdmin", "superMaster"].includes(userRole)) {
    return <Navigate to="/wallet" replace />;
  }
  return children;
};
