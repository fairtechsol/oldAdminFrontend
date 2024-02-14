import { Box, Typography } from "@mui/material";

const PlaceBetComponent = (props: any) => {
  const { profitLoss } = props;
  return (
    <Box
      //   onClick={handleClick}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        // ref={innerRef}
        // onClick={(e) => {
        //     setShow(!show);
        // }}
        sx={{
          background: "#0B4F26",
          position: "absolute",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          right: { xs: "43vw", lg: "41vw", md: "41vw" },
          justifyContent: "center",
          width: { lg: "90px", xs: "60px", md: "90px" },
          borderRadius: "5px",
          height: "35px",

          zIndex: 100,
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "90%",
            height: "45%",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "10px", xs: "8px" },
              fontWeight: "bold",
              color: "#FF4D4D",
            }}
          >
            Total Bet :{" "}
            <span style={{ color: "#0B4F26" }}>
              {profitLoss?.totalBet || 0}
            </span>
          </Typography>
        </Box>
        <Box sx={{ zIndex: 100, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              marginTop: "2px",
              fontSize: {
                lg: !profitLoss?.maxLoss ? "8px" : "8px",
                md: "8px",
                xs: "8px",
              },
              fontWeight: !profitLoss?.maxLoss ? "500" : "500",
              color: "white",
            }}
          >
            {" "}
            {!profitLoss?.maxLoss ? "Profit/Loss" : profitLoss?.maxLoss}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceBetComponent;
