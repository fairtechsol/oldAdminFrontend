import { Box, Typography } from "@mui/material";
import { memo } from "react";

const DropDownItem = ({
  i,
  CompetitionName,
  disable,
  setValue,
  setOpen,
  dropDownTextStyle,
  setSelected,
  name,
}: any) => {
  const handleClick = () => {
    if (!disable) {
      setValue(i);
      setOpen(false);
      setSelected((prev: any) => ({
        ...prev,
        [name]: i,
      }));
    }
  };
  return (
    <Box
      onClick={handleClick}
      sx={[
        {
          paddingY: "4px",
          paddingLeft: "7px",
          fontSize: "10px",
          fontWeight: "500",
          color: "black",
          "&:hover": {
            cursor: "pointer",
            background: "#3498ff33",
          },
        },
        dropDownTextStyle,
      ]}
    >
      <Typography>{i === "0" ? "0.00" : i}</Typography>
      <Typography sx={{ fontSize: "12px" }}>{CompetitionName}</Typography>
    </Box>
  );
};

export default memo(DropDownItem);
