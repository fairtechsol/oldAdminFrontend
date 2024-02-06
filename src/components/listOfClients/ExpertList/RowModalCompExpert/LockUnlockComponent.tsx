import { Box, TextField, Typography } from "@mui/material";
import { useState, useEffect, memo } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  getUserList,
  setLockUnlockUser,
  userListSuccessReset,
} from "../../../../store/actions/user/userAction";
import BoxButtonWithSwitch from "../../../Common/BoxButtonWithSwitch";
import StyledImage from "../../../Common/StyledImages";
import { EyeIcon, EyeSlash } from "../../../../assets";
import BoxButton from "../../RowModalComponents/BoxButton";
import { ApiConstants } from "../../../../utils/Constants";

const initialValues: any = {
  userBlock: false,
  transactionPassword: "",
};

const LockUnlockComponent = (props: any) => {
  const { setSelected, element, endpoint } = props;

  let elementLockUnlockObj1 = {
    all_blocked: element?.userBlock === true ? true : false,
    bet_blocked: element?.betBlock === true ? true : false,
  };

  const [lockUnlockObj, setLockUnlockObj] = useState(elementLockUnlockObj1);
  const [showPass, setShowPass] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      const id = element?.id;
      const payload = {
        userId: id,
        userBlock: lockUnlockObj.all_blocked,
        transactionPassword: values.transactionPassword,
      };
      dispatch(
        setLockUnlockUser({
          url: endpoint,
          payload: payload,
        })
      );
    },
  });

  const { handleSubmit } = formik;

  const { success, loading } = useSelector(
    (state: RootState) => state.user.userList
  );

  useEffect(() => {
    if (success) {
      formik.resetForm();
      setSelected(false);
      dispatch(
        getUserList({
          currentPage: 1,
          url: { endpoint: ApiConstants.USER.EXPERTLIST },
        })
      );
      dispatch(userListSuccessReset());
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          borderRadius: "5px",
          // paddingRight: { xs: "0", lg: "10px" },
          flexDirection: { xs: "column", md: "row", lg: "row" },
          gap: 2,
          // width: { xs: "92vw", md: "80%", lg: "80%" },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                md: "flex-start ",
                lg: "flex-start ",
              },
              height: "45px",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                width: { xs: "100%", lg: "35%", md: "35%" },
                fontWeight: "600",
                marginRight: { xs: 0, lg: "20px", md: "20px" },

                visibility: "hidden",
                display: { xs: "none", lg: "block" },
              }}
            >
              Dummy
            </Typography>
            <Box
              sx={{
                width: { xs: "100%", lg: "65%", md: "65%" },
                height: "45px",
                // background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                // border: "2px solid #26262633",
                // paddingX: "20px",
              }}
            >
              <Box sx={{ width: "48%", display: "flex", alignItems: "center" }}>
                <BoxButtonWithSwitch
                  title={"User"}
                  name={"all_blocked"}
                  val={lockUnlockObj?.all_blocked}
                  showLockUnlock={true}
                  setLockUnlockObj={setLockUnlockObj}
                  lockUnlockObj={lockUnlockObj}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              flexDirection: { xs: "column", md: "row", lg: "row" },
              justifyContent: "flex-start",
              marginTop: "10px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3vw", lg: "1vw", md: "1vw" },
                width: { xs: "100%", lg: "35%", md: "35%" },
                fontWeight: "600",
                marginRight: { xs: 0, lg: "20px", md: "20px" },
              }}
            >
              Transaction Password
            </Typography>
            <Box
              sx={{
                width: { xs: "100%", lg: "65%", md: "65%" },
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
                id="transactionPassword"
                name="transactionPassword"
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
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "row-reverse",
              md: "column-reverse",
              lg: "column-reverse",
            },
            justifyContent: {
              xs: "space-between",
              md: "center",
              lg: "center",
            },
            gap: 1,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: { xs: "48%", md: "150px", lg: "150px" },
            }}
          >
            <BoxButton
              color={"#0B4F26"}
              loading={loading}
              containerStyle={{
                maxWidth: "100%!important",
                height: "44px",
                flex: {
                  xs: "0 0 100%",
                  md: "0 0 100%",
                  lg: "0 0 100%",
                },
              }}
              isSelected={true}
              type="submit"
              title={"Submit"}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { xs: "48%", md: "150px", lg: "150px" },
              marginTop: { xs: 0, md: "0", lg: "0" },
            }}
          >
            <BoxButton
              color={"#E32A2A"}
              containerStyle={{
                maxWidth: "100%!important",
                height: "44px",
                background: "#E32A2A",
                border: "0px",
                flex: {
                  xs: "0 0 100%",
                  md: "0 0 100%",
                  lg: "0 0 100%",
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
      </Box>
    </form>
  );
};

export default memo(LockUnlockComponent);
