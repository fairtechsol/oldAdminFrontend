import { Box, Typography } from "@mui/material";

const SmallBox = (props: any) => {
  const { valueA, valueB } = props;
  return (
    <Box
      sx={{
        marginLeft: { xs: "0", lg: "12px", md: "12px" },
        display: "flex",
        gap: "4px",
      }}
    >
      <Box
        sx={{
          width: { lg: "3.68vw", xs: "12.7vw", md: "70px" },
          // position: "absolute",
          flexDirection: "column",
          paddingX: "5px",
          display: "flex",
          left: { xs: "53%", lg: "49vw", md: "53%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Typography
          sx={{ color: "#FF4D4D", fontSize: "8px", fontWeight: "bold" }}
        >
          {" "}
          Book{" "}
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: 1,
            fontWeight: "bold",
            color: valueA < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {" "}
          {valueA < 0 ? ` ${valueA}` : `${valueA}`}{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { lg: "3.7vw", xs: "12.7vw", md: "70px" },
          // position: "absolute",
          paddingX: "5px",
          display: "flex",
          flexDirection: "column",
          left: { xs: "65%", lg: "55vw", md: "65%" },
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          background: "white",
          borderRadius: "3px",
          borderRight: { xs: "0", lg: "2px solid #000", md: "0" },
        }}
      >
        <Typography
          sx={{ color: "#FF4D4D", fontSize: "8px", fontWeight: "bold" }}
        >
          {" "}
          Book{" "}
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: 1,
            fontWeight: "bold",
            color: valueB < 0 ? `#FF4D4D` : `#319E5B`,
          }}
        >
          {" "}
          {valueB < 0 ? ` ${valueB}` : `${valueB}`}{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default SmallBox;
