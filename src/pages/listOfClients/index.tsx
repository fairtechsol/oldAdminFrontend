import { Box, Typography } from "@mui/material";
import * as React from "react";
import AccountList from "../../components/listOfClients/AccountList";
import { ApiConstants } from "../../utils/Constants";

const ListOfClients = () => {
  return (
    <>
      <Box sx={{ margin: " 1%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginY: "0.5%",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              marginLeft: { lg: "0.5%", xs: "0.5%" },
            }}
          >
            Account List
          </Typography>
        </Box>
        <AccountList endpoint={ApiConstants.USER.LIST} />
      </Box>
    </>
  );
};

export default React.memo(ListOfClients);
