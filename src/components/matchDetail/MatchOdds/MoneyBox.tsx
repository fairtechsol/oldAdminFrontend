import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const MoneyBox = (props: any) => {
  const { color, rates } = props;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        width: "85px",
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
        {parseFloat(rates).toFixed(2)}
      </Typography>
    </Box>
  );
};

export default MoneyBox;
