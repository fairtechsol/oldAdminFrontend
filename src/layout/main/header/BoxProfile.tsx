import { Box, Typography } from "@mui/material";
import StyledImage from "../../../components/Common/StyledImages";
import { useEffect, useState } from "react";
import { ArrowDown } from "../../../assets";
import BoxDropDownMenu from "./BoxDropDownMenu";
import { handleNumber } from "../../../helper";

const BoxProfile = (props: any) => {
  const { value, containerStyle, balance, color } = props;
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
            // marginLeft: "1vw",
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
            {handleNumber(parseFloat(balance), color)}
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
