import { Box } from "@mui/material";
import ChangePasswordComponent from "../../RowModalComponents/ChangePasswordComponent";
import BoxButton from "../../RowModalComponents/BoxButton";
import { ApiConstants } from "../../../../utils/Constants";
import LockUnlockComponent from "./LockUnlockComponent";
import { memo } from "react";

const RowModalComponents = (props: any) => {
  const { element, selected, setSelected, backgroundColor } = props;
  const classes = {
    mainBox: {
      background: "#F8C851",
      display: "flex",
      width: { xs: "100%", lg: "100%", md: "100%" },
      justifyContent: {
        xs: "flex-start",
        md: "flex-start",
        lg: "flex-start",
      },
      overflow: "hidden",
      paddingY: "20px",
      paddingTop: "10px",
      borderBottom: "2px solid white",
    },
    mainBoxSubsx: [
      {
        width: "11.5vw",
        display: "flex",

        height: "45px",
        paddingLeft: "10px",
        borderRight: "2px solid #0000",
      },
    ],
    BoxButtonStyledImage: {
      height: { xs: "15px", lg: "18px" },
      width: { xs: "15px", lg: "17px" },
      marginLeft: "5px",
    },
    BoxButtonContStyle: {
      background: "#E32A2A",
      flex: 1,
      marginX: { lg: "10px", xs: "0" },
      alignSelf: "center",
      borderColor: "white",
    },
  };

  return (
    <Box sx={classes.mainBox}>
      {selected !== null && (
        <Box
          sx={{
            width: {
              xs: "auto",
              md: "90%",
              lg: "80%",
              marginLeft: "0",
            },
            padding: "5px",
          }}
        >
          {selected == 3 && (
            <ChangePasswordComponent
              endpoint={ApiConstants.EXPERT.CHANGE_PASSWORD}
              element={{ ...element, roleName: "expert" }}
              selected={selected == 3}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
            />
          )}
          {selected == 4 && (
            <LockUnlockComponent
              endpoint={ApiConstants.EXPERT.LOCK_UNLOCK}
              element={{ ...element, roleName: "expert" }}
              selected={selected == 4}
              setSelected={() => {
                setSelected(null);
              }}
              backgroundColor={backgroundColor}
            />
          )}
        </Box>
      )}
      {selected === null && (
        <Box
          sx={{
            // flex: 1,
            display: "flex",
            flexDirection: { xs: "row", lg: "row", md: "row" },
            gap: { xs: 0.5 },
            flexWrap: "wrap",
            justifyContent: "center",
            width: { xs: "90vw", lg: "77%", md: "100%" },
            marginTop: "9px",
          }}
        >
          <BoxButton
            color={"#0B4F26"}
            onClick={() => {
              setSelected(3);
            }}
            title={"Change Password"}
            isSelected={selected == 3}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
          />
          <BoxButton
            color={"#0B4F26"}
            onClick={() => {
              setSelected(4);
            }}
            title={"Lock/Unlock"}
            containerStyle={{
              marginLeft: { lg: "10px", xs: "0" },
              flex: 1,
              borderColor: "white",
            }}
            titleStyle={{
              fontSize: { xs: "12px" },
            }}
            isSelected={selected == 4}
          />
        </Box>
      )}
    </Box>
  );
};

export default memo(RowModalComponents);
