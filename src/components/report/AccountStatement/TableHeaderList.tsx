import { Box, Typography } from "@mui/material";

const TableHeaderList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        width: { xs: "222vw", md: "100%", lg: "100%" },
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: { xs: "14%", lg: "11%", md: "11%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Date</Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "16%", lg: "14%", md: "14%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Credit
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "16%", lg: "14%", md: "14%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Debit</Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "14%", lg: "11%", md: "11%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Closing
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "36%", lg: "36%", md: "36%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Description
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "18%", lg: "11%", md: "18%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>From</Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "18%", lg: "11%", md: "18%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>To</Typography>
      </Box>
    </Box>
  );
};

export default TableHeaderList;
