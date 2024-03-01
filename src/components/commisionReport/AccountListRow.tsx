import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

const AccountListRow = ({
  containerStyle,
  fContainerStyle,
  fTextStyle,
  element,
}: any) => {
  const prevElement = {
    name: element?.matchName,
    commissionAmount: element?.commissionAmount,
    commissionType:
      element?.betType === "NO" || element?.betType === "YES"
        ? "Session"
        : "Match",
    betType: element?.betType,
    stack: element?.stake,
    odds: element?.odds,
    isActive: element?.isActive,
    teamBet: element?.teamName,
    createAt: element?.date,
    myCommission:
      ((+element?.commissionAmount || 0) * element?.partnerShip) / 100 +
      `(${element?.partnerShip}%)`,
    userName: element?.userName,
  };
  const [elementToUDM, setElementToUDM] = useState(prevElement);

  function checkIfElementUpdated(val: any) {
    setElementToUDM(val);
  }
  useEffect(() => {
    checkIfElementUpdated(prevElement);
  }, [element?.commissionType]);

  return (
    <>
      {!elementToUDM?.isActive && (
        <Box
          sx={{
            background: "rgba(0,0,0,0.5)",
            //   width: { xs: "218%", lg: "100%", md: "100%" },
            height: "45px",
            position: "absolute",
            display: "flex",
          }}
        />
      )}

      <Box
        sx={[
          {
            width: { xs: "218%", lg: "100%", md: "100%" },
            display: "flex",
            height: "45px",
            background: "#0B4F26",
            alignItems: "center",
            overflow: "hidden",
            borderBottom: "2px solid white",
          },
          containerStyle,
        ]}
      >
        <Box
          sx={[
            {
              width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            },
            fContainerStyle,
          ]}
        >
          <Typography
            sx={[
              {
                fontSize: { xs: "10px", lg: "12px", md: "10px" },
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
                color:
                  ["#319E5B", "#303030"].includes(fContainerStyle.background) &&
                  "white",
              },
              fTextStyle,
            ]}
          >
            {elementToUDM?.userName}
          </Typography>
        </Box>
        <Box
          sx={[
            {
              width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            },
            fContainerStyle,
          ]}
        >
          <Typography
            sx={[
              {
                fontSize: { xs: "10px", lg: "12px", md: "10px" },
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
                color:
                  ["#319E5B", "#303030"].includes(fContainerStyle.background) &&
                  "white",
              },
              fTextStyle,
            ]}
          >
            {elementToUDM.commissionType}
          </Typography>
        </Box>
        <Box
          sx={[
            {
              width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            },
            fContainerStyle,
          ]}
        >
          <Typography
            sx={[
              {
                fontSize: { xs: "10px", lg: "12px", md: "10px" },
                fontWeight: "600",
                cursor: "pointer",
                display: " -webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              },
            ]}
          >
            {elementToUDM?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {/* {elementToUDM.teamBet} */}
            {elementToUDM?.createAt
              ? `${moment(elementToUDM?.createAt).format("L")}  ${moment(
                  elementToUDM?.createAt
                ).format("LT")}`
              : ""}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.teamBet}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.odds}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "15%", md: "15%", xs: "15%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            textTransform: "capitalize",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.betType}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "15%", md: "15%", xs: "15%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.stack}
          </Typography>
        </Box>

        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.commissionAmount}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
          >
            {elementToUDM?.myCommission}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AccountListRow;
