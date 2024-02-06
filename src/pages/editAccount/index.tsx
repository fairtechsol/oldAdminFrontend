import {
  Box,
  Button,
  Grid,
  InputLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { EyeIcon, EyeSlash } from "../../assets";
import SelectField from "../../components/Common/DropDown/SelectField";
import Loader from "../../components/Loader";
import Input from "../../components/login/Input";
import {
  getUsersDetail,
  updateExpert,
  updateReset,
  updateUrlAdmin,
  updateUser,
  updateUserReset,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import CustomErrorMessage from "../../components/Common/CustomErrorMessage";
import CustomModal from "../../components/Common/CustomModal";
import ButtonWithSwitch from "../../components/addMatchComp/ButtonWithSwitch";
import { checkUserType } from "../../helper";

// const AccountTypes = [
//   { value: "fairGameAdmin", label: "Fairgame Admin", level: 1 },
//   { value: "superAdmin", label: "URL Super Admin", level: 2 },
//   { value: "superAdmin", label: "Super Admin", level: 3 },
//   { value: "admin", label: "Admin", level: 4 },
//   { value: "superMaster", label: "Super Master", level: 5 },
//   { value: "master", label: "Master", level: 6 },
//   { value: "user", label: "User", level: 8 },
// ];

const MatchCommissionTypes = [
  { value: "0.00", label: "0.00" },
  { value: "totalLoss", label: "Total Loss" },
  { value: "entryWise", label: "Entry Wise" },
];

const formDataSchema = {
  userName: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  city: "",
  phoneNumber: "",
  domain: "",
  roleName: {
    label: "",
    value: "",
  },
  creditRefrence: "",
  uplinePartnership: 0,
  myPartnership: 0,
  downlinePartnership: 0,
  matchCommissionType: {
    label: "",
    value: "",
  },
  matchCommission: {
    label: "",
    value: "",
  },
  sessionCommission: {
    label: "",
    value: "",
  },
  remarks: "",
  adminTransPassword: "",
  logo: "",
  base64Image: "",
  sidebarColor: "",
  headerColor: "",
  footerColor: "",
};

const defaultLockUnlockObj = {
  allPrivilege: false,
  addMatchPrivilege: false,
  betFairMatchPrivilege: false,
  bookmakerMatchPrivilege: false,
  sessionMatchPrivilege: false,
};

const EditAccount = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [lockUnlockObj, setLockUnlockObj] = useState(defaultLockUnlockObj);
  const [AccountTypes, setAccountTypes] = useState<any>([]);
  const [down, setDown] = useState<number>(100);
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { success, loading, userDetail, editSuccess } = useSelector(
    (state: RootState) => state.user.userUpdate
  );

  const containerStyles = {
    marginTop: { xs: "2px", lg: "10px" },
  };
  const titleStyles = {
    color: "#202020",
    fontSize: { xs: "10px", lg: "12px" },
    fontWeight: "600",
    marginLeft: "0px",
  };
  const inputStyle = {
    fontSize: { xs: "10px", lg: "14px", fontWeight: "600" },
  };
  const inputContainerStyle = {
    borderRadius: "5px",
    border: "1px solid #DEDEDE",
  };

  const formik = useFormik({
    initialValues: formDataSchema,
    //   validationSchema: addUserValidation,
    onSubmit: (values: any) => {
      const commonPayload = {
        id: state?.id,
        transactionPassword: values.adminTransPassword,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber.toString(),
        city: values.city,
        remark: values.remarks,
      };

      let payload;
      if (values.roleName.value === "expert") {
        payload = {
          ...commonPayload,
          allPrivilege: lockUnlockObj.allPrivilege,
          addMatchPrivilege: lockUnlockObj.addMatchPrivilege,
          betFairMatchPrivilege: lockUnlockObj.betFairMatchPrivilege,
          bookmakerMatchPrivilege: lockUnlockObj.bookmakerMatchPrivilege,
          sessionMatchPrivilege: lockUnlockObj.sessionMatchPrivilege,
        };
        dispatch(updateExpert(payload));
      } else if (values.roleName.value === "superAdmin") {
        payload = {
          ...commonPayload,
          logo: values.base64Image,
          isOldFairGame: false,
          sidebarColor: values.sidebarColor,
          headerColor: values.headerColor,
          footerColor: values.footerColor,
          transactionPassword: values.adminTransPassword,
        };
        dispatch(updateUrlAdmin(payload));
      } else {
        payload = {
          ...commonPayload,
          sessionCommission: values.sessionCommission.value,
          matchComissionType: values.matchCommissionType.value,
          matchCommission: values.matchCommission.value,
        };
        dispatch(updateUser(payload));
      }
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const handlePartnershipChange = (event: any) => {
    try {
      const newValue = parseInt(event.target.value, 10);
      const remainingDownline = +down - newValue;

      formik.setValues({
        ...formik.values,
        myPartnership: newValue,
        downlinePartnership: remainingDownline,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  let matchComissionArray = [];

  for (let i = 0.0; i <= 2.0; i += 0.25) {
    if (formik.values.matchCommissionType.label === "0.00") {
      matchComissionArray = [];
      break;
    } else if (formik.values.matchCommissionType.label === "Total Loss") {
      matchComissionArray.push({ label: i?.toFixed(2), value: i?.toFixed(2) });
    } else {
      if (i <= 1.5) {
        matchComissionArray.push({
          label: i?.toFixed(2),
          value: i?.toFixed(2),
        });
      } else break;
    }
  }

  const sessionComissionArray = [];
  for (let i = 0.0; i <= 3.5; i += 0.25) {
    sessionComissionArray.push({ label: i?.toFixed(2), value: i?.toFixed(2) });
  }

  const setTypeForAccountType = () => {
    try {
      const roleName = profileDetail?.roleName;

      const accountTypeMap: any = {
        fairGameWallet: [
          { value: "fairGameAdmin", label: "Fairgame Admin" },
          { value: "oldSuperAdmin", label: "Super Admin" },
          { value: "admin", label: "Admin" },
          { value: "superMaster", label: "Super Master" },
          { value: "master", label: "Master" },
          { value: "user", label: "User" },
        ],
        fairGameAdmin: [
          { value: "superAdmin", label: "URL Super Admin" },
          { value: "oldSuperAdmin", label: "Super Admin" },
          { value: "admin", label: "Admin" },
          { value: "superMaster", label: "Super Master" },
          { value: "master", label: "Master" },
          { value: "expert", label: "Expert" },
          { value: "user", label: "User" },
        ],
        superAdmin: [
          { value: "admin", label: "Admin" },
          { value: "superMaster", label: "Super Master" },
          { value: "master", label: "Master" },
          { value: "user", label: "User" },
        ],
        admin: [
          { value: "superMaster", label: "Super Master" },
          { value: "master", label: "Master" },
          { value: "user", label: "User" },
        ],
        superMaster: [
          { value: "master", label: "Master" },
          { value: "user", label: "User" },
        ],
        master: [{ value: "user", label: "User" }],
      };

      setAccountTypes(accountTypeMap[roleName] || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageChange = (event: any) => {
    try {
      const file = event.currentTarget.files[0];

      if (!file.type.includes("jpeg") && !file.type.includes("png")) {
        alert("File should be either JPEG or PNG");
        return;
      }

      if (file) {
        if (file.size > 1024 * 100 * 5) {
          alert("File should be smaller than 500/400");
          return;
        }
        console.warn(file.size);
        formik.setFieldValue("logo", file);

        // Convert the image to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          formik.setFieldValue("base64Image", reader.result);
        };
        reader.readAsDataURL(file);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTypeForAccountType();
  }, [profileDetail, state?.id]);

  useEffect(() => {
    try {
      if (state?.id && !state?.expertMatchDetail) {
        dispatch(getUsersDetail(state?.id));
      } else if (state?.id && state?.expertMatchDetail) {
        formik.setValues({
          ...formik.values,
          userName: state?.expertMatchDetail?.userName,
          fullName: state?.expertMatchDetail?.fullName,

          city: state?.expertMatchDetail?.city,
          phoneNumber: state?.expertMatchDetail?.phoneNumber,
          roleName: {
            label: "Expert",
            value: "expert",
          },
          remarks: "",
          adminTransPassword: "",
        });
        setLockUnlockObj((prev: any) => {
          return {
            ...prev,
            allPrivilege: state?.expertMatchDetail?.allPrivilege,
            addMatchPrivilege: state?.expertMatchDetail?.addMatchPrivilege,
            betFairMatchPrivilege:
              state?.expertMatchDetail?.betFairMatchPrivilege,
            bookmakerMatchPrivilege:
              state?.expertMatchDetail?.bookmakerMatchPrivilege,
            sessionMatchPrivilege:
              state?.expertMatchDetail?.sessionMatchPrivilege,
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [state?.id]);

  const handleUpline = (userDetail: any) => {
    try {
      const {
        aPartnership,
        saPartnership,
        smPartnership,
        faPartnership,
        fwPartnership,
      } = userDetail;
      const roleName = profileDetail?.roleName;

      const partnershipMap: any = {
        superMaster:
          aPartnership + saPartnership + faPartnership + fwPartnership,
        superAdmin: faPartnership + fwPartnership,
        master:
          smPartnership +
          aPartnership +
          saPartnership +
          faPartnership +
          fwPartnership,
        admin: saPartnership + faPartnership + fwPartnership,
        fairGameWallet: 0,
        fairGameAdmin: fwPartnership,
      };

      const thisUplinePertnerShip = partnershipMap[roleName] || 0;

      return thisUplinePertnerShip;
    } catch (e) {
      console.log(e);
    }
  };

  const handleMyPartnership = (userDetail: any) => {
    try {
      const {
        aPartnership,
        saPartnership,
        smPartnership,
        faPartnership,
        fwPartnership,
        mPartnership,
      } = userDetail;
      const roleName = profileDetail?.roleName;

      const partnershipMap: any = {
        superMaster: smPartnership,
        superAdmin: saPartnership,
        master: mPartnership,
        admin: aPartnership,
        fairGameWallet: fwPartnership,
        fairGameAdmin: faPartnership,
      };

      const thisUplinePertnerShip = partnershipMap[roleName] || 0;

      return thisUplinePertnerShip;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (success && profileDetail && !state?.expertMatchDetail && userDetail) {
        const res = handleUpline(userDetail);
        const my = handleMyPartnership(userDetail);
        setDown(100 - res - my);
        formik.setValues({
          ...formik.values,
          userName: userDetail?.userName,
          fullName: userDetail?.fullName,
          city: userDetail?.city,
          phoneNumber: userDetail?.phoneNumber,
          roleName: {
            label:
              userDetail?.roleName === "superAdmin"
                ? userDetail?.isUrl
                  ? "URL Super Admin"
                  : "Super Admin"
                : userDetail?.roleName,
            value:
              userDetail?.roleName === "superAdmin"
                ? userDetail?.isUrl
                  ? "superAdmin"
                  : "oldSuperAdmin"
                : userDetail?.roleName,
          },
          creditRefrence: userDetail?.creditRefrence,
          uplinePartnership: res,
          myPartnership: my,
          domain: userDetail?.domainData?.domain,
          sidebarColor: userDetail?.domainData?.sidebarColor,
          headerColor: userDetail?.domainData?.headerColor,
          footerColor: userDetail?.domainData?.footerColor,
          base64Image: userDetail?.domainData?.logo,
          downlinePartnership: 100 - res - my,
          matchCommissionType: {
            label: userDetail?.matchComissionType,
            value: userDetail?.matchComissionType,
          },
          matchCommission: {
            label: userDetail?.matchCommission,
            value: userDetail?.matchCommission,
          },
          sessionCommission: {
            label: userDetail?.sessionCommission,
            value: userDetail?.sessionCommission,
          },
          remarks: "",
          adminTransPassword: "",
        });
        setLockUnlockObj({
          allPrivilege: userDetail?.allPrivilege,
          addMatchPrivilege: userDetail?.addMatchPrivilege,
          betFairMatchPrivilege: userDetail?.betFairMatchPrivilege,
          bookmakerMatchPrivilege: userDetail?.bookmakerMatchPrivilege,
          sessionMatchPrivilege: userDetail?.sessionMatchPrivilege,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail, userDetail]);

  useEffect(() => {
    try {
      if (editSuccess) {
        setShowModal(true);
        formik.resetForm();
        setLockUnlockObj(defaultLockUnlockObj);
        dispatch(updateReset());
        dispatch(updateUserReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [editSuccess]);
  


  return (
    <>
      {loading && <Loader />}
      <Box sx={{ margin: "1%" }}>
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            marginLeft: "4px",
          }}
        >
          Edit Account
        </Typography>
        <form style={{ marginTop: "1%" }} onSubmit={handleSubmit}>
          <Box
            sx={{
              background: "#F8C851",
              minHeight: "60vh",
              borderRadius: "5px",
              padding: "16px",
              paddingTop: "3px",
              marginTop: "2px",
              display: "flex",
              flexDirection: { xs: "column", lg: "row", md: "row" },
              width: "100%",
              gap: { xs: 0, lg: 5, md: 4 },
            }}
          >
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  gridTemplateColumns: "auto auto",
                  gridColumnGap: "10px",
                }}
              >
                <Box sx={{ pb: errors.userName && touched.userName ? 2 : 0 }}>
                  <Input
                    id={"userName"}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    disabled={state?.id ? true : false}
                    placeholder={"Username (Required)"}
                    title={"Username*"}
                    name={"userName"}
                    type={"text"}
                    required={true}
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={touched.userName && Boolean(errors.userName)}
                    onBlur={formik.handleBlur}
                  />
                  <CustomErrorMessage
                    touched={touched.userName}
                    errors={errors.userName}
                  />
                </Box>
                {/* {touched.userName && errors.userName && (
                    <p style={{ color: "#fa1e1e" }}>
                      {errors.userName as string}
                    </p>
                  )} */}
                <Box sx={{ pb: errors.password && touched.password ? 2 : 0 }}>
                  <Input
                    containerStyle={containerStyles}
                    img={EyeIcon}
                    img1={EyeSlash}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    disabled={state?.id ? true : false}
                    title={"User Password*"}
                    name={"password"}
                    id={"password"}
                    type={"password"}
                    placeholder={"Ex : Abc@12"}
                    required={true}
                    value={formik.values.password}
                    error={touched.password && Boolean(errors.password)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />{" "}
                  <CustomErrorMessage
                    touched={touched.password}
                    errors={errors.password}
                  />
                </Box>

                <Box
                  sx={{
                    pb:
                      errors.confirmPassword && touched.confirmPassword ? 2 : 0,
                  }}
                >
                  <Input
                    containerStyle={containerStyles}
                    img={EyeIcon}
                    img1={EyeSlash}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    disabled={state?.id ? true : false}
                    title={"Confirm User Password*"}
                    name={"confirmPassword"}
                    id={"confirmPassword"}
                    type={"password"}
                    placeholder={"Ex : Abc@12"}
                    required={true}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    onBlur={formik.handleBlur}
                  />
                  <CustomErrorMessage
                    touched={touched.confirmPassword}
                    errors={errors.confirmPassword}
                  />
                </Box>
                <Box sx={{ pb: touched.fullName && errors.fullName ? 2 : 0 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"Full Name"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    // disabled={state?.id ? true : false}
                    title={"Full Name"}
                    name={"fullName"}
                    id="fullName"
                    type={"text"}
                    value={formik.values.fullName}
                    error={touched.fullName && Boolean(errors.fullName)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage
                    touched={touched.fullName}
                    errors={errors.fullName}
                  />
                </Box>
                <Box sx={{ pb: touched.city && errors.city ? 2 : 0 }}>
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"City"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    // disabled={state?.id ? true : false}
                    title={"City"}
                    name={"city"}
                    id="city"
                    type={"text"}
                    value={formik.values.city}
                    error={touched.city && Boolean(errors.city)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage
                    touched={touched.city}
                    errors={errors.city}
                  />
                </Box>
                <Box
                  sx={{ pb: touched.phoneNumber && errors.phoneNumber ? 2 : 0 }}
                >
                  <Input
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    placeholder={"Mobile"}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    // disabled={state?.id ? true : false}
                    title={"Mobile Number"}
                    name={"phoneNumber"}
                    id="phoneNumber"
                    type={"number"}
                    value={formik.values.phoneNumber}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage
                    touched={touched.phoneNumber}
                    errors={errors.phoneNumber}
                  />
                </Box>
                {formik?.values?.roleName?.value === "superAdmin" &&
                  userDetail?.isUrl && (
                    <div>
                      <Input
                        containerStyle={containerStyles}
                        titleStyle={titleStyles}
                        inputStyle={inputStyle}
                        placeholder={"Domain"}
                        inputContainerStyle={{
                          ...inputContainerStyle,
                          height: { lg: "45px", xs: "36px" },
                        }}
                        // disabled={state?.id ? true : false}
                        title={"Domain"}
                        name={"domain"}
                        type={"text"}
                        id="domain"
                        value={formik.values.domain}
                        // error={touched.domain && Boolean(errors.domain)}
                        // onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      <CustomErrorMessage
                        touched={touched.domain}
                        errors={errors.domain}
                      />
                      <Input
                        containerStyle={containerStyles}
                        titleStyle={titleStyles}
                        inputStyle={inputStyle}
                        placeholder={"logo"}
                        inputContainerStyle={{
                          ...inputContainerStyle,
                          height: { lg: "45px", xs: "36px" },
                        }}
                        // disabled={state?.id ? true : false}
                        title={"Logo"}
                        name="logo"
                        type={"file"}
                        id="logo"
                        value={formik.values.logo}
                        onChange={handleImageChange}
                      />
                      {formik.values.base64Image && (
                        <div>
                          <p>Base64 Image:</p>
                          <img
                            src={formik.values.base64Image}
                            alt="Base64"
                            style={{ maxWidth: "100%" }}
                          />
                        </div>
                      )}
                      <Box m={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={12} lg={6}>
                            <InputLabel htmlFor="sidebarColor">
                              Sidebar Color:{" "}
                            </InputLabel>
                            <input
                              type="color"
                              id="sidebarColor"
                              name={"sidebarColor"}
                              value={formik.values.sidebarColor}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                          <Grid item xs={6} md={12} lg={6}>
                            <InputLabel htmlFor="headerColor">
                              Header Color:{" "}
                            </InputLabel>
                            <input
                              type="color"
                              id="headerColor"
                              name={"headerColor"}
                              value={formik.values.headerColor}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box m={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={12} lg={6}>
                            <InputLabel htmlFor="footerColor">
                              Footer Color:{" "}
                            </InputLabel>
                            <input
                              type="color"
                              id="footerColor"
                              name={"footerColor"}
                              value={formik.values.footerColor}
                              onChange={formik.handleChange}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  )}
              </Box>
            </Box>
            <Box sx={{ flex: 2 }}>
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "block" },
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Box sx={{ mt: -1 }}>
                  <SelectField
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    id="roleName"
                    name="roleName"
                    isSearchable={false}
                    label={"Account Type*"}
                    options={AccountTypes}
                    defaultValue={"Select..."}
                    onChange={(AccountTypes: any) => {
                      formik.setFieldValue("roleName", AccountTypes);
                    }}
                    isDisabled={state?.id}
                    // onBlur={formik.handleBlur}
                    value={AccountTypes.find(
                      (option: any) =>
                        option.value === formik.values.roleName.value
                    )}
                  // touched={touched.roleName}
                  // error={errors.roleName}
                  // error={touched.roleName && Boolean(errors.roleName)}
                  // onBlur={formik.handleBlur}
                  />
                  {/* <CustomErrorMessage touched={touched.roleName} errors={errors.roleName} /> */}
                </Box>
                {formik.values.roleName.value === "expert" && (
                  <>
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <ButtonWithSwitch
                            title="All Privilege"
                            name="allPrivilege"
                            showLockUnlock={false}
                            val={lockUnlockObj?.allPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                        <Grid item xs={6} md={12} lg={6}>
                          <ButtonWithSwitch
                            title="Add Match Privilege"
                            name="addMatchPrivilege"
                            val={lockUnlockObj?.addMatchPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <ButtonWithSwitch
                            title="BetFair Match Privilege"
                            name="betFairMatchPrivilege"
                            showLockUnlock={false}
                            val={lockUnlockObj?.betFairMatchPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                        <Grid item xs={6} md={12} lg={6}>
                          <ButtonWithSwitch
                            title="Bookmaker Match Privilege"
                            name="bookmakerMatchPrivilege"
                            val={lockUnlockObj?.bookmakerMatchPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box m={2}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={12} lg={6}>
                          <ButtonWithSwitch
                            title="Session Match Privilege"
                            name="sessionMatchPrivilege"
                            showLockUnlock={false}
                            val={lockUnlockObj?.sessionMatchPrivilege}
                            setLockUnlockObj={setLockUnlockObj}
                            lockUnlockObj={lockUnlockObj}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                )}
                {formik?.values?.roleName?.value !== "expert" && (
                  <Box>
                    <Input
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      inputStyle={inputStyle}
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { lg: "45px", xs: "36px" },
                      }}
                      disabled={state?.id ? true : false}
                      title={"Credit Reference*"}
                      name={"creditRefrence"}
                      type={"Number"}
                      id="creditRefrence"
                      value={formik.values.creditRefrence}
                      // error={touched.creditRefrence && Boolean(errors.creditRefrence)}
                      // onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {/* <CustomErrorMessage touched={touched.creditRefrence} errors={errors.creditRefrence} /> */}
                  </Box>
                )}
              </Box>
              {formik.values.roleName.value !== "expert" && (
                <>
                  <Box
                    sx={{
                      display: { lg: "block", md: "grid", xs: "grid" },
                      gridTemplateColumns: "50% 47%",
                      gridColumnGap: "10px",
                    }}
                  >
                    <Input
                      containerStyle={{
                        ...containerStyles,
                        display:
                          formik.values?.roleName?.value === "user"
                            ? "none"
                            : "block",
                      }}
                      titleStyle={titleStyles}
                      inputStyle={inputStyle}
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        backgroundColor: "#DEDEDE",
                        height: { lg: "45px", xs: "36px" },
                      }}
                      title={"Upline Partnership"}
                      name={"uplinePartnership"}
                      id={"uplinePartnership"}
                      type={"text"}
                      disabled={true}
                      value={formik.values.uplinePartnership}
                      onChange={formik.handleChange}
                    />
                    <Input
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        backgroundColor:
                          formik.values?.roleName?.value === "user" &&
                          "#DEDEDE",
                        height: { lg: "45px", xs: "36px" },
                      }}
                      containerStyle={{
                        ...containerStyles,
                        display:
                          formik.values?.roleName?.value === "user"
                            ? "none"
                            : "block",
                      }}
                      disabled={state?.id ? true : false}
                      titleStyle={titleStyles}
                      inputStyle={inputStyle}
                      title={"My Partnership"}
                      name={"myPartnership"}
                      id={"myPartnership"}
                      type={"Number"}
                      value={formik.values.myPartnership}
                      // error={touched.myPartnership && Boolean(errors.myPartnership)}
                      // error={
                      //   touched.myPartnership && Boolean(errors.myPartnership)
                      // }
                      // onBlur={formik.handleBlur}
                      onChange={handlePartnershipChange}
                    />
                    {/* <CustomErrorMessage
                        touched={touched.myPartnership}
                        errors={errors.myPartnership}
                      /> */}
                  </Box>
                  <Input
                    containerStyle={{
                      ...containerStyles,
                      display:
                        formik.values?.roleName?.value === "user"
                          ? "none"
                          : "block",
                    }}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    disabled={true}
                    inputContainerStyle={{
                      backgroundColor: "#DEDEDE",
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title={"Downline partnership"}
                    name={"downlinePartnership"}
                    id={"downlinePartnership"}
                    type={"Number"}
                    value={formik.values.downlinePartnership}
                  // onChange={formik.handleChange}
                  />
                </>
              )}

              {formik?.values?.roleName?.value !== "expert" && (
                <>
                  <Box
                    sx={{
                      display: {
                        lg: "block",
                        md: "grid",
                        xs: "grid",
                      },
                      gridTemplateColumns: "50% 47%",
                      gridColumnGap: "10px",
                    }}
                  >
                    <SelectField
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      id="matchCommissionType"
                      name="matchCommissionType"
                      label={"Match Commission Type"}
                      options={MatchCommissionTypes}
                      onChange={(MatchCommissionTypes: any) => {
                        formik.setFieldValue(
                          "matchCommissionType",
                          MatchCommissionTypes
                        );
                      }}
                      onBlur={formik.handleBlur}
                      value={MatchCommissionTypes.find(
                        (option: any) =>
                          option.value ===
                          formik.values.matchCommissionType.value
                      )}
                      // touched={touched.matchCommissionType}
                      // error={errors.matchCommissionType}
                    />
                    {!["", null, "0.00"].includes(
                      formik.values.matchCommissionType.value
                    ) && (
                      <>
                        <SelectField
                          containerStyle={containerStyles}
                          titleStyle={titleStyles}
                          id={"matchCommission"}
                          name={"matchCommission"}
                          label={"Match Commission (%)*"}
                          options={matchComissionArray}
                          value={formik.values.matchCommission}
                          onChange={(matchComissionArray: any) => {
                            formik.setFieldValue(
                              "matchCommission",
                              matchComissionArray
                            );
                          }}
                          onBlur={formik.handleBlur}
                          // touched={touched.matchCommission}
                          // error={errors.matchCommission}
                        />
                      </>
                    )}

                    <SelectField
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      id={"sessionCommission"}
                      name={"sessionCommission"}
                      label={"Session Commission (%)*"}
                      options={sessionComissionArray}
                      value={formik.values.sessionCommission}
                      onChange={(sessionComissionArray: any) => {
                        formik.setFieldValue(
                          "sessionCommission",
                          sessionComissionArray
                        );
                      }}
                      onBlur={formik.handleBlur}
                      // touched={touched.sessionCommission}
                      // error={errors.sessionCommission}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box sx={{ flex: 2 }} className="addAccountRemark">
              <Box
                sx={{
                  display: { lg: "block", md: "grid", xs: "grid" },
                  gridTemplateColumns: "50% 47%",
                  gridColumnGap: "10px",
                }}
              >
                <Input
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  inputProps={{
                    multiline: true,
                    rows: matches ? 2 : 10,
                  }}
                  placeholder={"Remark (Optional)"}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "205px", xs: "70px" },
                    width: "100%",
                  }}
                  title={"Remark"}
                  name={"remarks"}
                  id={"remarks"}
                  type={"text"}
                  value={formik.values.remarks}
                  onChange={formik.handleChange}
                />
                <div>
                  <Input
                    containerStyle={{ ...containerStyles, width: "100%" }}
                    img={EyeIcon}
                    img1={EyeSlash}
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    inputContainerStyle={{ ...inputContainerStyle }}
                    title={"Admin Transaction Password*"}
                    name={"adminTransPassword"}
                    id={"adminTransPassword"}
                    type={"password"}
                    placeholder={"Ex : 12345"}
                    required={true}
                    value={formik.values.adminTransPassword}
                    error={
                      touched.adminTransPassword &&
                      Boolean(errors.adminTransPassword)
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <CustomErrorMessage
                    touched={touched.adminTransPassword}
                    errors={errors.adminTransPassword}
                  />
                </div>
              </Box>
              <Button
                className="cursor-pointer"
                sx={{
                  background: "#0B4F26",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  border: "2px solid black",
                  alignItems: "center",
                  borderRadius: "5px",
                  height: "45px",
                  marginTop: { xs: "12px", lg: "35px" },
                  color: "white",
                  fontSize: "18px",

                  "&:hover": {
                    background: "#0B4F26",
                  },
                }}
                type="submit"
              >
                {state?.id ? "Update" : "Create"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      {showModal && (
        <CustomModal
          modalTitle={`User edited successfully`}
          setShowModal={setShowModal}
          showModal={showModal}
          buttonMessage={"Ok"}
          functionDispatch={() => {}}
          navigateTo={`/${checkUserType()}/list_of_clients`}
        />
      )}
    </>
  );
};

export default EditAccount;
