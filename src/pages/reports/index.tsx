import { Box, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";

const menutItems = [
  { title: "Profit/Loss", link: `${Constants.oldAdmin}reports/profit_loss` },
  {
    title: "Profit/Loss Cards",
    link: `${Constants.oldAdmin}reports/profit_loss_cards`,
  },
  {
    title: "Account Statement",
    link: `${Constants.oldAdmin}reports/account_statement`,
  },
  { title: "Current Bet", link: `${Constants.oldAdmin}reports/current_bet` },
];

const Reports = () => {
  const navigate = useNavigate();
  const classes = {
    Menusx: {
      margin: "1%",
      fontFamily: "Poppins, sans-serif",
      width: { xs: "105%", lg: "100%", md: "100%" },
    },
    MenuListProps: { "aria-labelledby": "basic-button" },
    MenuPaperProps: {
      sx: {
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
    <Box sx={{ width: "100%" }}>
      <Box sx={classes.Menusx}>
        <Typography
          sx={[
            {
              fontSize: { lg: "18px", xs: "16px" },
              fontWeight: "600",
              fontFamily: "Poppins, sans-serif",
              color: "#fff",
              textTransform: "uppercase",
              marginLeft: "0.5%",
            },
          ]}
        >
          Report
        </Typography>
      </Box>
      <Box
        sx={{
          background: "#F8C851",
          padding: "10px",
          margin: "1%",
          borderRadius: "5px",
        }}
      >
        {menutItems.map((x: any, index: any) => (
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
  );
};

export default Reports;
