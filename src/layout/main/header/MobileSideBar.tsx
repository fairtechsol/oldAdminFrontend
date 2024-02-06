import { Box } from "@mui/material";
import { memo } from "react";
import { Drawer } from "@mui/material";
import SideBarAdmin from "../../../components/SideBarAdmin";

const MobileSideBar = (props: any) => {
  const { mobileOpen, setMobileOpen } = props;
  const handleDrawerToggle = () => {
    setMobileOpen(false);
  };
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const classes = {
    Drawersx: {
      display: { xs: "block" },
      "& .MuiDrawer-paper": { boxSizing: "border-box", width: "300px" },
    },
    DrawerBox1sx: {
      minHeight: { lg: "60px", xs: "60px", md: "60px" },
    },
    DrawerBox2sx: { minHeight: "100vh" },
  };
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={classes.Drawersx}
    >
      <Box sx={classes.DrawerBox1sx} />
      <Box
        sx={
          (classes.DrawerBox2sx,
          (theme: any) => ({
            height: "100%",
            backgroundImage: `${theme.palette.primary.mainGradient}`,
          }))
        }
      >
        <SideBarAdmin
          key={2}
          handleDrawerToggle={handleDrawerToggle}
          mobileShow={true}
        />
      </Box>
    </Drawer>
  );
};

export default memo(MobileSideBar);
