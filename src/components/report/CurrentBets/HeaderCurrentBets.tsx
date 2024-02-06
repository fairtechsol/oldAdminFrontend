import { Box, Typography } from "@mui/material";

const HeaderCurrentBets = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "1vh",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: "white",
          marginLeft: "0.5%",
          fontWeight: "600",
          marginY: "0.5%",
          alignSelf: "start",
        }}
      >
        Current Bets
      </Typography>
    </Box>
  );
};

export default HeaderCurrentBets;
