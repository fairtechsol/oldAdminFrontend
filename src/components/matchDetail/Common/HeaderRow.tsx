import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

interface HeaderRowProps {
  tag?: boolean;
}

const HeaderRow = ({ tag }: HeaderRowProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Box
        sx={{
          width: "6%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          No
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: tag ? "flex-start" : "center",
          paddingLeft: tag ? "5px" : 0,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          User
        </Typography>
      </Box>
      <Box
        sx={{
          width: "20%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: tag ? "flex-start" : "center",
          paddingLeft: tag ? "5px" : 0,
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Market
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Favourite
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Odds
        </Typography>
      </Box>
      <Box
        sx={{
          width: "10%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Stake
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          My Stake
        </Typography>
      </Box>
      <Box
        sx={{
          width: "15%",
          border: "1px solid white",
          background: "rgba(0,0,0)",
          height: "30px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontSize: matchesMobile ? "8px" : ".7vw",
            fontWeight: "500",
            color: "white",
          }}
        >
          Time
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderRow;
