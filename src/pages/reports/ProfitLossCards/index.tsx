import { Box, Typography } from "@mui/material";
import { debounce } from "lodash";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfitLossHeader from "../../../components/report/ProfitLossReport/ProfitLossHeader";
import ProfitLossTableComponent from "../../../components/report/ProfitLossReport/ProfitLossTableComponent";
import service from "../../../service";
import {
  getUserTotalProfitLossCards,
  updateUserSearchId,
} from "../../../store/actions/reports";
import {
  getSearchClientList,
  getUserTotalProfitLoss,
} from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { ApiConstants } from "../../../utils/Constants";
interface FilterObject {
  searchId?: any;
  startDate?: string;
  endDate?: string;
}
const ProfitLossCards = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<any>("");
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
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
      let filter: FilterObject = {};
      dispatch(updateUserSearchId({ search }));
      if (search?.id) {
        filter["searchId"] = search?.id;
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
      dispatch(getUserTotalProfitLossCards({ filter: filter }));
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
        searchId: search?.id ? search?.id : "",
      };
      const { data } = await service.post(
        `${ApiConstants.CARD.GET_USERWISE_PROFIT_LOSS}`,
        payload
      );
      if (data) {
        setUserProfitLoss(data);
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
    dispatch(getUserTotalProfitLossCards({ filter: "" }));
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
          startDate={startDate}
          endDate={endDate}
          eventData={userTotalProfitLoss && userTotalProfitLoss}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          userProfitLoss={userProfitLoss}
          getUserProfitLoss={getUserProfitLoss}
        />
      </Box>
    </div>
  );
};

export default ProfitLossCards;
