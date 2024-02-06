import { useState } from "react";
import MainBox from "./MainBox";
import { Box } from "@mui/material";
import RenderDates from "./RenderDates";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { getCompetitionDates } from "../../store/actions/match/matchAction";
import { useSelector } from "react-redux";

const RenderEvents = (props: any) => {
  const { i, handleDrawerToggle, colors } = props;
  const dispatch: AppDispatch = useDispatch();
  const [selected, setSelected] = useState(false);

  const { competitionDates } = useSelector(
    (state: RootState) => state.match.sideBarList
  );

  return (
    <Box
      onClick={(event: React.SyntheticEvent) => {
        event.stopPropagation();
        dispatch(getCompetitionDates(i?.competitionId));
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
        color={colors[0]}
        width={85}
        title={i?.competitionName}
      />
      {selected &&
        competitionDates.length > 0 &&
        competitionDates?.map((dates: any, index: any) => {
          return (
            <RenderDates
              handleDrawerToggle={handleDrawerToggle}
              i={dates}
              key={index}
              colors={colors}
              competitionId={i.competitionId}
            />
          );
        })}
    </Box>
  );
};

export default RenderEvents;
