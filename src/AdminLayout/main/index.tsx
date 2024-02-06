import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import {
  getUsersProfile,
  marqueeNotification,
} from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import { socketService } from "../../socketManager";
import Header from "../../layout/main/header";
import { AdminPrivateRoute } from "../../helper";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!sessionStorage.getItem("userToken")) {
      navigate("/old/admin/login");
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
      <AdminPrivateRoute>
        <Header />
        <BackgroundLayout>
          <Outlet />
        </BackgroundLayout>
      </AdminPrivateRoute>
    </>
  );
};

export default memo(MainLayout);
