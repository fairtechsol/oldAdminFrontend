import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { handleNumber } from "../../../helper";
import { memo } from "react";

interface MoneyBoxProps {
  color: string;
  rates: any;
}

const MoneyBox = ({ color, rates }: MoneyBoxProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  let val: any = parseFloat(rates);

  return (
    <Box
      sx={{
        width: "65px",
        marginRight: { xs: "5px", lg: "15px" },
        border: "1px solid #2626264D",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "25px",
        background: "#F6F6F6",
        zIndex: 100,
      }}
    >
      <Typography
        sx={{
          fontSize: matchesMobile ? "11px" : "13px",
          fontWeight: "bold",
          color: color,
        }}
      >
        {handleNumber(val, color)}
      </Typography>
    </Box>
  );
};

export default memo(MoneyBox);
