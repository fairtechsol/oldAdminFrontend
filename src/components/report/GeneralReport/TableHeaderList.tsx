import { Box, Typography } from "@mui/material";

const TableHeaderList = () => {
  return (
    <Box
      sx={{
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
          width: "8%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          overflow: "hidden"
        }}
      >
        <Typography sx={{ color: "white", fontSize: "11px" }}>
          Sr.No.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "23%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Name</Typography>
      </Box>
      <Box
        sx={{
          width: "23%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Amount
        </Typography>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          overflow:"hidden"
        }}
      >
        <Typography sx={{ color: "white", fontSize: "11px" }}>
          Sr.No.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "23%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>Name</Typography>
      </Box>
      <Box
        sx={{
          width: "23%",
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "12px" }}>
          Amount
        </Typography>
      </Box>
    </Box>
  );
};

export default TableHeaderList;
