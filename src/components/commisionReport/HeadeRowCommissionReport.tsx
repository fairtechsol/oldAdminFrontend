import { Box, Typography } from "@mui/material";

const HeaderRowCommissionReport = () => {
  return (
    <Box
      sx={{
        width: { xs: "218%", lg: "100%", md: "100%" },
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: {
              xs: "10px",
              lg: "12px",
              md: "12px",
              lineHeight: 1,
            },
          }}
        >
          User Name
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: {
              xs: "10px",
              lg: "12px",
              md: "12px",
              lineHeight: 1,
            },
          }}
        >
          Commission Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "10px", lg: "12px", md: "12px" },
          }}
        >
          Name
        </Typography>
      </Box>

      <Box
        sx={{
          width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "10px", lg: "12px", md: "12px" },
          }}
        >
          Date/Time
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "10px", lg: "12px", md: "12px" },
          }}
        >
          Team
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "10px", lg: "12px", md: "12px" },
          }}
        >
          Odds
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "15%", md: "15%", xs: "15%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "10px", lg: "12px", md: "12px" },
          }}
        >
          Bet Type
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "15%", md: "15%", xs: "15%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "10px", lg: "12px", md: "12px" },
          }}
        >
          Stack
        </Typography>
      </Box>

      <Box
        sx={{
          width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: {
              xs: "10px",
              lg: "12px",
              md: "12px",
              lineHeight: 1,
            },
          }}
        >
          Commission Amount
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: {
              xs: "10px",
              lg: "12px",
              md: "12px",
              lineHeight: 1,
            },
          }}
        >
          My Commission
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderRowCommissionReport;
