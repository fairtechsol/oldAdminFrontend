import { Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchWiseProfitLoss } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { Constants } from "../../../utils/Constants";
import Footer from "../../Common/Footer";
import RowHeaderMatches from "./RowHeaderMatches";

const ProfitLossTableComponent = ({
  eventData,
  currentPage,
  endDate,
  startDate,
  userProfitLoss,
  getUserProfitLoss,
  setCurrentPage,
  event,
  setEvent,
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  const { matchWiseProfitLossCount } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const { userData } = useSelector(
    (state: RootState) => state.report.reportList
  );
  const [selectedId, setSelectedId] = useState({
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });

  const getHandleReport = (eventType: any) => {
    if (event === eventType) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
    }
    if (event !== eventType) {
      setCurrentPage(1);
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
      dispatch(
        getMatchWiseProfitLoss({
          type: eventType,
          searchId: userData?.id,
          startDate: startDate && moment(startDate)?.format("YYYY-MM-DD"),
          endDate: endDate && moment(endDate)?.format("YYYY-MM-DD"),
          page: 1,
          limit: Constants.pageLimit,
        })
      );
    }
    setEvent(eventType);
  };

  const getBetReport = (value: any) => {
    setSelectedId({
      type: value?.type,
      id: value?.matchId,
      betId: value?.betId,
      sessionBet: value?.sessionBet,
    });
  };

  useEffect(() => {
    dispatch(
      getMatchWiseProfitLoss({
        type: event,
        searchId: userData?.id,
        startDate: startDate,
        endDate: endDate,
        page: currentPage,
        limit: Constants.pageLimit,
      })
    );
  }, [currentPage]);

  return (
    <>
      {eventData?.length > 0 ? (
        <>
          {eventData?.map((item: any, index: any) => (
            <RowHeaderMatches
              key={index}
              item={item}
              index={index}
              getHandleReport={getHandleReport}
              selectedId={selectedId}
              getBetReport={getBetReport}
              userProfitLoss={userProfitLoss}
              getUserProfitLoss={getUserProfitLoss}
              eventType={event}
              currentPage={currentPage}
            />
          ))}
          <Footer
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pages={Math.ceil(
              parseInt(
                matchWiseProfitLossCount > 0 ? matchWiseProfitLossCount : 1
              ) / Constants.pageLimit
            )}
          />
        </>
      ) : (
        <Typography
          sx={{
            color: "#fff",
            textAlign: "center",
            fontSize: { lg: "16px", xs: "10px" },
            fontWeight: "600",
            margin: "1rem",
          }}
        >
          No Matching Records Found
        </Typography>
      )}
    </>
  );
};

export default ProfitLossTableComponent;
