import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ListHeader from "./ListHeader";
import ListBody from "./ListBody";
import DepositComponent from "../listOfClients/RowModalComponents/DepositComponent";
import WithdrawComponent from "../listOfClients/RowModalComponents/WithdrawComponent";
import SetCreditComponent from "../listOfClients/RowModalComponents/SetCreditComponent";
import LockUnlockComponent from "../listOfClients/RowModalComponents/LockUnlockComponent";
import BoxButton from "../listOfClients/RowModalComponents/BoxButton";
import SetExposureLimit from "../listOfClients/RowModalComponents/SetExposureLimit";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ListItems = (props: any) => {
  const { title } = props;
  const navigate = useNavigate();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const [isSliderVisible, setIsSliderVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmallOrMediumScreen =
        window.matchMedia("(max-width: 960px)").matches;
      setIsSliderVisible(isSmallOrMediumScreen);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [selected, setSelected] = useState<any>(null);
  const classes = {
    Menusx: {
      marginTop: { xs: "15px", lg: "30px", md: "18px" },
      marginLeft: { xs: "5px", lg: "0", md: "0" },
      paddingY: "0px",
      padding: "0px",
      width: { xs: "105%", lg: "100%", md: "100%" },
    },
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: {
      sx: {
        paddingY: "0px",
        padding: "0px",
        width: "100%",
        left: "1px !important",
        top: { lg: "191px !important", xs: "170px !important" },
        minHeight: "220px",
        background: "url(/static/media/back.00d2deda3616019e96ee.png)",
        boxShadow: "none",
      },
    },
    MenuItemsx: {
      width: "100%",
      fontSize: { lg: "16px", xs: "12px" },
      fontWeight: "600",
      marginX: "0px",
      borderBottomWidth: 0,
      borderColor: "#EAEFEC",
      marginTop: "0px",
      borderStyle: "solid",
      minHeight: { xs: "30px", lg: "40px" },
      lineHeight: "18px",
      color: "black",
      "&:hover": {
        backgroundColor: "#e5b744",
        border: 0,
      },
    },
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={classes.Menusx}>
          <Typography
            sx={[
              {
                fontSize: { lg: "18px", xs: "16px" },
                fontWeight: "600",
                padding: { lg: "10px 37px", xs: "10px 20px" },
                paddingBottom: "15px",
                color: "#fff",
                textTransform: "uppercase",
              },
            ]}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            marginLeft: { xs: "20px", lg: "37px" },
            marginRight: "20px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              overflowX: "auto",
              maxWidth: "100%",
              boxShadow: "inset 0 -3px 10px 0px #000000",
              position: "relative",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                background: isSliderVisible ? "#F8C851" : "transparent",
                marginLeft: "6px",
                padding: "10px",
                width: isSliderVisible ? "calc(100% + 400px)" : "100%",
              }}
            >
              <ListHeader userName={"User Name"} />
              <ListBody walletAccountDetail={profileDetail} />
            </Box>
          </div>
          {selected != null && (
            <Box
              sx={{
                width: {
                  xs: "auto",
                  md: "90%",
                  lg: "100%",
                  marginLeft: "12px",
                },
                padding: "5px",
                paddingTop: "1rem",
              }}
            >
              {selected == 0 && (
                <DepositComponent
                  isWallet={true}
                  walletAccountDetail={profileDetail}
                  selected={selected == 0}
                  setSelected={() => {
                    setSelected(null);
                  }}
                  navigate={navigate}
                  titleBackgroundColor="#27AC1E"
                />
              )}
              {selected == 1 && (
                <WithdrawComponent
                  isWallet={true}
                  walletAccountDetail={profileDetail}
                  selected={selected == 1}
                  setSelected={() => {
                    setSelected(null);
                  }}
                  titleBackgroundColor="#ff0000"
                />
              )}
              {selected == 2 && (
                <SetCreditComponent
                  isWallet={true}
                  walletAccountDetail={profileDetail}
                  selected={selected == 2}
                  setSelected={() => {
                    setSelected(null);
                  }}
                />
              )}
              {selected == 4 && (
                <LockUnlockComponent
                  isWallet={true}
                  selected={selected == 4}
                  setSelected={() => {
                    setSelected(null);
                  }}
                  walletAccountDetail={profileDetail}
                />
              )}
              {selected == 5 && (
                <SetExposureLimit
                  isWallet={true}
                  walletAccountDetail={profileDetail}
                  selected={selected == 5}
                  setSelected={() => {
                    setSelected(null);
                  }}
                />
              )}
            </Box>
          )}
          {selected === null && (
            <Box
              sx={{
                // flex: 1,
                display: "flex",
                flexDirection: {
                  xs: "row",
                  lg: "row",
                  md: "row",
                },
                gap: { xs: 0.5 },
                flexWrap: "wrap",
                justifyContent: "center",
                width: { xs: "78vw", lg: "100%", md: "100%" },
                padding: "0 15px 0 9px",
                marginLeft: "5px",
              }}
            >
              <BoxButton
                color={"#0B4F26"}
                onClick={() => {
                  setSelected(0);
                }}
                title={"Deposit"}
                isSelected={selected == 0}
                containerStyle={{
                  // marginLeft: { lg: "8px", xs: "0" },
                  flex: 1,
                  borderColor: "white",
                }}
                titleStyle={{
                  fontSize: { xs: "12px" },
                }}
                labelStyle={{}}
              />
              <BoxButton
                color={"#0B4F26"}
                onClick={() => {
                  setSelected(1);
                }}
                containerStyle={{
                  // marginLeft: { lg: "10px", xs: "0" },
                  flex: 1,
                  borderColor: "white",
                }}
                titleStyle={{
                  fontSize: { xs: "12px" },
                }}
                // isSelected={selected == 1}
                title={"Withdraw"}
                labelStyle={{}}
              />
              {/* <BoxButton
                color={"#0B4F26"}
                onClick={(e: any) => {
                  e?.preventDefault();
                  setSettlementUserModal(true);
                }}
                title={"C_Settlement"}
                containerStyle={{
                  // marginLeft: { lg: "10px", xs: "0" },
                  flex: 1,
                  borderColor: "white",
                }}
                titleStyle={{
                  fontSize: { xs: "12px" },
                }}
                labelStyle={{}}
              /> */}
              {/* <BoxButton
                  color={"#0B4F26"}
                  onClick={() => {
                    setSelected(3);
                  }}
                  title={"Change Password"}
                  isSelected={selected == 3}
                  containerStyle={{
                    marginLeft: { lg: "10px", xs: "0" },
                    flex: 1,
                    borderColor: "white",
                  }}
                  titleStyle={{
                    fontSize: { xs: "12px" },
                  }}
                /> */}
              <BoxButton
                color={"#0B4F26"}
                onClick={() => {
                  setSelected(4);
                }}
                title={"Lock/Unlock"}
                containerStyle={{
                  // marginLeft: { lg: "10px", xs: "0" },
                  flex: 1,
                  borderColor: "white",
                }}
                titleStyle={{
                  fontSize: { xs: "12px" },
                }}
                isSelected={selected == 4}
              />
              <BoxButton
                color={"#0B4F26"}
                onClick={() => {
                  setSelected(2);
                }}
                title={"set Credit Reference"}
                isSelected={selected == 2}
                labelStyle={{}}
                containerStyle={{
                  flex: 1,
                  borderColor: "white",
                }}
                titleStyle={{
                  fontSize: { xs: "12px" },
                }}
              />
              <BoxButton
                color={"#0B4F26"}
                onClick={() => {
                  setSelected(5);
                }}
                containerStyle={{
                  marginLeft: { lg: "10px", xs: "0" },
                  flex: 1,
                  borderColor: "white",
                }}
                titleStyle={{
                  fontSize: { xs: "12px" },
                }}
                title={"Set Exposure Limit"}
                labelStyle={{}}
                isSelected={selected == 5}
              />
              {/* <Dialog
                open={settlementUserModal}
                onClose={() => setSettlementUserModal((prev) => !prev)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure want to settle this commission ?"}
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => setSettlementUserModal((prev) => !prev)}
                  >
                    No
                  </Button>
                  <Button sx={{ color: "#E32A2A" }} onClick={() => {}}>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog> */}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ListItems;
