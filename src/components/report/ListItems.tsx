import { Box, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListItems = (props: any) => {
  const { menutItems1, title } = props;
  const navigate = useNavigate();
  const classes = {
    Menusx: {
      marginTop: { xs: "15px", lg: "30px", md: "18px" },
      marginLeft: { xs: "5px", lg: "0", md: "0" },
      paddingY: "0px",
      padding: "0px",
      fontFamily: "Poppins, sans-serif",
      width: { xs: "105%", lg: "100%", md: "100%" },
    },
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: {
      sx: {
        paddingY: "0px",
        padding: "0px",
        width: "100%",
        left: "1px !important",
        top: { lg: "191px !important", xs: "170px !important" },
        minHeight: "220px",
        background: "url(/static/media/back.00d2deda3616019e96ee.png)",
        boxShadow: "none",
      },
    },
    MenuItemsx: {
      width: "100%",
      fontSize: { lg: "16px", xs: "12px" },
      fontWeight: "600",
      marginX: "0px",
      borderBottomWidth: 0,
      borderColor: "#EAEFEC",
      marginTop: "0px",
      borderStyle: "solid",
      minHeight: { xs: "30px", lg: "40px" },
      lineHeight: "18px",
      color: "black",
      "&:hover": {
        backgroundColor: "#e5b744",
        border: 0,
      },
    },
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={classes.Menusx}>
          <Typography
            sx={[
              {
                fontSize: { lg: "18px", xs: "16px" },
                fontWeight: "600",
                fontFamily: "Poppins, sans-serif",
                padding: { lg: "10px 37px", xs: "10px 20px" },
                paddingBottom: "15px",
                color: "#fff",
                textTransform: "uppercase",
              },
            ]}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            marginLeft: { xs: "20px", lg: "37px" },
            marginRight: "20px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {menutItems1.map((x: any, index: any) => (
            <MenuItem
              key={index}
              dense={true}
              sx={classes.MenuItemsx}
              onClick={() => {
                navigate(x.link);
              }}
            >
              {x.title}
            </MenuItem>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ListItems;
