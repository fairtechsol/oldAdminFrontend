import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompetitionList,
  resetCompetitionDates,
  resetCompetitionMatches,
  resetcompetitionList,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import MainBox from "./MainBox";
import RenderEvents from "./RenderEvents";

const RenderGames = ({
  games,
  handleDrawerToggle,
  colors,
  selected,
  setSelected,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedCompetitionId, setSelectedCompetitionId] = useState({
    value: false,
    competitionId: "",
  });

  const { competitionList } = useSelector(
    (state: RootState) => state.match.sideBarList
  );

  return (
    <Box
      onClick={(event: React.SyntheticEvent) => {
        event.stopPropagation();
        if (selected?.matchType !== games?.value) {
          setSelected({ value: true, matchType: games?.value });
          dispatch(getCompetitionList(games?.value));
          dispatch(resetCompetitionDates());
          dispatch(resetCompetitionMatches());
          setSelectedCompetitionId({
            value: false,
            competitionId: "",
          });
        } else {
          setSelected({ value: false, matchType: "" });
          dispatch(resetcompetitionList());
        }
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
        selected={selected?.value}
        under={selected?.matchType === games?.value}
        color={colors[1]}
        width={90}
        title={games?.title}
      />
      {selected?.value &&
        selected?.matchType === games?.value &&
        competitionList.length > 0 &&
        competitionList?.map((item: any) => {
          return (
            <RenderEvents
              key={item?.competitionId}
              handleDrawerToggle={handleDrawerToggle}
              i={item}
              colors={colors}
              selectedCompetitionId={selectedCompetitionId}
              setSelectedCompetitionId={setSelectedCompetitionId}
            />
          );
        })}
    </Box>
  );
};

export default RenderGames;
