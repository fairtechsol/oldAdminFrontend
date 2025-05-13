import { Box } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompetitionDates,
  resetCompetitionDates,
  resetCompetitionMatches,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import MainBox from "./MainBox";
import RenderDates from "./RenderDates";

const RenderEvents = ({
  i,
  handleDrawerToggle,
  colors,
  selectedCompetitionId,
  setSelectedCompetitionId,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedCompetitionDate, setSelectedCompertitionDate] = useState({
    value: false,
    startdate: "",
  });

  const { competitionDates } = useSelector(
    (state: RootState) => state.match.sideBarList
  );

  return (
    <Box
      onClick={(event: React.SyntheticEvent) => {
        event.stopPropagation();
        if (
          selectedCompetitionId?.competitionId !== i?.competitionId &&
          i?.competitionId !== ""
        ) {
          setSelectedCompetitionId({
            value: true,
            competitionId: i?.competitionId,
          });
          dispatch(getCompetitionDates(i?.competitionId));
          dispatch(resetCompetitionMatches());
          setSelectedCompertitionDate({ value: false, startdate: "" });
        } else {
          setSelectedCompetitionId({ value: false, competitionId: "" });
          dispatch(resetCompetitionDates());
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
        selected={selectedCompetitionId?.value}
        under={
          selectedCompetitionId?.competitionId === i?.competitionId &&
          i?.competitionId !== ""
        }
        color={colors[0]}
        width={85}
        title={i?.competitionName}
      />
      {selectedCompetitionId?.value &&
        selectedCompetitionId?.competitionId === i?.competitionId &&
        competitionDates.length > 0 &&
        competitionDates?.map((dates: any, index: any) => {
          return (
            <RenderDates
              handleDrawerToggle={handleDrawerToggle}
              i={dates}
              key={index}
              colors={colors}
              competitionId={i?.competitionId}
              selectedCompetitionDate={selectedCompetitionDate}
              setSelectedCompertitionDate={setSelectedCompertitionDate}
            />
          );
        })}
    </Box>
  );
};

export default memo(RenderEvents);
