import { Box, Drawer } from "@mui/material";
import { memo } from "react";
import SideBarAdmin from "../../../components/SideBarAdmin";

interface MobileSideBarProps {
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

const MobileSideBar = ({ mobileOpen, setMobileOpen }: MobileSideBarProps) => {
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
        <SideBarAdmin handleDrawerToggle={handleDrawerToggle} />
      </Box>
    </Drawer>
  );
};

export default memo(MobileSideBar);
