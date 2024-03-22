import { Box, Typography } from "@mui/material";
import ProfitLossHeader from "../../../components/report/ProfitLossReport/ProfitLossHeader";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import moment from "moment";
import ProfitLossTableComponent from "../../../components/report/ProfitLossReport/ProfitLossTableComponent";
import {
  getSearchClientList,
  getUserTotalProfitLoss,
} from "../../../store/actions/user/userAction";
import { updateUserSearchId } from "../../../store/actions/reports";
import { debounce } from "lodash";
import service from "../../../service";
interface FilterObject {
  userId?: any;
  startDate?: string;
  endDate?: string;
}
const ProfitLossReport = () => {
  const dispatch: AppDispatch = useDispatch();
  // const [pageLimit] = useState(10);
  const [pageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<any>("");
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [show, setShow] = useState(false);
  const [userProfitLoss, setUserProfitLoss] = useState([]);

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { userTotalProfitLoss } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const { searchUserList } = useSelector(
    (state: RootState) => state.user.userList
  );
  const handleClick = () => {
    try {
      setShow(false);
      let filter: FilterObject = {};
      dispatch(updateUserSearchId({ search }));
      if (search?.id) {
        filter["userId"] = search?.id;
      }
      if (startDate && endDate) {
        filter["startDate"] = moment(startDate)?.format("YYYY-MM-DD");
        filter["endDate"] = moment(endDate)?.format("YYYY-MM-DD");
      } else {
        if (startDate) {
          filter["startDate"] = moment(startDate)?.format("YYYY-MM-DD");
        }
        if (endDate) {
          filter["endDate"] = moment(endDate)?.format("YYYY-MM-DD");
        }
      }
      dispatch(getUserTotalProfitLoss({ filter: filter }));
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
    }
  };
  const debouncedInputValue = useMemo(() => {
    return debounce((value) => {
      dispatch(
        getSearchClientList({
          userName: value,
          createdBy: profileDetail && profileDetail?.id,
        })
      );
    }, 500);
  }, []);

  const getUserProfitLoss = async (matchId: string) => {
    try {
      let payload = {
        matchId: matchId,
      };
      const { data } = await service.post(`/user/userwise/profitLoss`, payload);
      if (data) {
        setUserProfitLoss(data);
        // setPageCount(
        //   Math.ceil(
        //     parseInt(data?.data?.totalCount ? data.data?.totalCount : 1) /
        //       pageLimit
        //   )
        // );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (!search?.id) {
        debouncedInputValue(search);
      }
    } catch (e) {
      console.log(e);
    }
  }, [search]);
  useEffect(() => {
    dispatch(getUserTotalProfitLoss({ filter: "" }));
  }, []);

  return (
    <div>
      <ProfitLossHeader
        title="Profit/Loss"
        onClick={handleClick}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        clientData={searchUserList && searchUserList?.users}
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
          show={show}
          setShow={setShow}
          startDate={startDate}
          endDate={endDate}
          eventData={userTotalProfitLoss && userTotalProfitLoss}
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
          userProfitLoss={userProfitLoss}
          getUserProfitLoss={getUserProfitLoss}
        />
      </Box>
    </div>
  );
};

export default ProfitLossReport;
