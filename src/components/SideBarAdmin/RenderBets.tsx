import MainBox from "./MainBox";
import { Box } from "@mui/material";
import { useState } from "react";
import RenderOdds from "./RenderOdds";

const RenderBets = (props: any) => {
  const { i, handleDrawerToggle, colors } = props;
  const [selected, setSelected] = useState(false);

  return (
    <Box
      onClick={(event: any) => {
        event.stopPropagation();
        setSelected((prev) => !prev);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={i?.sub}
        under={true}
        selected={selected}
        color={colors[4]}
        width={75}
        title={i?.title}
      />
      {selected && (
        <RenderOdds
          i={i}
          handleDrawerToggle={handleDrawerToggle}
          colors={colors}
        />
      )}
    </Box>
  );
};
export default RenderBets;
