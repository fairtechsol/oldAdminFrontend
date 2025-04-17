import { Box } from "@mui/material";
import { memo } from "react";

const Divider = () => {
  const classes = {
    root: {
      width: "100%",
      background: "rgba(211,211,211)",
      height: "1px",
    },
  };

  return <Box sx={classes.root} />;
};

export default memo(Divider);
