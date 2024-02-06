import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StyledImage from "../../Common/StyledImages";
import BoxButton from "./BoxButton";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordRow,
  userListSuccessReset,
} from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { ApiConstants } from "../../../utils/Constants";
import { userChangePasswordValidations } from "../../../utils/Validations";

import {
  // EyeIcon,
  EyeIconWhite,
  // EyeSlash,
  EyeSlashWhite,
} from "../../../assets";
import CustomErrorMessage from "../../Common/CustomErrorMessage";

const initialValues: any = {
  userId: "",
  newPassword: "",
  transactionPassword: "",
};

const ChangePasswordComponent = (props: any) => {
  const { setSelected, element, walletAccountDetail, endpoint } = props;
  const [showPass, setShowPass] = useState(false);
  const [showPassTransaction, setShowPassTransaction] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userChangePasswordValidations,
    onSubmit: (values: any) => {
      let payload;
      if (walletAccountDetail) {
        payload = {
          newPassword: values.newPassword,
          transactionPassword: values.transactionPassword,
          // remark: values.remark,
        };
      }
      // else if (
      //   element.roleName === "superAdmin" ||
      //   element.roleName === "fairGameAdmin"
      // ) {
      //   payload = {
      //     userId: element?.id,
      //     newPassword: values.newPassword,
      //     transactionPassword: values.transactionPassword,
      //     // remark: values.remark,
      //   };
      // }
      else if (element.roleName === "expert") {
        payload = {
          id: element?.id,
          password: values.newPassword,
          transactionPassword: values.transactionPassword,
          // remark: values.remark,
        };
      } else {
        payload = {
          userId: element?.id,
          newPassword: values.newPassword,
          transactionPassword: values.transactionPassword,
          // remark: values.remark,
        };
      }
      dispatch(
        changePasswordRow({
          url: walletAccountDetail
            ? ApiConstants.WALLET.CHANGEPASSWORD
            : endpoint,
          payload: payload,
        })
      );
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const { loading, success } = useSelector(
    (state: RootState) => state.user.userList
  );

  useEffect(() => {
    if (success) {
      formik.resetForm();
      setSelected(false);
      dispatch(userListSuccessReset());
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          paddingX: "10px",
          flexDirection: { xs: "column", md: "row", lg: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ width: { lg: "100%", xs: "88vw" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: { xs: "flex-start", lg: "center" },
              flexDirection: { xs: "row", md: "row", lg: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                width: { xs: "60%", lg: "70%", md: "70%" },
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                  width: { xs: "100%", lg: "32.5%", md: "32.5%" },
                  fontWeight: "600",
                  marginRight: { xs: 0, lg: "20px", md: "20px" },
                }}
              >
                New Password
              </Typography>
              <Box
                sx={{
                  width: { xs: "100%", lg: "32.5", md: "60%" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", lg: "100%", md: "100%" },
                    height: "45px",
                    background: "#0B4F26",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "5px",
                    border: "2px solid #26262633",
                    paddingX: "20px",
                  }}
                >
                  <TextField
                    required={true}
                    id="newPassword"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    // helperText={touched.newPassword && errors.newPassword}
                    sx={{ width: "100%", height: "45px", color: "white" }}
                    variant="standard"
                    InputProps={{
                      placeholder: "",
                      autoFocus: true,
                      disableUnderline: true,
                      autoComplete: "new-password",
                      type: !showPass ? "password" : "text",
                      style: {
                        fontSize: "13px",
                        height: "45px",
                        fontWeight: "600",
                        color: "white",
                      },
                    }}
                  />

                  <Box
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                  >
                    <StyledImage
                      src={showPass ? EyeIconWhite : EyeSlashWhite}
                      sx={{ height: "14px", width: "20px", fill: "white" }}
                    />
                  </Box>
                </Box>
                <CustomErrorMessage
                  touched={touched.newPassword}
                  errors={errors.newPassword}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: { xs: "40%", lg: "250px" },
                marginTop: { xs: "18px", md: "0", lg: "0" },
              }}
            >
              <BoxButton
                color={"#E32A2A"}
                containerStyle={{
                  width: "100%",
                  background: "#E32A2A",
                  border: "0px",
                  height: "45px",
                  marginLeft: "10px",
                  maxWidth: {
                    xs: "91% !important",
                    lg: "100% !important",
                  },
                  flex: {
                    lg: "0 0 60%!important",
                    xs: "0 0 100%!important",
                  },
                }}
                isSelected={true}
                onClick={() => {
                  setSelected();
                }}
                title={"Cancel"}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: { xs: "flex-start", lg: "center" },
              flexDirection: { xs: "row", md: "row", lg: "row" },
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                width: { xs: "60%", lg: "70%", md: "70%" },
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                  width: { xs: "100%", lg: "32.5%", md: "32.5%" },
                  fontWeight: "600",
                  marginRight: { xs: 0, lg: "20px", md: "20px" },
                }}
              >
                Transaction Password
              </Typography>

              <Box
                sx={{
                  width: { xs: "100%", lg: "32.5", md: "60%" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", lg: "100%", md: "100%" },
                    height: "45px",
                    background: "#0B4F26",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "5px",
                    border: "2px solid #26262633",
                    paddingX: "20px",
                  }}
                >
                  <TextField
                    required={true}
                    id="transactionPassword"
                    name="transactionPassword"
                    value={formik.values.transactionPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    sx={{ width: "100%", height: "45px" }}
                    variant="standard"
                    InputProps={{
                      placeholder: "",
                      disableUnderline: true,
                      autoComplete: "new-password",
                      type: !showPassTransaction ? "password" : "text",
                      style: {
                        fontSize: "13px",
                        height: "45px",
                        fontWeight: "600",
                        color: "white",
                      },
                    }}
                  />
                  <Box
                    onClick={() => {
                      setShowPassTransaction(!showPassTransaction);
                    }}
                  >
                    <StyledImage
                      src={showPassTransaction ? EyeIconWhite : EyeSlashWhite}
                      sx={{ height: "14px", width: "20px" }}
                    />
                  </Box>
                </Box>
                <CustomErrorMessage
                  touched={touched.transactionPassword}
                  errors={errors.transactionPassword}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: { xs: "40%", lg: "250px" },
                marginTop: { xs: "18px", md: "0", lg: "0" },
              }}
            >
              <BoxButton
                color={"#0B4F26"}
                loading={loading}
                containerStyle={{
                  width: "100%",
                  height: "45px",
                  marginLeft: "10px",
                  maxWidth: {
                    xs: "91% !important",
                    lg: "100% !important",
                  },
                  flex: {
                    lg: "0 0 60%!important",
                    xs: "0 0 100%!important",
                  },
                }}
                isSelected={true}
                type="submit"
                title={"Submit"}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "none",
              flexDirection: { xs: "row", md: "row", lg: "row" },
              justifyContent: "flex-start",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", width: "150px" }}>
              <BoxButton
                containerStyle={{
                  width: "100%",
                  height: "35px",
                }}
                isSelected={true}
                color={"#0B4F26"}
                type="submit"
                title={"Submit"}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default ChangePasswordComponent;
