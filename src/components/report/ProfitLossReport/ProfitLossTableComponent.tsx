import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchWiseProfitLoss } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import Footer from "../../Common/Footer";
import RowComponentMatches from "./RowComponentMatches";
import RowHeaderMatches from "./RowHeaderMatches";
import { Constants } from "../../../utils/Constants";

const ProfitLossTableComponent = (props: any) => {
  const {
    eventData,
    currentPage,
    setShow,
    show,
    endDate,
    startDate,
    userProfitLoss,
    getUserProfitLoss,
    setCurrentPage,
  } = props;

  const dispatch: AppDispatch = useDispatch();
  const { matchWiseProfitLoss, matchWiseProfitLossCount } = useSelector(
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
          type: eventType,
          searchId: userData?.id,
          startDate: startDate,
          endDate: endDate,
          page: 1,
          limit: Constants.pageLimit,
        })
      );
    }
    setShow(!show);
  };

  const getBetReport = (value: any) => {
    setSelectedId({
      type: value?.type,
      id: value?.matchId,
      betId: value?.betId,
      sessionBet: value?.sessionBet,
    });
  };

  // useEffect(() => {
  //   dispatch(
  //     getMatchWiseProfitLoss({
  //       type: event,
  //       searchId: userData?.id,
  //       startDate: startDate,
  //       endDate: endDate,
  //       page: currentPage,
  //       limit: Constants.pageLimit,
  //     })
  //   );
  // }, [currentPage]);

  function paginate(array: any, pageNumber: number, pageSize: number) {
    try {
      --pageNumber;
      if (array.length > 0) {
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        return array?.slice(startIndex, endIndex);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const currentPageData = paginate(
    matchWiseProfitLoss,
    currentPage,
    Constants.pageLimit
  );

  return (
    <>
      {eventData?.length > 0 ? (
        <Box>
          {eventData?.map((item: any, index: any) => {
            return (
              <>
                <RowHeaderMatches
                  key={index}
                  item={item}
                  index={index}
                  show={show}
                  getHandleReport={getHandleReport}
                />
              </>
            );
          })}
          <Box>
            {show &&
              currentPageData?.map((item: any, index: number) => {
                return (
                  <RowComponentMatches
                    key={index}
                    item={item}
                    index={index + 1}
                    selectedId={selectedId}
                    getBetReport={getBetReport}
                    userProfitLoss={userProfitLoss}
                    getUserProfitLoss={getUserProfitLoss}
                    currentPage={currentPage}
                  />
                );
              })}
          </Box>

          {show && (
            <Footer
              // getListOfUser={() => handleReport(event)}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pages={Math.ceil(
                parseInt(
                  matchWiseProfitLossCount > 0 ? matchWiseProfitLossCount : 1
                ) / Constants.pageLimit
              )}
              // callPage={callPage}
            />
          )}
        </Box>
      ) : (
        <Box>
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
        </Box>
      )}
    </>
  );
};

export default ProfitLossTableComponent;
