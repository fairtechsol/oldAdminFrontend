import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { formatToINR, handleNumber } from "../../../helper";
import { getBetProfitLossCards } from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";
import { Constants } from "../../../utils/Constants";
import StyledImage from "../../Common/StyledImages";
import AllRateSeperate from "./AllRateSeperate";
import AllUserListSeparate from "./AllUserListSeparate";

const RowComponentMatches = ({
  item,
  index,
  selectedId,
  getBetReport,
  userProfitLoss,
  getUserProfitLoss,
  currentPage,
  color,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { betProfitLossListCards } = useSelector(
    (state: RootState) => state.report.cardReport
  );
  const { userData } = useSelector(
    (state: RootState) => state.report.reportList
  );
  const dispatch: AppDispatch = useDispatch();
  const [showBets, setShowBets] = useState(false);
  const [showListOfUsers, setShowListOfUsers] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          if (selectedId?.id === item?.gameId) {
            if (showListOfUsers) {
              setShowListOfUsers((prev) => !prev);
              getBetReport({
                eventType: "",
                matchId: "",
                type: "users_list",
                betId: "",
                sessionBet: false,
              });
            } else {
              getUserProfitLoss(item?.gameId);
              getBetReport({
                eventType: item?.eventType,
                matchId: item?.gameId,
                type: "users_list",
                betId: "",
                sessionBet: false,
              });
              setShowListOfUsers((prev) => !prev);
            }
          } else {
            setShowListOfUsers(true);
            setShowBets(false);
            getUserProfitLoss(item?.gameId);
            getBetReport({
              eventType: item?.eventType,
              matchId: item?.gameId,
              type: "users_list",
              betId: "",
              sessionBet: false,
            });
          }
        }}
        sx={{
          width: "100%",
          height: "50px",
          background: "white",
          display: "flex",
          padding: 0.1,
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
            {0 + index + Constants.pageLimit * (currentPage - 1)}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "65%", lg: "65%" },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: { lg: "center", xs: "center" },
            display: "flex",
            paddingX: "10px",
            background: "#0B4F26",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              marginTop: { xs: "5px", lg: "0" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "10px", lg: "15px" },
                color: "white",
                fontWeight: "600",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineClamp: 2,
                cursor: "pointer",
              }}
            >
              {item?.gameName}
            </Typography>
          </Box>
          {true && (
            <StyledImage
              src={ArrowDown}
              alt="arrow down"
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  selectedId?.id === item?.gameId && showListOfUsers
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          )}
        </Box>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            if (
              selectedId?.id === item?.gameId &&
              selectedId?.type === "all_bet"
            ) {
              setShowBets((prev) => !prev);
            } else {
              setShowListOfUsers(false);
              setShowBets(true);
              getBetReport({
                eventType: item?.eventType,
                matchId: item?.gameId,
                type: "all_bet",
                betId: "",
                sessionBet: false,
              });
              dispatch(
                getBetProfitLossCards({
                  gameId: item?.gameId,
                  searchId: userData?.id ? userData?.id : "",
                })
              );
            }
          }}
          sx={{
            background: item.rateProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
            paddingX: "2px",
            width: { xs: "25%", lg: "30%" },
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
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "12px", xs: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Rate {matchesMobile ? "P/L" : "Profit/Loss"}
            </Typography>
            <StyledImage
              src={item.rateProfitLoss > 0 ? ARROW_UP : ARROWDOWN}
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
              sx={{
                fontSize: { xs: "10px", lg: "14px" },
                fontWeight: "700",
                color: "white",
                lineHeight: "0.9",
              }}
            >
              {handleNumber(parseFloat(item?.rateProfitLoss || 0), color)}{" "}
              {`(${matchesMobile ? "TD(1%)" : "Total Deduction"}: 
                  ${formatToINR(Number(item?.totalDeduction || 0))})`}
            </Typography>
            <StyledImage
              src={ArrowDown}
              alt="arrow down"
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  selectedId?.id === item?.gameId &&
                  selectedId?.type === "all_bet" &&
                  showBets
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
      </Box>
      {selectedId?.id === item?.gameId && (
        <>
          {showListOfUsers && (
            <>
              <Box
                sx={{
                  width: { xs: "100%", lg: "99%" },
                  marginTop: { xs: ".25vh" },
                  marginLeft: { lg: "1%" },
                  display: "flex",
                  flexDirection: { lg: "row", xs: "column" },
                }}
              >
                <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      width: { xs: "100%", lg: "100%", md: "100%" },
                      overflow: "hidden",
                      marginY: { xs: ".2vh", lg: "1vh" },
                      padding: 0.2,
                    }}
                  >
                    {userProfitLoss?.map((profitLoss: any, index: any) => {
                      return (
                        <AllUserListSeparate
                          key={index}
                          item={profitLoss}
                          index={index + 1}
                          matchId={item?.gameId}
                          userId={item?.userId}
                          showListOfUsers={showListOfUsers}
                          getBetReport={getBetReport}
                          selectedId={selectedId}
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {selectedId?.type === "all_bet" && showBets && (
            <>
              <Box
                sx={{
                  width: { xs: "100%", lg: "96%" },
                  marginTop: { xs: ".25vh" },
                  marginLeft: { lg: "4%" },
                  display: "flex",
                  flexDirection: { lg: "row", xs: "column" },
                }}
              >
                <AllRateSeperate
                  betHistory={false}
                  count={betProfitLossListCards?.length}
                  allBetsData={betProfitLossListCards && betProfitLossListCards}
                  profit
                />
              </Box>
              <Box sx={{ width: { lg: "1vw", xs: 0 } }} />
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(RowComponentMatches);
