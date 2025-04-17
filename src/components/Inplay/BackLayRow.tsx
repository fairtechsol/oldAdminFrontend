import { Box, Typography } from "@mui/material";
import { memo } from "react";

const BackLayRow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        background: "#319E5B",
        height: "25px",
        width: "100%",
        alignSelf: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "'#319E5B'",
          height: "25px",
          width: "40%",
          alignItems: "center",
        }}
      />
      <Box
        sx={{
          display: "flex",
          background: "#319E5B",
          height: "25px",
          width: { lg: "60%", xs: "80%" },
          justifyContent: { lg: "flex-end", xs: "flex-end" },
        }}
      >
        <Box
          sx={{
            background: "#00C0F9",
            width: { lg: "20%", xs: "24.5%" },
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
          >
            Back
          </Typography>
        </Box>
        <Box sx={{ width: ".35%", display: "flex" }} />
        <Box
          sx={{
            background: "#FF9292",
            width: { lg: "20%", xs: "24.5%" },
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
          >
            Lay
          </Typography>
        </Box>
        <Box sx={{ width: ".25%", display: "flex", background: "white" }} />
      </Box>
    </Box>
  );
};

export default memo(BackLayRow);
