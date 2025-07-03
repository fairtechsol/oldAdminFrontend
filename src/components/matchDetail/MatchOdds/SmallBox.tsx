import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { handleNumber } from "../../../helper";

interface SmallBoxProps {
  valueA: any;
  valueB: any;
}

const SmallBox = ({ valueA, valueB }: SmallBoxProps) => {
  return (
    <Box
      sx={{
        marginLeft: { xs: "0", lg: "12px", md: "12px" },
        display: "flex",
        gap: "4px",
      }}
    >
      <Box
        sx={{
          width: { lg: "3.68vw", xs: "12.7vw", md: "70px" },
          flexDirection: "column",
          paddingX: "5px",
          display: "flex",
          left: { xs: "53%", lg: "49vw", md: "53%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{ color: "#FF4D4D", fontSize: "8px", fontWeight: "bold" }}
        >
          {" "}
          Book{" "}
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: 1,
            fontWeight: "bold",
            color: valueA < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {handleNumber(parseFloat(valueA), "")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "3.7vw", xs: "12.7vw", md: "70px" },
          paddingX: "5px",
          display: "flex",
          flexDirection: "column",
          left: { xs: "65%", lg: "55vw", md: "65%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
          borderRight: { xs: "0", lg: "2px solid #000", md: "0" },
        }}
      >
        <Typography
          sx={{ color: "#FF4D4D", fontSize: "8px", fontWeight: "bold" }}
        >
          Book
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: 1,
            fontWeight: "bold",
            color: valueB < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {" "}
          {handleNumber(parseFloat(valueB), "")}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(SmallBox);
