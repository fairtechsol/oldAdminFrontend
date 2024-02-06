import { Box, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { EyeIcon, EyeSlash } from "../../../assets";
import StyledImage from "../../Common/StyledImages";
import BoxButton from "./BoxButton";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserList,
  getUsersProfile,
  setCreditRefference,
  userListSuccessReset,
} from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { depositAmountValidations } from "../../../utils/Validations";
import { ApiConstants } from "../../../utils/Constants";

const initialValues: any = {
  userId: "",
  amount: "",
  transactionPassword: "",
  transactionType: "",
  remark: "",
};

const SetCreditComponent = (props: any) => {
  const {
    isWallet,
    handleKeyDown,
    backgroundColor,
    setSelected,
    element,
    endpoint,
  } = props;
  const [showPass, setShowPass] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: depositAmountValidations,
    onSubmit: (values: any) => {
      let payload;
      if (isWallet) {
        payload = {
          amount: values.amount,
          transactionPassword: values.transactionPassword,
          // transactionType: values.transactionType,
          remark: values.remark,
        };
      } else {
        payload = {
          userId: element?.id,
          amount: values.amount,
          transactionPassword: values.transactionPassword,
          remark: values.remark,
        };
      }
      dispatch(
        setCreditRefference({
          url: isWallet
            ? ApiConstants.WALLET.CREDITREFERRENCE
            : endpoint,
          payload: payload,
        })
      );
    },
  });

  const { handleSubmit } = formik;

  const { loading, success } = useSelector(
    (state: RootState) => state.user.userList
  );

  useEffect(() => {
    if (success) {
      formik.resetForm();
      setSelected(false);
      if (isWallet) {
        dispatch(getUsersProfile());
      } else {
        dispatch(
          getUserList({
            currentPage: 1,
            url: { endpoint: ApiConstants.USER.LIST },
          })
        );
      }
      dispatch(userListSuccessReset());
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          paddingRight: "10px",
          flexDirection: { xs: "column", md: "row", lg: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: { xs: "column", md: "row", lg: "row" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                width: { xs: "100%", lg: "40%", md: "40%" },
                fontWeight: "600",
                marginRight: { xs: 0, lg: "20px", md: "20px" },
              }}
            >
              New Credit Limit
            </Typography>
            <Box
              sx={{
                background: "#004A25",
                width: { xs: "100%", lg: "60%", md: "60%" },
                height: "45px",
                borderRadius: "5px",
                paddingX: "20px",
              }}
            >
              <TextField
                required={true}
                name={"amount"}
                id={"amount"}
                value={formik.values.amount}
                onChange={formik.handleChange}
                onKeyDown={handleKeyDown}
                variant="standard"
                InputProps={{
                  placeholder: "Type Amount...",
                  autoFocus: true,
                  autoComplete: "new-password",
                  disableUnderline: true,
                  inputProps: { min: "0" },
                  style: {
                    fontSize: "15px",
                    height: "45px",
                    fontWeight: "600",
                    color: "white",
                  },
                }}
                type={"Number"}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              justifyContent: "flex-end",
              marginTop: "10px",
              flexDirection: { xs: "column", md: "row", lg: "row" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                width: { xs: "100%", lg: "40%", md: "40%" },
                fontWeight: "600",
                marginRight: { xs: 0, lg: "20px", md: "20px" },
              }}
            >
              Transaction Password
            </Typography>
            <Box
              sx={{
                width: { xs: "100%", lg: "60%", md: "60%" },
                height: "45px",
                background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                paddingX: "20px",
              }}
            >
              <TextField
                required={true}
                name={"transactionPassword"}
                id={"transactionPassword"}
                value={formik.values.transactionPassword}
                onChange={formik.handleChange}
                sx={{ width: "100%", height: "45px" }}
                variant="standard"
                InputProps={{
                  placeholder: "",
                  disableUnderline: true,
                  autoComplete: "new-password",
                  type: !showPass ? "password" : "text",
                  style: {
                    fontSize: "13px",
                    height: "45px",
                    fontWeight: "600",
                  },
                }}
              />
              <Box
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                <StyledImage
                  src={showPass ? EyeIcon : EyeSlash}
                  sx={{ height: "14px", width: "20px" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
          <Box
            sx={{
              flex: 1,
              background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              minHeight: "80px",
              maxHeight: "115px",
              paddingX: "10px",
            }}
          >
            <TextField
              rows={4}
              name="remark"
              id="remark"
              sx={{ width: "100%", minHeight: "40px" }}
              multiline={true}
              variant="standard"
              value={formik.values.remark}
              onChange={formik.handleChange}
              InputProps={{
                placeholder: "Remark (Optional)",
                disableUnderline: true,
                style: {
                  fontSize: "13px",
                  minHeight: "45px",
                  fontWeight: "600",
                },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "row",
              md: "column",
              lg: "column",
            },
            justifyContent: "center",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", width: "150px" }}>
            <BoxButton
              color={"#0B4F26"}
              loading={loading}
              containerStyle={{ width: "150px", height: "35px" }}
              isSelected={true}
              type="submit"
              title={"Submit"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "150px",
              marginTop: { xs: 0, md: "10px", lg: "10px" },
            }}
          >
            <BoxButton
              color={"#E32A2A"}
              containerStyle={{
                width: "150px",
                background: "#E32A2A",
                border: "0px",
                height: "35px",
              }}
              isSelected={true}
              onClick={() => {
                setSelected();
              }}
              title={"Cancel"}
            />
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default SetCreditComponent;
