import { Box, Typography } from "@mui/material";

const ListHeader = ({ userName }: any) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        height: "45px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      <Box
        sx={{
          width: { lg: "11.5vw", md: "20.5vw", xs: "18.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: { lg: "12px", xs: "7px" } }}
        >
          {userName ?? "User Details"}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "10.5vw", md: "10.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "11px" },
            lineHeight: "1.1",
          }}
        >
          Credit Reference 
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "11px" },
            lineHeight: "1.1",
          }}
        >
          Balance
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "11.5vw", xs: "27.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "9px" },
            lineHeight: "1.1",
          }}
        >
          Client Profit/Loss
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "9px" },
            lineHeight: "1.1",
          }}
        >
          % Profit/Loss
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "9.5vw", md: "9.5vw", xs: "18.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "7px" },
            lineHeight: "1.1",
          }}
        >
          Commission
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "9.5vw", md: "9.5vw", xs: "18.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "6px" },
            lineHeight: "1.1",
          }}
        >
          Exposure
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "9px", lineHeight: "1.1" },
          }}
        >
          Available Balance
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "5vw", md: "5vw", xs: "14vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "9px" },
            lineHeight: "1.1",
          }}
        >
          Bet Lock
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "5vw", md: "5vw", xs: "14vw" },
          display: "flex",
          paddingX: "10px",
          justifyContent: "center",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "11.5px", xs: "9px" },
            lineHeight: "1",
          }}
        >
          User Lock
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "8vw", md: "8vw", xs: "18.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "11px" },
            lineHeight: "1.1",
          }}
        >
          Exposure Limit
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "10vw", md: "10vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "12px", xs: "9px" },
            lineHeight: "1.1",
          }}
        >
          Account Type
        </Typography>
      </Box>
    </Box>
  );
};

export default ListHeader;
