import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import { socketService } from "../../socketManager";
import {
  getUsersProfile,
  marqueeNotification,
  updateBalanceOfLoggedUser,
} from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import { Constants } from "../../utils/Constants";
import Header from "./header";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const updateUserBalance = (event: any) => {
    dispatch(updateBalanceOfLoggedUser(event));
  };

  useEffect(() => {
    if (!sessionStorage.getItem("jwtAdmin")) {
      navigate(`${Constants.oldAdmin}login`);
      sessionStorage.clear();
    } else {
      dispatch(getUsersProfile());
      dispatch(marqueeNotification());
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("jwtAdmin")) {
        socketService.connect();
        socketService.auth.logout();
        socketService.match.updateUserBalance(updateUserBalance);
        return () => {
          socketService.disconnect();
        };
      }
    } catch (error) {
      console.error(error);
    }
  }, [sessionStorage.getItem("jwtAdmin")]);

  return (
    <>
      <Header />
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
    </>
  );
};

export default memo(MainLayout);
