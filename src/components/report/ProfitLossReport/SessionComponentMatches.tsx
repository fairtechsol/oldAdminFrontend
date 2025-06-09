import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { handleNumber } from "../../../helper";
import {
  getTotalBetProfitLoss,
  getTotalBetProfitLossForModal,
} from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import StyledImage from "../../Common/StyledImages";
import SessionBetSeperate from "./SessionBetSeperate";

const SessionComponentMatches = ({
  item,
  index,
  showSessionBets,
  setShowSessionBets,
  userId,
  getBetReport,
  selectedId,
  matchId,
  user,
  selectedChildBetId,
  setSelectedChildBetId,
  color,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const { totalBetProfitLoss, totalBetProfitLossModal } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const { userData } = useSelector(
    (state: RootState) => state.report.reportList
  );

  const handleSessionBetClick = () => {
    if (
      selectedId?.betId === item?.betId ||
      selectedChildBetId === item?.betId
    ) {
      setShowSessionBets((prev: any) => !prev);
      if (!showSessionBets) {
        if (user) {
          dispatch(
            getTotalBetProfitLossForModal({
              betId: item?.betId,
              matchId: item?.matchid || item?.matchId || matchId,
              isSession: true,
              searchId: userData?.id,
              user,
            })
          );
          setSelectedChildBetId(item?.betId);
        } else {
          dispatch(
            getTotalBetProfitLoss({
              betId: item?.betId,
              matchId: item?.matchid || item?.matchId || matchId,
              isSession: true,
              searchId: userData?.id,
            })
          );
        }
      }
    } else {
      setShowSessionBets(true);
      if (user) {
        dispatch(
          getTotalBetProfitLossForModal({
            betId: item?.betId,
            matchId: item?.matchid || item?.matchId || matchId,
            isSession: true,
            searchId: userData?.id,
            user,
          })
        );
        setSelectedChildBetId(item?.betId);
      } else {
        getBetReport({
          eventType: item?.eventType,
          matchId: item?.matchid || item?.matchId || matchId,
          userId: userId,
          type: "session_bet",
          betId: item?.betId,
          sessionBet: true,
        });
        dispatch(
          getTotalBetProfitLoss({
            betId: item?.betId,
            matchId: item?.matchid || item?.matchId || matchId,
            isSession: true,
            searchId: userData?.id,
          })
        );
      }
    }
  };

  return (
    <Box key={index} sx={{ width: "100%" }}>
      <Box
        onClick={handleSessionBetClick}
        sx={{
          width: "100%",
          height: "45px",
          background: "white",
          display: "flex",
          padding: 0.1,
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: { xs: "10%", lg: "5%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "black",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
          >
            {"0" + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "65%", lg: "80%", md: "65%" },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: { lg: "center", xs: "flex-end" },
            display: "flex",
            paddingX: "10px",
            background: "#0B4F26",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "0px", xs: "10px" },
              color: "white",
              marginLeft: "5px",
              fontWeight: "500",
              position: "absolute",
              top: 0,
              right: 5,
            }}
          />
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "10px", lg: "15px" },
                color: "white",
                fontWeight: "700",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineClamp: 2,
              }}
            >
              {item?.eventName}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "10px", xs: "0" },
                color: "white",
                marginLeft: "5px",
                fontWeight: "600",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            background: item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A",
            paddingX: "2px",
            width: { xs: "25%", lg: "20%" },
            height: "100%",
            marginLeft: 0.1,
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "12px", xs: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              {matchesMobile ? "P/L" : "Profit/Loss"}
            </Typography>
            <StyledImage
              src={item.totalLoss > 0 ? ARROW_UP : ARROWDOWN}
              alt="arrow"
              sx={{
                width: { lg: "25px", xs: "15px" },
                height: { lg: "12px", xs: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {Number(item.totalLoss) >= 0 ? (
                <>
                  <span style={{ visibility: "hidden" }}>-</span>
                  {handleNumber(parseFloat(item.totalLoss), color)}
                </>
              ) : (
                handleNumber(parseFloat(item.totalLoss), color)
              )}
            </Typography>
            <StyledImage
              src={ArrowDown}
              alt="arrow down"
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  (selectedId?.betId === item?.betId ||
                    selectedChildBetId === item?.betId) &&
                  showSessionBets
                    ? "rotate(90deg)"
                    : "rotate(270deg)",
              }}
            />
          </Box>
        </Box>
      </Box>
      {(selectedId?.betId === item?.betId ||
        selectedChildBetId === item?.betId) &&
        matchesMobile &&
        showSessionBets && (
          <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
            <SessionBetSeperate
              betHistory={false}
              allBetsData={
                user
                  ? totalBetProfitLossModal
                    ? Array.from(new Set(totalBetProfitLossModal))
                    : []
                  : totalBetProfitLoss
                  ? Array.from(new Set(totalBetProfitLoss))
                  : []
              }
              profit
              isArrow={true}
            />
          </Box>
        )}
    </Box>
  );
};

export default memo(SessionComponentMatches);
