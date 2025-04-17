import { Box } from "@mui/material";
import { memo, useState } from "react";
import MainBox from "./MainBox";
import RenderOdds from "./RenderOdds";

const RenderBets = ({ i, handleDrawerToggle, colors }: any) => {
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
export default memo(RenderBets);
