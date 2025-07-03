import { Box, Typography } from "@mui/material";

interface EmptyRowProps {
  containerStyle: object;
}

const EmptyRow = ({ containerStyle }: EmptyRowProps) => {
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
