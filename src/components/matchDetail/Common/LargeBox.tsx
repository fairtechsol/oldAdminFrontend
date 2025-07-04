import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";

interface LargeBoxProps {
  item: any;
  k: number;
}

const LargeBox = ({ item, k }: LargeBoxProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      key={k}
      sx={{
        width: k == 1 ? "20%" : "15%",
        border: "1px solid white",
        background: item?.background,
        height: "35px",
        justifyContent: "center",
        alignItems: k == 1 || k == 0 ? "center" : "center",
        paddingLeft: k == 1 || k == 0 ? { xs: "0", md: "5px", lg: "5px" } : 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: "8px",
              fontWeight: "600",
              color: item?.color,
              textTransform: "capitalize",
              wordWrap: "break-word",
              lineHeight: 1,
              overflowWrap: "anywhere",
              whiteSpace: "inherit",
              textOverflow: "ellipsis",
            }}
          >
            {item?.name}
          </Typography>
          {item?.isCommissionActive && (
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#74ee15",
              }}
            />
          )}
        </Box>
      </Box>
      {item?.time && (
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".6vw",
            fontWeight: "600",
            color: item?.color,
          }}
        >
          {item?.date}
        </Typography>
      )}
    </Box>
  );
};

export default memo(LargeBox);
