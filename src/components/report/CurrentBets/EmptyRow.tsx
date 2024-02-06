import { Box, Typography } from "@mui/material";

const EmptyRow = ({ containerStyle }: any) => {
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          background: "#0B4F26",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
          justifyContent: "center",
        },
        containerStyle,
      ]}
    >
      <Typography>No Results found</Typography>
    </Box>
  );
};

export default EmptyRow;
