import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { Lock } from "../../../assets";

interface SeperateBoxProps {
  color: string;
  value: number;
  value2: number | null;
  lock?: boolean;
}

const SeperateBox = ({ color, value, value2, lock }: SeperateBoxProps) => {
  return (
    <Box
      onClick={() => {
        if (lock || color == "white") {
          return null;
        }
      }}
      sx={{
        background: lock ? "#FDF21A" : color,
        border: color != "white" ? "1px solid #2626264D" : "0px solid white",
        width: { xs: "30%", lg: "5vw" },
        height: "94%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!lock && (
        <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
          <Typography
            sx={{
              fontSize: "13px",
              color: color == "white" ? "white" : "black",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: "10px", xs: "9px" },
              marginTop: -0.4,
              color: color == "white" ? "white" : "black",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {value2}
          </Typography>
        </Box>
      )}
      {lock && (
        <img src={Lock} style={{ width: "10px", height: "15px" }} alt="lock" />
      )}
    </Box>
  );
};

export default memo(SeperateBox);
