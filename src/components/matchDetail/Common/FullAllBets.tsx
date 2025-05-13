import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ARROWUP } from "../../../assets";
import { formatToINR } from "../../../helper";
import { RootState } from "../../../store/store";
import HeaderRow from "./HeaderRow";
import Row from "./Row";

interface FullAllBetsProps {
  tag: boolean;
  IObets: any;
}

const FullAllBets = ({ tag, IObets }: FullAllBetsProps) => {
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [newData, setNewBets] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (IObets) {
      const uniqueData: any = {};
      IObets?.forEach((item: any) => {
        uniqueData[item.id] = item;
      });

      const result = Object.values<Record<string, any>>(uniqueData);
      const body: any = result?.map((v: any) => {
        const roleName = profileDetail?.roleName;
        let partnership = 0;
        switch (roleName) {
          case "fairGameAdmin":
            partnership = v?.user?.faPartnership;
            break;
          case "superAdmin":
            partnership = v?.user?.saPartnership;
            break;
          case "admin":
            partnership = v?.user?.aPartnership;
            break;
          case "superMaster":
            partnership = v?.user?.smPartnership;
            break;
          case "master":
            partnership = v?.user?.mPartnership;
            break;
          case "agent":
            partnership = v?.user?.agPartnership;
            break;
          case "fairGameWallet":
            partnership = v?.user?.fwPartnership;
            break;
          case "user":
            partnership = 100;
            break;
          default:
            partnership = 0;
        }
        const values = {
          values: [
            {
              name: v?.user?.userName,
              color: ["NO", "YES"].includes(v?.betType) ? "#FFF" : "black",
              background: ["NO", "YES"].includes(v?.betType)
                ? "#319E5B"
                : v?.marketType === "completeMatch" ||
                  v?.marketType === "tiedMatch2" ||
                  v?.marketType === "tiedMatch1"
                ? "#faf11b"
                : "#F1C550",
              deletedReason: v?.deleteReason,
              isCommissionActive: v?.isCommissionActive,
              id: v?.id,
              userId: v?.user?.id,
              betId: v?.betId,
              matchId: v?.matchId,
              domain: v?.domain,
            },
            {
              name:
                v?.marketType !== "session"
                  ? v?.bettingName ?? v?.marketType
                  : v?.marketType,
              color: ["NO", "YES"].includes(v?.betType) ? "#FFF" : "black",
              background: ["NO", "YES"].includes(v?.betType)
                ? "#319E5B"
                : v?.marketType === "completeMatch" ||
                  v?.marketType === "tiedMatch2" ||
                  v?.marketType === "tiedMatch1"
                ? "#faf11b"
                : "#F1C550",
              deletedReason: v?.deleteReason,
            },
            {
              name: v?.teamName,
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deletedReason: v?.deleteReason,
            },
            {
              name: v?.odds,
              color: "black",
              rate: v.rate ? (v?.betType === "NO" ? v?.rate : v?.rate) : null,
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deletedReason: v?.deleteReason,
            },
            {
              name:
                v?.marketType === "oddEven"
                  ? v?.teamName
                      ?.match(/[-_](odd|even)$/i)?.[1]
                      ?.toUpperCase() || v?.betType
                  : v?.betType,
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deletedReason: v?.deleteReason,
            },
            {
              name: formatToINR(v?.amount || v?.stake),
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deletedReason: v?.deleteReason,
            },
            {
              name: formatToINR(
                v?.myStake ? v?.myStake : (v?.amount * partnership) / 100
              ),
              color: "white",
              background: "#0B4F26",
              deletedReason: v?.deleteReason,
            },
            {
              name: moment.utc(v?.createdAt).utcOffset("+05:30").format("LTS"),
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              time: true,
              date: moment.utc(v?.createdAt).utcOffset("+05:30").format("L"),
              deletedReason: v?.deleteReason,
            },
          ],
        };
        return values;
      });

      setNewBets(body);
    }
  }, [IObets]);

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        marginY: "0",
        width: "100%",
        alignSelf: { xs: "center", md: "center", lg: "flex-start" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "99.7%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "12px", xs: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            All Bets
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <Box className="slanted" />
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: { lg: "flex-end", xs: "flex-end" },
            padding: { lg: "0", xs: "0" },
          }}
        >
          <Box
            sx={{
              width: "70px",
              height: "80%",
              background: "white",
              justifyContent: "center",
              borderRadius: "3px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              marginRight: "2px",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "8px", xs: "8px" },
                fontWeight: "700",
                color: "#FF1111",
              }}
            >
              Total Bet
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#0B4F26",
                lineHeight: 1,
              }}
            >
              {IObets?.length || 0}
            </Typography>
          </Box>
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            alt="arrow up"
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      {visible && (
        <>
          <HeaderRow tag={tag} />
          <Box
            className="myScroll"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {newData?.map((i: any, k: number) => {
              const num = newData.length - k;
              const formattedNum = num < 10 ? "0" + num : num.toString();
              return (
                <Box key={k} style={{ display: "flex", position: "relative" }}>
                  <Box
                    sx={{
                      width: "5.3%",
                      border: "1px solid white",
                      background: "black",
                      height: "35px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: !tag ? { xs: "8px", lg: "11px" } : "13px",
                        fontWeight: tag ? "bold" : "600",
                        color: "white",
                      }}
                    >
                      {formattedNum}
                    </Typography>
                  </Box>
                  <Row index={k} values={i.values} />
                  {i?.values[0]?.deletedReason && (
                    <Box
                      sx={{
                        background: "rgba(0,0,0,0.5)",
                        width: "100%",
                        position: "absolute",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ flex: 1, display: "flex" }}>
                        <Box sx={{ width: "34%", height: "35px" }} />
                        <Box
                          sx={{
                            width: "66%",
                            height: "35px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: "700",
                              color: "white",
                              textTransform: "uppercase",
                            }}
                          >
                            Bet{" "}
                            <span style={{ color: "#e41b23" }}>deleted</span>{" "}
                            due to {i?.values[0]?.deletedReason}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(FullAllBets);
