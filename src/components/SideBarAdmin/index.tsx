import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ARROWDROPDOWN } from "../../assets";
import RenderGames from "./RenderGames";

const colors = ["#F8C851", "#FFDA7D", "#FFE7AD", "#FFF1CF", "#FFF8E6"];
const datas = [
  {
    title: "Cricket",
    value: "cricket",
  },
  {
    title: "Football",
    value: "football",
  },
  {
    title: "Tennis",
    value: "tennis",
  },
  {
    title: "Hockey",
    value: "hockey",
  },
];
const SideBarAdmin = (props: any) => {
  const { handleDrawerToggle } = props;
  const [matchData] = useState(datas);

  return (
    <Box

    // headerGradient
    >
      <Box
        sx={[
          {
            width: "100%",
            marginTop: "5px",
            paddingX: "3%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "20px",
            height: "6vh",
            marginBottom: ".5vh",
            borderBottomRightRadius: ".5vh",
            borderTopRightRadius: ".5vh",
          },
          (theme: any) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`,
          }),
        ]}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flex: 0.1 }}></Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              height: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                marginLeft: "1.8%",
                fontWeight: { xs: "500", lg: "600" },
              }}
            >
              All Sports
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            <img
              style={{
                width: "15px",
                height: "8px",
              }}
              src={ARROWDROPDOWN}
            />
          </Box>
        </Box>
      </Box>
      {matchData?.map((games, index) => {
        return (
          <RenderGames
            key={index}
            handleDrawerToggle={handleDrawerToggle}
            games={games}
            colors={colors}
          />
        );
      })}
    </Box>
  );
};
export default SideBarAdmin;
