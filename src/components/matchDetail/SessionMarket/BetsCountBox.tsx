import { Box, Typography } from "@mui/material";
import { memo } from "react";

const BetsCountBox = ({ total }: { total: number }) => {
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
          fontSize: "8px",
          fontWeight: "bold",
          color: "#FF4D4D",
        }}
      >
        S Bets
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
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
