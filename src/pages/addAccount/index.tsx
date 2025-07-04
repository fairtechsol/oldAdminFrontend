import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { useFormik } from "formik";
import _, { debounce } from "lodash";
import { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlash } from "../../assets";
import CustomErrorMessage from "../../components/Common/CustomErrorMessage";
import CustomModal from "../../components/Common/CustomModal";
import SelectField from "../../components/Common/DropDown/SelectField";
import Loader from "../../components/Loader";
import Input from "../../components/login/Input";
import { formatToINR, setTypeForAccountType } from "../../helper";
import {
  addReset,
  addUser,
  getAlreadyUserExist,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { Constants } from "../../utils/Constants";
import { addUserValidation } from "../../utils/Validations";

const MatchCommissionTypes = [
  { value: "0.00", label: "0.00" },
  { value: "totalLoss", label: "Total Loss" },
  { value: "entryWise", label: "Entry Wise" },
];

const AddAccount = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [submitLoading, setSubmitLoading] = useState(false);
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const formDataSchema: any = {
    userName: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    city: "",
    phoneNumber: "",
    domain: "",
    roleName: {
      label: "Select Account Type",
      value: "",
    },
    creditRefrence: 0,
    uplinePartnership: 0,
    myPartnership: 0,
    downlinePartnership: 0,
    matchCommissionType: {
      label: "0.00",
      value: "",
    },
    matchCommission: {
      label: "0.00",
      value: "",
    },
    sessionCommission: {
      label: "0.00",
      value: "",
    },
    remarks: "",
    adminTransPassword: "",
  };

  const [AccountTypes, setAccountTypes] = useState<any>([]);
  const [down, setDown] = useState<number>(100);

  const { loading, addSuccess, error } = useSelector(
    (state: RootState) => state.user.userUpdate
  );
  const { userAlreadyExist } = useSelector(
    (state: RootState) => state.user.userList
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

  const checkHandleChange = (event: any) => {
    let value = 0;
    if (event.target.value != "") {
      value = parseFloat(event.target.value.replace(/[^\w\s]/gi, ""));
    }

    formik.setFieldValue("creditRefrence", value);
  };

  const formik = useFormik({
    initialValues: formDataSchema,
    validationSchema: addUserValidation(userAlreadyExist),
    onSubmit: (values: any) => {
      if (values.creditRefrence < 0) {
        toast.error("Credit Reference too low");
        return;
      } else if (values.creditRefrence > 999999999) {
        toast.error("Credit Reference Limit Exceed", {
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return;
      }
      try {
        let payload = {
          userName: values.userName,
          fullName: values.fullName,
          password: values.password,
          confirmPassword: values.confirmPassword,
          phoneNumber: values.phoneNumber
            ? JSON.stringify(values.phoneNumber)
            : "",
          city: values.city,
          roleName: values.roleName.value,
          creditRefrence: values.creditRefrence,
          myPartnership: values.myPartnership,
          sessionCommission:
            values.sessionCommission.value === "" ||
            values.sessionCommission.value === "0.00"
              ? 0
              : values.sessionCommission.value,
          matchComissionType:
            values.matchCommissionType.value === "" ||
            values.matchCommissionType.value === "0.00"
              ? null
              : values.matchCommissionType.value,
          matchCommission:
            values.matchCommission.value === "" ||
            values.matchCommission.value === "0.00"
              ? 0
              : values.matchCommission.value,
          transactionPassword: values?.adminTransPassword,
        };
        dispatch(addUser(payload));
      } catch (e) {
        console.log(e);
      }
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const handlePartnershipChange = (event: any) => {
    try {
      const newValue = parseInt(event.target.value, 10);
      const remainingDownline = +down - +newValue;
      if (remainingDownline < 0) {
        return;
      }

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

  const handleUpline = () => {
    try {
      const {
        aPartnership,
        saPartnership,
        smPartnership,
        faPartnership,
        fwPartnership,
        roleName,
      } = profileDetail ?? {};

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

      return partnershipMap[roleName] ?? 0;
    } catch (e) {
      console.error("Error calculating upline partnership:", e);
      return 0;
    }
  };

  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(getAlreadyUserExist(value));
    }, 500);
  }, []);

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    formik.handleChange(e);
    debouncedInputValue(query);
  };

  useEffect(() => {
    try {
      setTypeForAccountType(profileDetail, setAccountTypes);
      if (profileDetail && profileDetail.roleName) {
        const res = handleUpline();
        formik.setValues({
          ...formik.values,
          uplinePartnership: res,
          downlinePartnership: 100 - res,
        });
        setDown(100 - res);
      }
    } catch (e) {
      console.log(e);
    }
  }, [profileDetail]);

  useEffect(() => {
    try {
      if (addSuccess) {
        setShowModal(true);
        formik.resetForm();
        setSubmitLoading(false);
        dispatch(addReset());
      }
      if (error) {
        setSubmitLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [addSuccess, error]);

  useEffect(() => {
    if (formik.values.matchCommissionType.value) {
      formik.setValues({
        ...formik.values,
        matchCommission: {
          label: "0.00",
          value: "0.00",
        },
        sessionCommission: {
          label: "0.00",
          value: "0.00",
        },
      });
    }
  }, [formik.values.matchCommissionType.value]);

  useEffect(() => {
    if (formik.values.userName) {
      formik.validateForm();
    }
  }, [userAlreadyExist]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Loader text="" />
        </Box>
      ) : (
        <Box sx={{ margin: "1%" }}>
          <Typography
            sx={{
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
              marginLeft: "4px",
            }}
          >
            Add Account
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
                      }}
                      disabled={state?.id ? true : false}
                      placeholder="Username (Required)"
                      title="Username*"
                      name="userName"
                      type="text"
                      required={true}
                      value={formik.values.userName}
                      onChange={handleUserNameChange}
                      error={touched.userName && Boolean(errors.userName)}
                      onBlur={formik.handleBlur}
                    />
                    <CustomErrorMessage
                      touched={touched.userName}
                      errors={errors.userName}
                    />
                  </Box>
                  <Box
                    sx={{
                      pb: errors.password && touched.password ? 2 : 0,
                      position: "relative",
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
                      style={{
                        lineHeight: 1,
                        marginTop: 1,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      pb:
                        errors.confirmPassword && touched.confirmPassword
                          ? 2
                          : 0,
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
                      title="Confirm User Password*"
                      name="confirmPassword"
                      id="confirmPassword"
                      type="password"
                      placeholder="Ex : Abc@12"
                      required={true}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
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
                      placeholder="Full Name (optional)"
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { lg: "45px", xs: "36px" },
                      }}
                      disabled={state?.id ? true : false}
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
                      placeholder="City (optional)"
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { lg: "45px", xs: "36px" },
                      }}
                      disabled={state?.id ? true : false}
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
                    sx={{
                      pb: touched.phoneNumber && errors.phoneNumber ? 2 : 0,
                    }}
                  >
                    <Input
                      containerStyle={containerStyles}
                      titleStyle={titleStyles}
                      inputStyle={inputStyle}
                      placeholder="Mobile (optional)"
                      inputContainerStyle={{
                        ...inputContainerStyle,
                        height: { lg: "45px", xs: "36px" },
                      }}
                      disabled={state?.id ? true : false}
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
                      placeholder="Select"
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
                      value={formik?.values?.roleName}
                      touched={_.get(touched, "roleName.value")}
                      error={_.get(errors, "roleName.value")}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                  {formik?.values?.roleName?.value !== "expert" && (
                    <Box
                      sx={{
                        pb:
                          touched.creditRefrence && errors.creditRefrence
                            ? 2
                            : 0,
                      }}
                    >
                      <Input
                        containerStyle={containerStyles}
                        titleStyle={titleStyles}
                        inputStyle={inputStyle}
                        inputContainerStyle={{
                          ...inputContainerStyle,
                          height: { lg: "45px", xs: "36px" },
                        }}
                        disabled={state?.id ? true : false}
                        title="Credit Reference"
                        name="creditRefrence"
                        id="creditRefrence"
                        value={formatToINR(
                          parseFloat(formik.values.creditRefrence?.toString())
                        )}
                        error={
                          touched.creditRefrence &&
                          Boolean(errors.creditRefrence)
                        }
                        onBlur={formik.handleBlur}
                        onChange={(e: any) => checkHandleChange(e)}
                      />
                      <CustomErrorMessage
                        touched={touched.creditRefrence}
                        errors={errors.creditRefrence}
                      />
                    </Box>
                  )}
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
                    type={"text"}
                    disabled={true}
                    value={formik.values.uplinePartnership}
                    onChange={formik.handleChange}
                  />
                  <Input
                    inputContainerStyle={{
                      ...inputContainerStyle,
                      backgroundColor:
                        formik.values?.roleName?.value === "user" && "#DEDEDE",
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
                    type="number"
                    max={100}
                    value={formik.values.myPartnership}
                    error={
                      touched.myPartnership && Boolean(errors.myPartnership)
                    }
                    onBlur={formik.handleBlur}
                    onChange={handlePartnershipChange}
                  />
                  <CustomErrorMessage
                    touched={touched.myPartnership}
                    errors={errors.myPartnership}
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
                  min={0}
                  value={formik.values.downlinePartnership || 0}
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
                    value={formik.values.matchCommissionType}
                    error={
                      touched.creditRefrence && Boolean(errors.creditRefrence)
                    }
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
                </Box>
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
                  <>
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
                  </>
                </Box>
                <Button
                  className="cursor-pointer"
                  disabled={submitLoading}
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
      )}
      <ModalMUI
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomModal
          modalTitle="User Added sucessfully"
          setShowModal={setShowModal}
          buttonMessage="Ok"
          functionDispatch={() => {}}
          navigateTo={`${Constants.oldAdmin}list_of_clients`}
        />
      </ModalMUI>
    </>
  );
};

export default memo(AddAccount);
