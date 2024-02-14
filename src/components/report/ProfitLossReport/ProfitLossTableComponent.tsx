import { Box } from "@mui/material";
import RowHeaderMatches from "./RowHeaderMatches";
import Pagination from "../../Common/Pagination";
import { useState } from "react";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { getMatchWiseProfitLoss } from "../../../store/actions/user/userAction";

const ProfitLossTableComponent = (props: any) => {
  const {
    eventData,
    currentPage,
    pageCount,
    setCurrentPage,
    visible,
    startDate,
    endDate,
    setShow,
    show,
  } = props;
  const [event, setEvent] = useState("");
  const dispatch: AppDispatch = useDispatch();
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

  return (
    <Box>
      {eventData?.map((item: any, index: any) => {
        return (
          <>
            <RowHeaderMatches
              key={index}
              item={item}
              show={visible}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setCurrentPage={setCurrentPage}
              startDate={startDate}
              endDate={endDate}
            />
          </>
        );
      })}
      {visible && (
        <Pagination
          getListOfUser={() => {}}
          currentPage={currentPage}
          pages={pageCount}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Box>
  );
};

export default ProfitLossTableComponent;
