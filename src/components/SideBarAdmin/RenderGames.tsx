import { useState } from "react";
import MainBox from "./MainBox";
import RenderEvents from "./RenderEvents";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getCompetitionList } from "../../store/actions/match/matchAction";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const RenderGames = ({ games, handleDrawerToggle, colors }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selected, setSelected] = useState(false);

  const { competitionList } = useSelector(
    (state: RootState) => state.match.sideBarList
  );

  return (
    <Box
      onClick={(event: React.SyntheticEvent) => {
        event.stopPropagation();
        dispatch(getCompetitionList(games?.value));
        setSelected(!selected);
      }}
      sx={{
        width: "100%",
        display: "flex",
        alignSelf: "flex-end",
        flexDirection: "column",
      }}
    >
      <MainBox
        sub={games?.sub}
        selected={selected}
        under={true}
        color={colors[1]}
        width={90}
        title={games.title}
      />
      {selected &&
        competitionList.length > 0 &&
        competitionList?.map((item: any) => {
          return (
            <RenderEvents
              key={item?.competitionId}
              handleDrawerToggle={handleDrawerToggle}
              i={item}
              colors={colors}
            />
          );
        })}
    </Box>
  );
};

export default RenderGames;
