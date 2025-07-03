import { Box } from "@mui/material";
import { memo, useEffect, useState } from "react";
import service from "../../../service";
import AllUserListSeparate from "./AllUserListSeperate";

interface ChildUserListProps {
  id: string;
  matchId: string;
  roleName: string;
  getBetReport: (val: any) => void;
  sessionBetData: any;
  sessionBets: any;
  bet1Data: any;
}

const ChildUserList = ({
  id,
  matchId,
  roleName,
  getBetReport,
  sessionBetData,
  sessionBets,
  bet1Data,
}: ChildUserListProps) => {
  const [data1, setData] = useState([]);

  const getChildUserList = async () => {
    try {
      setData([]);
      let payload = {
        user: {
          id,
          roleName,
        },
        matchId: matchId,
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
