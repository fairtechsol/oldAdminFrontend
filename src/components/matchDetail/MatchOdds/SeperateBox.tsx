import { Box, Typography } from "@mui/material";
import { Lock } from "../../../assets";

const SeperateBox = (props: any) => {
  const { color, empty, value, value2, lock, width } = props;
  return (
    <>
      <Box
        onClick={() => {
          if (lock || color == "white") {
            return null;
          }
          //   dispatch(setColorValue(color));
        }}
        sx={{
          background: lock ? "#FDF21A" : color,
          border: color != "white" ? "1px solid #2626264D" : "0px solid white",
          width: { xs: "30%", lg: width ? `${width}vw` : "5vw" },
          height: "94%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {!empty && !lock && (
          <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
            <Typography
              sx={{
                fontSize: "13px",
                color: color == "white" ? "white" : "black",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {value}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "10px", xs: "9px" },
                marginTop: -0.4,
                color: color == "white" ? "white" : "black",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {value2}
            </Typography>
          </Box>
        )}
        {lock && <img src={Lock} style={{ width: "10px", height: "15px" }} />}
      </Box>
    </>
  );
};

export default SeperateBox;
