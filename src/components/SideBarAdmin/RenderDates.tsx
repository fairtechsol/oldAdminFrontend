import { Box } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompetitionMatches,
  resetCompetitionMatches,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import MainBox from "./MainBox";
import RenderBets from "./RenderBets";

const RenderDates = ({
  i,
  handleDrawerToggle,
  colors,
  competitionId,
  selectedCompetitionDate,
  setSelectedCompertitionDate,
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { competitionMatches } = useSelector(
    (state: RootState) => state.match.sideBarList
  );

  return (
    <Box
      onClick={(event: any) => {
        event.stopPropagation();
        if (selectedCompetitionDate?.startdate !== i?.startdate) {
          setSelectedCompertitionDate({
            value: true,
            startdate: i?.startdate,
          });
          dispatch(
            getCompetitionMatches({ id: competitionId, date: i?.startdate })
          );
        } else {
          setSelectedCompertitionDate({ value: false, startdate: "" });
          dispatch(resetCompetitionMatches());
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
        sub={i?.sub}
        selected={selectedCompetitionDate?.value}
        under={selectedCompetitionDate?.startdate === i?.startdate}
        color={colors[2]}
        width={80}
        title={moment(i?.startdate).format("DD/MM/YYYY")}
      />
      {selectedCompetitionDate?.value &&
        selectedCompetitionDate?.startdate === i?.startdate &&
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

export default memo(RenderDates);
