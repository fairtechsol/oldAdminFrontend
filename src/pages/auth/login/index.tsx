import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { eye, eyeLock, mail } from "../../../assets";
import Input from "../../../components/login/Input";
import { authReset, login } from "../../../store/actions/auth/authAction";
import { AppDispatch, RootState } from "../../../store/store";
import { Constants } from "../../../utils/Constants";
import { loginValidationSchema } from "../../../utils/Validations";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    success,
    forceChangePassword,
    userRole,
    isTransPasswordCreated,
    loading,
    error,
  } = useSelector((state: RootState) => state.auth);

  const initialValues: any = {
    userName: "",
    password: "",
    loginType: "admin",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values: any) => {
      if (loading) {
        return;
      }
      dispatch(login(values));
    },
  });

  const { handleSubmit, touched, errors, setSubmitting } = formik;

  useEffect(() => {
    if (success) {
      sessionStorage.setItem("userRole", userRole);
      if (forceChangePassword) {
        sessionStorage.setItem(
          "forceChangePassword",
          JSON.stringify(forceChangePassword)
        );
        navigate(`${Constants.oldAdmin}change_password`);
      } else if (isTransPasswordCreated) {
        navigate(`${Constants.oldAdmin}list_of_clients`);
      }
      setSubmitting(false);
      dispatch(authReset());
    }
    if (error) {
      setSubmitting(false);
    }
  }, [success, error]);

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
          id="userName"
          placeholder="Enter Username"
          title="Username"
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
          id="password"
          title="Password"
          type="password"
          placeholder="Enter Password"
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
