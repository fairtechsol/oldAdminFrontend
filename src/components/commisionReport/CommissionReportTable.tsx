import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommissionMatch } from "../../store/actions/reports";
import { AppDispatch, RootState } from "../../store/store";
import Loader from "../Loader";
import FooterRowCommissionReport from "./FooterRowCommissionReport";
import ListHeader from "./ListHeader";
import MatchList from "./MatchList";

const CommissionReportTable = ({ id, setShow, title }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const matchesxs = useMediaQuery(theme.breakpoints.down("lg"));
  const { loading, commissionMatchList } = useSelector(
    (state: RootState) => state.report.reportList
  );
  const [currentPage] = useState(1);
  const [showCommisionReport, setShowCommisionReport] = useState(false);
  const [selectedId, setSelectedId] = useState({
    matchId: "",
    userId: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(getCommissionMatch(id));
    }
  }, [id]);

  return (
    <>
      <Box
        sx={[
          {
            width: { xs: "96%", lg: "85%", md: "96%" },
            // marginX: "0.5%",
            minHeight: loading ? "50%" : "200px",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
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
        {loading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <Box sx={{ marginX: "0", background: "#F8C851", height: "50px" }}>
              <ListHeader
                id={id}
                userName={title}
                title={"Commission Report"}
                // setMatchList={setMatchList}
                setShow={setShow}
                matchesxs={matchesxs}
              />
            </Box>
            <Box
              sx={{
                overflowX: "auto",
                width: { xs: "100%", lg: "100%", md: "100%" },
              }}
            >
              {commissionMatchList?.map((element: any, index: number) => (
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
            <FooterRowCommissionReport currentPage={currentPage} />
          </>
        )}
      </Box>
    </>
  );
};

export default CommissionReportTable;
