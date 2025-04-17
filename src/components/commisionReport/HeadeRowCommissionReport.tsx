import { Box, Typography } from "@mui/material";
import { memo } from "react";

const columns = [
  "User Name",
  "Commission Type",
  "Name",
  "Date/Time",
  "Team",
  "Odds",
  "Bet Type",
  "Stake",
  "Commission Amount",
  "My Commission",
];

const HeaderRowCommissionReport = () => {
  const commonBoxStyles = {
    display: "flex",
    paddingLeft: "10px",
    alignItems: "center",
    height: "35px",
    borderRight: "2px solid white",
  };

  const commonTypographyStyles = {
    color: "white",
    fontSize: {
      xs: "10px",
      md: "12px",
      lg: "12px",
    },
    lineHeight: 1,
  };

  return (
    <Box
      sx={{
        width: { xs: "218%", md: "100%", lg: "100%" },
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {columns.map((label) => {
        const isWider = ["Bet Type", "Stake"].includes(label);
        const width = isWider ? "15%" : "12.5%";

        return (
          <Box key={label} sx={{ ...commonBoxStyles, width }}>
            <Typography sx={commonTypographyStyles}>{label}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default memo(HeaderRowCommissionReport);
