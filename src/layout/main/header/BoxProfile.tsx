import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowDown } from "../../../assets";
import StyledImage from "../../../components/Common/StyledImages";
import { handleNumber } from "../../../helper";
import BoxDropDownMenu from "./BoxDropDownMenu";

const BoxProfile = ({ value, containerStyle, balance, color }: any) => {
  const [open, setOpen] = useState(false);

  const [anchorEl] = useState(null);

  useEffect(() => {}, [anchorEl]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        minWidth: { lg: "150px", xs: "100px" },
      }}
    >
      <Box
        onClick={(event) => {
          setOpen(!open);
          event?.stopPropagation();
        }}
        sx={[
          {
            backgroundColor: "primary.main",
            minWidth: { lg: "150px", xs: "100px" },
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            justifyContent: "space-between",
            height: { lg: "45px", xs: "35px" },
            overflow: "hidden",
            paddingX: "10px",
            borderRadius: "5px",
          },
          containerStyle,
        ]}
      >
        <Box style={{}}>
          <Typography
            sx={{
              fontSize: { lg: "11px", xs: "9px" },
              color: "white",
              fontWeight: "600",
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: "13px", xs: "11px" },
              color: "white",
              fontWeight: "700",
            }}
          >
            {handleNumber(parseFloat(balance || 0.0), color)}
          </Typography>
        </Box>
        <StyledImage
          src={ArrowDown}
          sx={{
            height: "6px",
            width: "10px",
            marginRight: { lg: "5px", xs: -"10px" },
          }}
        />
      </Box>
      {open && (
        <BoxDropDownMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
};

export default BoxProfile;
