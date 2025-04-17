import { Box, Typography } from "@mui/material";
import { memo } from "react";

const headerItems = [
  {
    label: "User Details",
    width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
  },
  {
    label: "Credit Reference",
    width: { lg: "10.5vw", md: "10.5vw", xs: "26.5vw" },
  },
  { label: "Balance", width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" } },
  {
    label: "Client Profit/Loss",
    width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
  },
  {
    label: "% Profit/Loss",
    width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
  },
  { label: "Commission", width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" } },
  { label: "Exposure", width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" } },
  {
    label: "Available Balance",
    width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
  },
  {
    label: "User Lock",
    width: { lg: "5vw", md: "5vw", xs: "14vw" },
    center: true,
  },
  {
    label: "Bet Lock",
    width: { lg: "5vw", md: "5vw", xs: "14vw" },
    center: true,
  },
  { label: "Exposure Limit", width: { lg: "8vw", md: "8vw", xs: "26.5vw" } },
  { label: "Account Type", width: { lg: "10vw", md: "10vw", xs: "26.5vw" } },
];

const ListHeaderRow = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "30px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {headerItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            width: item.width,
            display: "flex",
            paddingX: "10px",
            justifyContent: item.center ? "center" : "flex-start",
            alignItems: "center",
            height: "35px",
            borderRight:
              index < headerItems.length - 1 ? "2px solid white" : "none",
            lineHeight: "1.1",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "12px", xs: "9px" },
              lineHeight: "1.1",
              textAlign: item.center ? "center" : "left",
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default memo(ListHeaderRow);
