import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";

interface SmallBoxProps {
  item: any;
  k: number;
}

const SmallBox = ({ item, k }: SmallBoxProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      key={k}
      sx={{
        width: "10%",
        border: "1px solid white",
        background: item?.background,
        height: "35px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        textTransform: "capitalize",
      }}
    >
      <Typography
        sx={{
          fontSize: matchesMobile ? "10px" : ".7vw",
          fontWeight: "600",
          lineHeight: 1,
          color: item?.color,
        }}
      >
        {item?.name}
      </Typography>
      <Typography
        sx={{ fontSize: "9px", fontWeight: "600", color: item?.color }}
      >
        {item?.rate && item?.rate}
      </Typography>
    </Box>
  );
};
export default memo(SmallBox);
