import { Box } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommissionMatch } from "../../store/actions/reports";
import { AppDispatch, RootState } from "../../store/store";
import { Constants } from "../../utils/Constants";
import Pagination from "../Common/Pagination";
import ListHeader from "./ListHeader";
import MatchList from "./MatchList";

interface CommissionReportTableProps {
  id: string;
  setShow: (show: any) => void;
  title: string;
}

const CommissionReportTable = ({
  id,
  setShow,
  title,
}: CommissionReportTableProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, commissionMatchList } = useSelector(
    (state: RootState) => state.report.reportList
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showCommisionReport, setShowCommisionReport] = useState(false);
  const [selectedId, setSelectedId] = useState({
    matchId: "",
    userId: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getCommissionMatch({ userId: id, currentPage }));
    }
  }, [id, currentPage]);

  return (
    <Box
      sx={[
        {
          width: { xs: "96%", lg: "85%", md: "96%" },
          minHeight: loading ? "50%" : "200px",
          maxHeight: "90%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          overflow: "hidden",
          border: "2px solid white",
        },
        (theme: any) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <Box sx={{ marginX: "0", background: "#F8C851", height: "50px" }}>
        <ListHeader
          userName={title}
          title="Commission Report"
          setShow={setShow}
        />
      </Box>
      <Box
        sx={{
          overflowX: "auto",
          width: "100%",
        }}
      >
        {commissionMatchList?.rows?.map((element: any, index: number) => (
          <MatchList
            key={element?.id}
            element={element}
            index={index}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            showCommisionReport={showCommisionReport}
            setShowCommisionReport={setShowCommisionReport}
            id={id}
          />
        ))}
      </Box>
      <Pagination
        currentPage={currentPage}
        pages={Math.ceil(
          parseInt(
            commissionMatchList?.count ? commissionMatchList?.count : 1
          ) / Constants.pageLimit
        )}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default memo(CommissionReportTable);
