import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MaterialUISwitch from "../Common/MaterialUISwitch";

const ButtonWithSwitch = (props: any) => {
  const { title, val, name, setLockUnlockObj, lockUnlockObj, showLockUnlock } =
    props;
  const [checked, setChecked] = useState(val);
  const classes = {
    mainBox: [
      {
        background: checked ? "#0B4F26" : "#E32A2A",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        height: "45px",
        alignItems: "center",
        borderRadius: "5px",
      },
    ],
    mainBoxTypography: [
      {
        fontSize: { xs: "3vw", lg: "0.7vw", md: "0.7vw" },
        fontWeight: "600",
        textAlign: "right",
        color: "white",
        marginRight: "10px",
        minWidth: { lg: "80px", xs: "0px", md: "0px" },
      },
    ],
  };

  useEffect(() => {
    setChecked(val);
  }, [val]);
  return (
    <Box sx={classes.mainBox}>
      <MaterialUISwitch
        checked={checked}
        onChange={() => {
          setLockUnlockObj({
            ...lockUnlockObj,
            [name]: !val,
          });
          setChecked(!checked);
        }}
      />
      <Typography sx={classes.mainBoxTypography}>
        {title} {showLockUnlock && (val ? "Unlocked" : "Locked")}
      </Typography>
    </Box>
  );
};

export default ButtonWithSwitch;
