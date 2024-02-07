import MainBox from "./MainBox";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";

const RenderOdds = (props: any) => {
  const { i, handleDrawerToggle, colors } = props;
  const navigate = useNavigate();
  return (
    <Box
      onClick={(event: any) => {
        event.stopPropagation();
        navigate(`${Constants.oldAdmin}match`, {
          state: { matchId: i?.id },
        });
        handleDrawerToggle();
      }}
      sx={{
        width: "100%",
        display: "flex",
        marginLeft: "7%",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      {i?.isTiedMatch && (
        <MainBox
          sub={i?.sub}
          under={false}
          color={colors[4]}
          width={70}
          title={"Tied Match"}
        />
      )}
      {true && (
        <MainBox
          sub={i?.sub}
          under={false}
          color={colors[4]}
          width={70}
          title={"Match Odds"}
        />
      )}
    </Box>
  );
};
export default RenderOdds;
