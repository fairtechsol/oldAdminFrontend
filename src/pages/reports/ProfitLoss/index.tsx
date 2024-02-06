import { Box, Typography } from "@mui/material";
import ProfitLossHeader from "../../../components/report/ProfitLossReport/ProfitLossHeader";
import ProfitLossTableComponent from "../../../components/report/ProfitLossReport/ProfitLossTableComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getTotalProfitLoss } from "../../../store/actions/reports";
import moment from "moment";

const ProfitLossReport = () => {
  const dispatch: AppDispatch = useDispatch();
  // const [pageLimit] = useState(10);
  const [pageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const { totalProfitLossList } = useSelector(
    (state: RootState) => state.report.reportList
  );

  const handleClick = () => {
    try {
      let filter = "";
      if (startDate && endDate) {
        filter += `&createdAt=between${moment(startDate)?.format(
          "YYYY-MM-DD"
        )}|${moment(endDate.setDate(endDate.getDate() + 1))?.format(
          "YYYY-MM-DD"
        )}`;
      } else if (startDate) {
        filter += `&createdAt=gte${moment(startDate)?.format("YYYY-MM-DD")}`;
      } else if (endDate) {
        filter += `&createdAt=lte${moment(endDate)?.format("YYYY-MM-DD")}`;
      }
      dispatch(getTotalProfitLoss({ filter: filter }));
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
    }
  };

  useEffect(() => {
    dispatch(getTotalProfitLoss({ filter: "" }));
  }, []);

  return (
    <div>
      <ProfitLossHeader
        title="Profit/Loss"
        onClick={handleClick}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setSearch={setSearch}
        search={search}
      />
      <Typography
        sx={{
          fontSize: "16px",
          color: "white",
          marginLeft: "1%",
          fontWeight: "600",
          marginY: "0.5%",
          alignSelf: "start",
        }}
      >
        Profit/Loss for Event Type
      </Typography>

      <Box>
        <ProfitLossTableComponent
          visible={true}
          startDate={startDate}
          endDate={endDate}
          eventData={totalProfitLossList && totalProfitLossList}
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </div>
  );
};

export default ProfitLossReport;
