import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";

const BetsCountBox = ({ total }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        width: { lg: "72px", xs: "50px" },
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        background: "white",
        borderRadius: "3px",
      }}
    >
      <Typography
        sx={{
          fontSize: matchesMobile ? "8px" : "8px",
          fontWeight: "bold",
          color: "#FF4D4D",
        }}
      >
        S Bets
      </Typography>
      <Typography
        sx={{
          fontSize: matchesMobile ? "14px" : "14px",
          fontWeight: "bold",
          color: "#0B4F26",
          lineHeight: 1,
        }}
      >
        {total}
      </Typography>
    </Box>
  );
};

export default memo(BetsCountBox);
