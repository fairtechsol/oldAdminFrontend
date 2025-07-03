import { Box } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../../../service";
import { RootState } from "../../../store/store";
import { ApiConstants } from "../../../utils/Constants";
import AllUserListSeparate from "./AllUserListSeparate";

interface ChildUserListProps {
  id: string;
  matchId: string;
  roleName: string;
  getBetReport: (val: any) => void;
  sessionBetData: any;
  sessionBets: any;
  bet1Data: any;
  startDate: any;
  endDate: any;
}

const ChildUserList = ({
  id,
  matchId,
  roleName,
  getBetReport,
  sessionBetData,
  sessionBets,
  bet1Data,
  startDate,
  endDate,
}: ChildUserListProps) => {
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [data1, setData] = useState([]);

  const getChildUserList = async () => {
    try {
      let payload = {
        user: {
          id,
          roleName,
        },
        partnerShipRoleName: profileDetail?.roleName,
        gameId: matchId,
        startDate: startDate && moment(startDate)?.format("YYYY-MM-DD"),
        endDate: endDate && moment(endDate)?.format("YYYY-MM-DD"),
      };
      const { data } = await service.post(
        `${ApiConstants.CARD.GET_USERWISE_PROFIT_LOSS}`,
        payload
      );
      if (data) {
        setData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChildUserList();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {data1?.map((profitLoss: any, index: number) => (
        <AllUserListSeparate
          key={index}
          item={profitLoss}
          index={index + 1}
          matchId={matchId}
          getBetReport={getBetReport}
          sessionBetData={sessionBetData}
          bet1Data={bet1Data}
          sessionBets={sessionBets}
          startDate={startDate}
          endDate={endDate}
        />
      ))}
    </Box>
  );
};

export default memo(ChildUserList);
