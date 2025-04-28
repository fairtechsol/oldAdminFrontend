import { Box, Typography } from "@mui/material";
import { LoaderInterface } from "../../interface/common";
import "./styles.css";

const Loader = ({ text, height, width }: LoaderInterface) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        width: width ? width : "100%",
        flex: 1,
        height: height ? height : "74%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box className="loading-wrap">
        <Box className="loading">
          <Box />
          <Box />
        </Box>
      </Box>
      <Typography sx={{ marginTop: "-40px" }}>{text}</Typography>
    </Box>
  );
};

export default Loader;
