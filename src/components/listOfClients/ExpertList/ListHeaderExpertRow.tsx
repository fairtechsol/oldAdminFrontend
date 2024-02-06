import { Box, Typography } from "@mui/material";

const ListHeaderExpertRow = () => {
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
      <Box
        sx={{
          width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          height: "35px",
          borderRight: "2px solid white",
          lineHeight: "1.1",
        }}
      >
        <Typography
          sx={{ color: "white", fontSize: { lg: "12px", xs: "9px" } }}
        >
          {"User Details"}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
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
          All Privilege
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
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
          Add Match Privilege
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
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
          BetFair Match Privilege
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
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
          Bookmaker Match Privilege
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
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
          Session Match Privilege
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
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
          width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
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
          City
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
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
          Phone Number
        </Typography>
      </Box>
      {/* <Box
        sx={{
          width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
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
          Rolename
        </Typography>
      </Box> */}

      {/* <Box
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
          width: { lg: "8vw", md: "8vw", xs: "26.5vw" },
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
      </Box> */}
    </Box>
  );
};

export default ListHeaderExpertRow;
