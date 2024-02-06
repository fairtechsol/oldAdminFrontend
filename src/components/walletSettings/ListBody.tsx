import { Box, Typography } from "@mui/material";
import StyledImage from "../Common/StyledImages";
import { LockIcon, UnLockIcon } from "../../assets";

const ListBody = (props: any) => {
  const { walletAccountDetail, fContainerStyle, fTextStyle } = props;
  return (
    <Box
      sx={[
        {
          width: "100%",
          display: "flex",
          height: "45px",
          background: "#0B4F26",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
        },
      ]}
    >
      <Box
        sx={[
          {
            width: {
              lg: "11.5vw",
              md: "20.5vw",
              xs: "26.5vw",
            },
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
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "capitalize",
              wordBreak: "break-all",
              color: "white",
            },
            fTextStyle,
          ]}
        >
          {walletAccountDetail?.userName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "10.5vw",
            md: "10.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.creditRefrence}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "9.5vw",
            md: "9.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {Number(walletAccountDetail?.userBal?.currentBalance) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {Number(walletAccountDetail?.userBal?.currentBalance)}
            </>
          ) : (
            Number(walletAccountDetail?.userBal?.currentBalance)
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "11.5vw",
            md: "11.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          justifyContent: "space-between",
          background:
            Number(walletAccountDetail?.userBal?.myProfitLoss) >= 0
              ? "#27AC1E"
              : "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {Number(walletAccountDetail?.userBal?.myProfitLoss) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {walletAccountDetail?.userBal?.myProfitLoss}
            </>
          ) : (
            walletAccountDetail?.userBal?.myProfitLoss
          )}
        </Typography>
        <StyledImage
          src={
            Number(walletAccountDetail?.userBal?.myProfitLoss) >= 0
              ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
          }
          sx={{
            height: "15px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: {
            lg: "11.5vw",
            md: "11.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          justifyContent: "space-between",
          background:
            Number(walletAccountDetail?.userBal?.profitLoss) >= 0
              ? "#27AC1E"
              : "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {Number(walletAccountDetail?.userBal?.profitLoss) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {walletAccountDetail?.userBal?.profitLoss}
            </>
          ) : (
            walletAccountDetail?.userBal?.profitLoss
          )}
        </Typography>
        <StyledImage
          src={
            Number(walletAccountDetail?.userBal?.profitLoss) >= 0
              ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
              : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
          }
          sx={{
            height: "15px",
            marginLeft: "5px",
            filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
            width: "15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: {
            lg: "9.5vw",
            md: "9.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          justifyContent: "space-between",
          paddingX: "10px",
          alignItems: "center",
          color: "white",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.totalComission}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "9.5vw",
            md: "9.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          color: "white",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.userBal?.exposure}
        </Typography>
      </Box>
      <Box
        sx={{
          width: {
            lg: "9.5vw",
            md: "9.5vw",
            xs: "26.5vw",
          },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {Number(walletAccountDetail?.userBal?.currentBalance) >= 0 ? (
            <>
              <span style={{ visibility: "hidden" }}>-</span>
              {Number(walletAccountDetail?.userBal?.currentBalance)}
            </>
          ) : (
            Number(walletAccountDetail?.userBal?.currentBalance)
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "5vw", md: "5vw", xs: "14vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          paddingX: "10px",
          color: "white",
        }}
      >
        <StyledImage
          src={walletAccountDetail?.betBlock === false ? UnLockIcon : LockIcon}
          sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "5vw", md: "5vw", xs: "14vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <StyledImage
          src={walletAccountDetail?.userBlock === false ? UnLockIcon : LockIcon}
          sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
        />
      </Box>
      <Box
        sx={{
          width: { lg: "8vw", md: "8vw", xs: "26.5vw" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          paddingX: "10px",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.exposureLimit}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "10vw", md: "10vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {walletAccountDetail?.fullName}
        </Typography>{" "}
      </Box>
    </Box>
  );
};

export default ListBody;
