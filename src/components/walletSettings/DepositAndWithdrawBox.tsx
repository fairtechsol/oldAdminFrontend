import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../login/Input";
import { EyeIcon, EyeSlash } from "../../assets";
import DailogModal from "./DailogModal";
import WalletModal from "./WalletModal";

const DepositAndWithdrawBox = () => {
  const navigate = useNavigate();
  const [showModalMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleChangeShowModalSuccess = (val: any) => {
    setShowSuccessModal(val);
  };
  const CustomButton = ({ color, title, onClick, type }: any) => {
    return (
      <Button
        type={type}
        onClick={onClick}
        sx={{
          width: "45%",
          height: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: color,
          borderRadius: "5px",
          marginTop: "16px",
          "&:hover": {
            background: color,
          },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {title}
        </Typography>
      </Button>
    );
  };
  return (
    <>
      <Typography
        sx={{
          fontSize: "16px",
          color: "white",
          marginLeft: "0.5%",
          fontWeight: "600",
          paddingY: "0.5%",
          alignSelf: "start",
        }}
      >
        {window.location.pathname.split("/")[3] === "deposit"
          ? "Deposit to"
          : window.location.pathname.split("/")[3] === "withdraw"
          ? "Withdraw from"
          : "Edit Credit Reference of"}{" "}
        Wallet
      </Typography>
      <Box
        sx={{
          margin: "0.5%",
          padding: "10px",
          paddingBottom: "20px",
          width: { xs: "100%", lg: "50%", md: "100%" },
          justifyContent: "center",
          display: "flex",
          gap: 1,
          flexDirection: {
            xs: "column",
            md: "column",
            lg: "column",
          },
          background: "#F8C851",
          minHeight: "200px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: { xs: "row", md: "row", lg: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                border: "2px solid #FFFFFF4D",
                paddingLeft: "5px",
                height: "35px",
                background: "#262626",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "12px", fontWeight: "500" }}
              >
                Main Balance
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                background: "#0B4F26",
                marginTop: "2px",
                display: "flex",
                paddingLeft: "5px",
                flexDirection: "column",
                justifyContent: "center",
                border: "2px solid #FFFFFF4D",
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "12px", fontWeight: "400" }}
              >
                Previous Balance
              </Typography>
              <Typography sx={{ color: "white", fontWeight: "600" }}>
                {/* {window.location.pathname.split("/")[2] === "credit_reference"
                  ? credit
                  : balance} */}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginLeft: "2px", flex: 1 }}>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                paddingLeft: "5px",
                border: "2px solid #FFFFFF4D",
                height: "35px",
                background: "#262626",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "12px", fontWeight: "500" }}
              >
                New Balance
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                background: "#0B4F26",
                marginTop: "2px",
                display: "flex",
                paddingLeft: "5px",
                flexDirection: "column",
                justifyContent: "center",
                border: "2px solid #FFFFFF4D",
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "12px", fontWeight: "400" }}
              >
                New Balance
              </Typography>
              <Typography sx={{ color: "#10DC61", fontWeight: "600" }}>
                {/* {window.location.pathname.split("/")[2] === "credit_reference"
                  ? Detail[2].val
                  : isNaN(Detail[2].val)
                  ? balance
                  : window.location.pathname.split("/")[2] === "withdraw" &&
                    (Detail[2].val !== 0 || isNaN(Detail[2].val))
                  ? -Detail[2].val + balance
                  : Detail[2].val + balance} */}
              </Typography>
            </Box>{" "}
          </Box>
        </Box>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // submit();
          }}
        >
          <>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                width: "100%",
                flexDirection: {
                  xs: "column",
                  md: "row",
                  lg: "row",
                },
                alignItems: "center",
                justifyContent: {
                  xs: "flex-start",
                  md: "flex-start",
                  lg: "flex-start",
                },
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    marginTop: "10px",
                    gap: 1,
                    flexDirection: {
                      xs: "column",
                      md: "row",
                      lg: "row",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: {
                        xs: "18px",
                        md: "45px",
                        lg: "45px",
                      },
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {window.location.pathname.split("/")[2] ===
                      "credit_reference"
                        ? "NEW CREDIT REFERENCE POINTS"
                        : (
                            window.location.pathname.split("/")[2] + " Points"
                          ).toUpperCase()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Input
                      placeholder="Type Amount..."
                      required={true}
                      titleStyle={{ display: "none" }}
                      inputStyle={{
                        paddingTop: 0,
                        marginTop: 0,
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                      inputProps={{ color: "white", padding: 0, margin: 0 }}
                      inputContainerStyle={{
                        minHeight: "45px",
                        width: "100%",
                        background: "#0B4F26",
                        border: "2px solid #FFFFFF4D",
                        borderRadius: "5px",
                        marginTop: 0,
                      }}
                      title={"Remark (Optional)"}
                      //   setDetail={setDetail}
                      //   Detail={Detail}
                      //   setError={setError}
                      //   error={error}
                      place={2}
                      type={"Number"}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    marginTop: "10px",
                    gap: 1,
                    flexDirection: {
                      xs: "column",
                      md: "row",
                      lg: "row",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      marginTop: "10px",
                      gap: 1,
                      flexDirection: {
                        xs: "column",
                        md: "row",
                        lg: "row",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: {
                          xs: "18px",
                          md: "45px",
                          lg: "45px",
                        },
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Transaction Password
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Input
                      placeholder=""
                      required={true}
                      imgstyle={{ marginRight: 0 }}
                      img={EyeIcon}
                      img1={EyeSlash}
                      titleStyle={{ display: "none" }}
                      inputStyle={{
                        paddingTop: 0,
                        marginTop: 0,
                        color: "black",
                        fontSize: "20px",
                        fontWeight: "600",
                      }}
                      inputProps={{ color: "white", padding: 0, margin: 0 }}
                      inputContainerStyle={{
                        minHeight: "45px",
                        width: "100%",
                        background: "#FFFFFF",
                        border: "2px solid #26262633",
                        borderRadius: "5px",
                        marginTop: 0,
                      }}
                      title={"Admin Transaction Password"}
                      //   setDetail={setDetail}
                      //   Detail={Detail}
                      //   setError={setError}
                      //   error={error}
                      place={3}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Input
                  placeholder="Remark (Optional)"
                  titleStyle={{ display: "none" }}
                  inputStyle={{
                    paddingTop: "10px",
                    width: "100%",
                    fontWeight: "600",
                    color: "black",
                    maxHeight: "120px",
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    color: "black",

                    fontSize: "600",
                  }}
                  inputContainerStyle={{
                    minHeight: "110px",
                    width: "100%",
                    background: "#FFECBC",
                    border: "2px solid #26262633",
                    borderRadius: "5px",
                  }}
                  title={"Remark (Optional)"}
                  //   setDetail={setDetail}
                  //   Detail={Detail}
                  //   setError={setError}
                  //   error={error}
                  place={4}
                />
              </Box>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CustomButton
                  onClick={() => {
                    navigate(
                      `/${
                        window.location.pathname.split("/")[1]
                      }/walletSettings`
                    ); //${window.location.pathname.split("/")[1]}/list_of_clients
                  }}
                  title={"Cancel"}
                  color={"#E32A2A"}
                />
                <CustomButton
                  type={"submit"}
                  title={"Submit"}
                  color={"#0B4F26"}
                />
              </Box>
            </Box>
          </>
        </form>
      </Box>

      <DailogModal />
      {showSuccessModal && (
        <WalletModal
          message={showModalMessage}
          setShowSuccessModal={handleChangeShowModalSuccess}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          navigateTo={"list_of_clients"}
        />
      )}
    </>
  );
};

export default DepositAndWithdrawBox;
