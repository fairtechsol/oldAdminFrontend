import { Box } from "@mui/material";
import RowHeaderMatches from "./RowHeaderMatches";
import Pagination from "../../Common/Pagination";
import { useState } from "react";

const ProfitLossTableComponent = (props: any) => {
  const {
    eventData,
    currentPage,
    pageCount,
    setCurrentPage,
    visible,
    startDate,
    endDate,
  } = props;

  const [selectedId, setSelectedId] = useState({
    type: "",
    id: "",
    betId: "",
    sessionBet: false,
  });

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
