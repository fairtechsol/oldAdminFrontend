import { Box } from "@mui/material";
import RowHeaderMatches from "./RowHeaderMatches";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { getMatchWiseProfitLoss } from "../../../store/actions/user/userAction";
import RowComponentMatches from "./RowComponentMatches";
import { useSelector } from "react-redux";
import Footer from "../../Common/Footer";

const ProfitLossTableComponent = (props: any) => {
  const {
    eventData,
    betData,
    sessionBetData,
    handleReport,
    currentPage,
    pageCount,
    // setCurrentPage,
    sessionBets,
    setShow,
    show,
  } = props;
  const [event, setEvent] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { matchWiseProfitLoss } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const [selectedId, setSelectedId] = useState({
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });

  const getHandleReport = (eventType: any) => {
    setEvent(eventType);
    if (show) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
    }
    if (!show) {
      setSelectedId((prev) => ({
        ...prev,
        type: "",
        id: "",
        betId: "",
        sessionBet: false,
      }));
      dispatch(
        getMatchWiseProfitLoss({
          type: event,
        })
      );
    }
    setShow(!show);
  };

  // function callPage(val: any) {
  //   // setCurrentPage(setProfitLossReportPage(parseInt(val)));
  //   setCurrentPage(parseInt(val));

  //   handleReport(event, parseInt(val));
  // }

  const getBetReport = (value: any) => {
    setSelectedId({
      type: value?.type,
      id: value?.match_id,
      betId: value?.betId,
      sessionBet: value?.sessionBet,
    });
  };

  return (
    <Box>
      {eventData?.map((item: any, index: any) => {
        return (
          <>
            <RowHeaderMatches
              key={index}
              item={item}
              index={index}
              getHandleReport={getHandleReport}
              show={show}
            />
          </>
        );
      })}
      <Box>
        {show &&
          matchWiseProfitLoss?.map((item: any, index: number) => {
            return (
              <RowComponentMatches
                key={index}
                item={item}
                index={index + 1}
                selectedId={selectedId}
                betData={betData}
                sessionBetData={sessionBetData}
                sessionBets={sessionBets}
                getBetReport={getBetReport}
              />
            );
          })}
      </Box>

      {show && (
        <Footer
          getListOfUser={() => handleReport(event)}
          setCurrentPage={() => {}}
          currentPage={currentPage}
          pages={pageCount}
          // callPage={callPage}
        />
      )}
    </Box>
  );
};

export default ProfitLossTableComponent;
