import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { EyeIcon, EyeSlash } from "../../assets";
import CustomErrorMessage from "../../components/Common/CustomErrorMessage";
import CustomModal from "../../components/Common/CustomModal";
import SelectField from "../../components/Common/DropDown/SelectField";
import Loader from "../../components/Loader";
import Input from "../../components/login/Input";
import { formatToINR } from "../../helper";
import {
  getUsersDetail,
  updateReset,
  updateUser,
  updateUserReset,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { Constants } from "../../utils/Constants";

const MatchCommissionTypes = [
  { value: null, label: "0.00" },
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
};

const EditAccount = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
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
      console.log("values :", values)
      const commonPayload = {
        id: state?.id,
        transactionPassword: values.adminTransPassword,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber.toString(),
        city: values.city,
        remark: values.remarks,
        sessionCommission: values.sessionCommission.value == '0.00' ? 0 : values.sessionCommission.value,
        matchComissionType: values.matchCommissionType.value,
        matchCommission: values.matchCommission.value == '0.00' ? 0 : values.matchCommission.value,
      };
      console.log("commonPayload :", commonPayload)
      dispatch(updateUser(commonPayload));
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
      if (i <= 1) {
        matchComissionArray.push({
          label: i?.toFixed(2),
          value: i?.toFixed(2),
        });
      } else break;
    }
  }

  const sessionComissionArray = [];
  for (let i = 0.0; i <= 3; i += 0.25) {
    sessionComissionArray.push({ label: i?.toFixed(2), value: i?.toFixed(2) });
  }

  const setTypeForAccountType = () => {
    try {
      const roleName = profileDetail?.roleName;

      const accountTypeMap: any = {
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
        dispatch(updateReset());
        dispatch(updateUserReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [editSuccess]);

  useEffect(() => {
    if (formik.values.matchCommissionType.value || formik.values.matchCommissionType.value == null) {
      formik.setValues({
        ...formik.values,
        // matchCommission: {
        //   label: "0.00",
        //   value: "0.00",
        // },
        // sessionCommission: {
        //   label: "0.00",
        //   value: "0.00",
        // },

        matchCommission: {
          label: userDetail?.matchComissionType == formik.values.matchCommissionType.value ? userDetail?.matchCommission : "0.00",
          value: userDetail?.matchComissionType == formik.values.matchCommissionType.value ? userDetail?.matchCommission : "0.00",
        },
        sessionCommission: {
          label: userDetail?.matchComissionType == formik.values.matchCommissionType.value ? userDetail?.sessionCommission : "0.00",
          value: userDetail?.matchComissionType == formik.values.matchCommissionType.value ? userDetail?.sessionCommission : "0.00",
        },
      });
    }
  }, [formik.values.matchCommissionType.value]);

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
                    id="userName"
                    titleStyle={titleStyles}
                    inputStyle={inputStyle}
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                      backgroundColor: "#DEDEDE",
                    }}
                    disabled={state?.id ? true : false}
                    placeholder="Username (Required)"
                    title="Username*"
                    name="userName"
                    type="text"
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
                      backgroundColor: "#DEDEDE",
                    }}
                    disabled={state?.id ? true : false}
                    title="User Password*"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Ex : Abc@12"
                    required={true}
                    value={formik.values.password}
                    error={touched.password && Boolean(errors.password)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
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
                      backgroundColor: "#DEDEDE",
                    }}
                    disabled={state?.id ? true : false}
                    title="Confirm User Password*"
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Ex : Abc@12"
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
                    placeholder="Full Name"
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title="Full Name"
                    name="fullName"
                    id="fullName"
                    type="text"
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
                    placeholder="City"
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title="City"
                    name="city"
                    id="city"
                    type="text"
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
                    placeholder="Mobile"
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      height: { lg: "45px", xs: "36px" },
                    }}
                    title="Mobile Number"
                    name="phoneNumber"
                    id="phoneNumber"
                    type="number"
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
                <Box sx={{ mt: 1 }}>
                  <SelectField
                    containerStyle={containerStyles}
                    titleStyle={titleStyles}
                    id="roleName"
                    name="roleName"
                    isSearchable={false}
                    label="Account Type*"
                    options={AccountTypes}
                    defaultValue="Select..."
                    onChange={(AccountTypes: any) => {
                      formik.setFieldValue("roleName", AccountTypes);
                    }}
                    isDisabled={state?.id}
                    value={AccountTypes.find(
                      (option: any) =>
                        option.value === formik.values.roleName.value
                    )}
                  />
                </Box>
                <Input
                  containerStyle={containerStyles}
                  titleStyle={titleStyles}
                  inputStyle={inputStyle}
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "45px", xs: "36px" },
                    backgroundColor: "#DEDEDE",
                  }}
                  disabled={state?.id ? true : false}
                  title="Credit Reference*"
                  name="creditRefrence"
                  id="creditRefrence"
                  value={formatToINR(
                    parseFloat(formik.values.creditRefrence?.toString())
                  )}
                  onChange={formik.handleChange}
                />
              </Box>
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
                  title="Upline Partnership"
                  name="uplinePartnership"
                  id="uplinePartnership"
                  type="text"
                  disabled={true}
                  value={formik.values.uplinePartnership}
                  onChange={formik.handleChange}
                />
                <Input
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    backgroundColor: "#DEDEDE",
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
                  title="My Partnership"
                  name="myPartnership"
                  id="myPartnership"
                  type="Number"
                  value={formik.values.myPartnership}
                  onChange={handlePartnershipChange}
                />
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
                title="Downline Partnership"
                name="downlinePartnership"
                id="downlinePartnership"
                type="Number"
                value={formik.values.downlinePartnership}
              />
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
                  label="Match Commission Type"
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
                      option.value === formik.values.matchCommissionType.value
                  )}
                />
                {!["", null, "0.00"].includes(
                  formik.values.matchCommissionType.value
                ) && (
                    <SelectField
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      id="matchCommission"
                      name="matchCommission"
                      label="Match Commission (%)*"
                      options={matchComissionArray}
                      value={formik.values.matchCommission}
                      onChange={(matchComissionArray: any) => {
                        formik.setFieldValue(
                          "matchCommission",
                          matchComissionArray
                        );
                      }}
                      onBlur={formik.handleBlur}
                    />
                  )}
                <SelectField
                  containerStyle={containerStyles}
                  titleStyle={titleStyles}
                  id="sessionCommission"
                  name="sessionCommission"
                  label="Session Commission (%)*"
                  options={sessionComissionArray}
                  value={formik.values.sessionCommission}
                  onChange={(sessionComissionArray: any) => {
                    formik.setFieldValue(
                      "sessionCommission",
                      sessionComissionArray
                    );
                  }}
                  onBlur={formik.handleBlur}
                />
              </Box >
            </Box >
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
                  placeholder="Remark (Optional)"
                  inputContainerStyle={{
                    ...inputContainerStyle,
                    height: { lg: "205px", xs: "70px" },
                    width: "100%",
                  }}
                  title="Remark"
                  name="remarks"
                  id="remarks"
                  type="text"
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
                    title="Admin Transaction Password*"
                    name="adminTransPassword"
                    id="adminTransPassword"
                    type="password"
                    placeholder="Ex : 12345"
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
          </Box >
        </form >
      </Box >
      <ModalMUI
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomModal
          modalTitle="User edited successfully"
          setShowModal={setShowModal}
          buttonMessage="Ok"
          functionDispatch={() => { }}
          navigateTo={`${Constants.oldAdmin}list_of_clients`}
        />
      </ModalMUI>
    </>
  );
};

export default EditAccount;
