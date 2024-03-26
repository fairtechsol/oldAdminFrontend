import { memo } from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import AllUserListSeparate from "./AllUserListSeperate";
import service from "../../../service";

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

  const getChildUserList = async () => {
    try {
      let payload = {
        user: {
          id,
          roleName,
        },
        matchId: matchId,
        searchId: "",
      };
      const { data } = await service.post(`/user/userwise/profitLoss`, payload);
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
