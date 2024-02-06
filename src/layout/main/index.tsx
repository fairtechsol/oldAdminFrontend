import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import {
  getUsersProfile,
  marqueeNotification,
} from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import Header from "./header";
import { socketService } from "../../socketManager";
import { WalletPrivateRoute } from "../../helper";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!sessionStorage.getItem("userToken")) {
      navigate("/wallet/login");
    }
    dispatch(getUsersProfile());
    dispatch(marqueeNotification());
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("userToken")) {
      socketService.connect();
      socketService.auth.logout();
    }
    return () => {
      socketService.disconnect();
    };
  }, [sessionStorage.getItem("userToken")]);

  return (
    <>
      <WalletPrivateRoute>
        <Header />
        <BackgroundLayout>
          <Outlet />
        </BackgroundLayout>
      </WalletPrivateRoute>
    </>
  );
};

export default memo(MainLayout);
