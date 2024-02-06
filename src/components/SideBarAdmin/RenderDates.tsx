import { useState } from "react";
import MainBox from "./MainBox";
import { Box } from "@mui/material";
import RenderBets from "./RenderBets";
import moment from "moment";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { getCompetitionMatches } from "../../store/actions/match/matchAction";
import { useSelector } from "react-redux";

const RenderDates = (props: any) => {
  const { i, handleDrawerToggle, colors, competitionId } = props;
  const [selected, setSelected] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { competitionMatches } = useSelector(
    (state: RootState) => state.match.sideBarList
  );

  return (
    <Box
      onClick={(event: any) => {
        event.stopPropagation();
        dispatch(
          getCompetitionMatches({ id: competitionId, date: i?.startdate })
        );
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
        sub={i?.sub}
        selected={selected}
        under={true}
        color={colors[2]}
        width={80}
        title={moment(i?.startdate).format("DD/MM/YYYY")}
      />
      {selected &&
        competitionMatches.length > 0 &&
        competitionMatches.map((value: any) => {
          return (
            <RenderBets
              handleDrawerToggle={handleDrawerToggle}
              i={value}
              key={value?.id}
              colors={colors}
            />
          );
        })}
    </Box>
  );
};

export default RenderDates;
