import { Button, Box, useTheme, CircularProgress } from "@mui/material";
import { mail, eye, eyeLock } from "../../../assets";
import { useEffect } from "react";
import Input from "../../../components/login/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { authReset, login } from "../../../store/actions/auth/authAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../../utils/Validations";
import { checkUserType } from "../../../helper";

const Login = () => {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const initialValues: any = {
    userName: "",
    password: "",
    loginType: location.pathname.includes("wallet") ? "wallet" : "admin",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values: any) => {
      dispatch(login(values));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const {
    success,
    forceChangePassword,
    userRole,
    isTransPasswordCreated,
    loading,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (success) {
      sessionStorage.setItem("userRole", userRole);
      if (forceChangePassword) {
        sessionStorage.setItem(
          "forceChangePassword",
          JSON.stringify(forceChangePassword)
        );
        navigate(`/${checkUserType()}/change_password`);
      } else if (isTransPasswordCreated) {
        navigate(`/${checkUserType()}/list_of_clients`);
      }
      dispatch(authReset());
    }
  }, [success]);

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "90%",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", opacity: 1 }}>
        <Input
          id={"userName"}
          placeholder={"Enter Username"}
          title={"Username"}
          type="text"
          name="userName"
          img={mail}
          img1={mail}
          onChange={formik.handleChange}
          value={formik.values.userName}
        />
        {touched.userName && errors.userName && (
          <p style={{ color: "#fa1e1e" }}>{errors.userName as string}</p>
        )}
        <Input
          id={"password"}
          title={"Password"}
          type="password"
          placeholder={"Enter Password"}
          containerStyle={{ marginTop: "10px" }}
          img={eye}
          img1={eyeLock}
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {touched.password && errors.password && (
          <p style={{ color: "#fa1e1e" }}>{errors.password as string}</p>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: "1vh",
          marginTop: "4vh",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            width: "62%",
            cursor: "pointer",
            height: { xs: "50px", lg: "43px" },
            borderRadius: "10px",
            fontWeight: "500",
            textTransform: "none",
            fontSize: { lg: "14px", xs: "14px" },
            background: `${theme.palette.secondary}`,
          }}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: "#FFF",
              }}
              size={20}
              thickness={4}
              value={60}
            />
          ) : (
            "Login"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default Login;
