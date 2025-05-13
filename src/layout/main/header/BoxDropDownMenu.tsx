import { Box, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../../assets";
import StyledImage from "../../../components/Common/StyledImages";
import { logout } from "../../../store/actions/auth/authAction";
import { AppDispatch } from "../../../store/store";
import { Constants } from "../../../utils/Constants";
import { memo } from "react";

const menutItems = [
  { title: "Change Password", link: `${Constants.oldAdmin}change-password` },
];
const BoxDropDownMenu = ({ handleClose }: any) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box
      sx={{
        position: "absolute",
        background: "white",
        top: { lg: "45px", xs: "35px" },
        right: 0,
        paddingY: "10px",
        paddingX: "2px",
        borderRadius: "5px",
        marginTop: "2px",
      }}
    >
      {menutItems.map((x, idx) => (
        <MenuItem
          key={idx}
          dense={true}
          sx={{
            fontSize: { lg: "12px", xs: "10px" },
            fontWeight: "500",
            marginX: "5px",
            width: { lg: "200px", xs: "200px" },
            borderBottomWidth: 1,
            color: "black",
            borderColor: "#EAEFEC",
            paddingY: "2px",
            borderStyle: "solid",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
              borderColor: "white",
              borderRadius: "5px",
              transform: "scale(1.02)",
            },
          }}
          onClick={() => {
            handleClose();
            if (x.link) {
              navigate(x.link);
            }
          }}
        >
          {x.title}
        </MenuItem>
      ))}
      <Box
        onClick={() => {
          dispatch(logout());
        }}
        sx={{
          borderRadius: "5px",
          height: { lg: "38px", xs: "34px" },
          width: "200px",
          marginLeft: "5px",
          marginTop: "10px",
          backgroundColor: "#F1C550",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledImage
          src={Logout}
          sx={{ width: "35%", height: "auto" }}
          alt="logout"
        />
      </Box>
    </Box>
  );
};

export default memo(BoxDropDownMenu);
