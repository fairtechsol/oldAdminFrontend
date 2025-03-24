import { Box } from "@mui/material";
import { memo, useEffect, useState } from "react";
import service from "../../../service";
import { ApiConstants } from "../../../utils/Constants";
import AllUserListSeparate from "./AllUserListSeparate";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../store/store";

const ChildUserList = ({
  id,
  matchId,
  roleName,
  getBetReport,
  sessionBetData,
  sessionBets,
  bet1Data,
}: any) => {
  const [data1, setData] = useState([]);
  // const { userData } = useSelector(
  //   (state: RootState) => state.report.reportList
  // );

  const getChildUserList = async () => {
    try {
      let payload = {
        user: {
          id,
          roleName,
        },
        gameId: matchId,
        // searchId: userData?.id ? userData?.id : "",
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
          id={profitLoss?.userId}
          key={index}
          item={profitLoss}
          index={index + 1}
          matchId={matchId}
          getBetReport={getBetReport}
          sessionBetData={sessionBetData}
          bet1Data={bet1Data}
          sessionBets={sessionBets}
        />
      ))}
    </Box>
  );
};

export default memo(ChildUserList);
