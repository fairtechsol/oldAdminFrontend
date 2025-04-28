import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddNotificationModal from "../../components/matchDetail/Common/AddNotificationModal";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import UserProfitLoss from "../../components/matchDetail/Common/UserProfitLoss";
import CricketCasinoMarket from "../../components/matchDetail/CricketCasinoMarket";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import RunsBox from "../../components/matchDetail/SessionMarket/RunsBox";
import TournamentOdds from "../../components/matchDetail/TournamentOdds";
import { customSortBySessionMarketName, formatToINR } from "../../helper";
import { matchService, socket, socketService } from "../../socketManager";
import {
  AllBetDelete,
  amountupdate,
  getMatchDetail,
  getMatchDetailMarketAnalysis,
  getPlacedBets,
  getUserProfitLoss,
  removeRunAmount,
  resetBetSessionProfitLossGraph,
  resetMarketAnalysys,
  resetUserProfitLoss,
  setCurrentOdd,
  updateBetsPlaced,
  updateMatchRates,
  updateMaxLossForBet,
  updateMaxLossForBetOnUndeclare,
  updateMaxLossForDeleteBet,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
  updateProfitLoss,
  updateTeamRates,
  updateTeamRatesOnDelete,
  updateTeamRatesOnMarketUndeclare,
} from "../../store/actions/match/matchAction";
import { resetSessionProfitLoss } from "../../store/actions/reports";
import { AppDispatch, RootState } from "../../store/store";
import { Constants, sessionBettingType } from "../../utils/Constants";

const MatchDetail = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [visible, setVisible] = useState(false);
  const { state } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { matchDetail, success } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { marketAnalysis } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { placedBets, loading, sessionProLoss } = useSelector(
    (state: RootState) => state.match.bets
  );

  const { currentOdd } = useSelector(
    (state: RootState) => state.match.matchList
  );

  useEffect(() => {
    if (state?.matchId) {
      matchService.connect([state?.matchId], profileDetail?.roleName);
    }
    return () => {
      matchService.disconnect();
    };
  }, [state?.matchId]);

  const handleDeleteBet = (value: any) => {
    try {
      let payload: any = {
        matchId: state?.matchId,
        deleteReason: value,
        urlData: {},
      };

      dispatch(AllBetDelete(payload));
    } catch (e) {
      console.log(e);
    }
  };

  const updateMatchDetailToRedux = (event: any) => {
    try {
      if (state?.matchId === event?.id) {
        dispatch(updateMatchRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };
  const matchResultDeclared = (event: any) => {
    try {
      if (event?.matchId !== state?.matchId) return;

      if (event?.isMatchDeclare) {
        navigate(
          location.pathname.split("/")[2] === "live_market" ||
            location.pathname.split("/")[2] === "market_analysis"
            ? `${Constants.oldAdmin}${location.pathname.split("/")[2]}`
            : `${Constants.oldAdmin}${location.pathname.split("/")[2]}/${
                state.matchType || event?.gameType
              }`
        );
      } else {
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${
              state.userId ? `&userId=${state.userId}` : ""
            }`
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const matchDeleteBet = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updatePlacedbets(event));
        dispatch(updateTeamRatesOnDelete(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };
  const setSessionBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.placedBet?.matchId === state?.matchId) {
        dispatch(
          updateBetsPlaced({
            newBet: event?.jobData?.placedBet,
            userName: event?.jobData?.betPlaceObject?.betPlacedData?.userName,
            myStake: event?.jobData?.betPlaceObject?.myStack,
          })
        );

        dispatch(updateProfitLoss(event));
        dispatch(updateMaxLossForBet(event));
        dispatch(
          setCurrentOdd({
            matchId: event?.jobData?.placedBet?.matchId,
            betId: event?.jobData?.placedBet?.betId,
            odds: event?.jobData?.placedBet?.odds,
          })
        );
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === state?.matchId) {
        dispatch(updateBetsPlaced(event?.jobData));
        dispatch(updateTeamRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };
  const handleSessionResultDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(removeRunAmount(event));
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${
              state.userId ? `&userId=${state.userId}` : ""
            }`
          )
        );
        dispatch(amountupdate(event));
      } else return;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSessionDeleteBet = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updatePlacedbets(event));
        dispatch(updateMaxLossForDeleteBet(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteReasonUpdate = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updatePlacedbetsDeleteReason(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updateMaxLossForBetOnUndeclare(event));
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${
              state.userId ? `&userId=${state.userId}` : ""
            }`
          )
        );
      } else return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarketResultUndeclared = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        if (event?.betType) {
          dispatch(updateTeamRatesOnMarketUndeclare(event));
        } else {
          dispatch(getMatchDetail(state?.matchId));
          dispatch(getUserProfitLoss(state?.matchId));
        }
        dispatch(
          getPlacedBets(
            `eq${state?.matchId}${
              state.userId ? `&userId=${state.userId}` : ""
            }`
          )
        );
      } else return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (state?.matchId) {
      dispatch(getMatchDetail(state?.matchId));
      dispatch(getUserProfitLoss(state?.matchId));
      dispatch(resetSessionProfitLoss());
      dispatch(resetBetSessionProfitLossGraph());
      dispatch(
        getPlacedBets(
          `eq${state?.matchId}${state.userId ? `&userId=${state.userId}` : ""}`
        )
      );
    }
    if (state?.userId) {
      dispatch(
        getMatchDetailMarketAnalysis({
          matchId: state?.matchId,
          userId: state?.userId,
        })
      );
    }
  }, [state?.matchId, state?.userId]);

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName && socket) {
        socketService.match.getMatchRatesOff(state?.matchId);
        socketService.match.userSessionBetPlacedOff();
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.sessionDeleteBetOff();
        socketService.match.sessionResultOff();
        socketService.match.sessionResultUnDeclareOff();
        socketService.match.updateDeleteReasonOff();
        socketService.match.joinMatchRoom(state?.matchId);
        socketService.match.getMatchRates(
          state?.matchId,
          updateMatchDetailToRedux
        );
        if (!state.userId) {
          socketService.match.matchResultDeclared(matchResultDeclared);
          socketService.match.declaredMatchResultAllUser(matchResultDeclared);
          socketService.match.matchDeleteBet(matchDeleteBet);
          socketService.match.sessionDeleteBet(handleSessionDeleteBet);
          socketService.match.userSessionBetPlaced(setSessionBetsPlaced);
          socketService.match.userMatchBetPlaced(setMatchBetsPlaced);
          socketService.match.sessionResult(handleSessionResultDeclare);
          socketService.match.sessionResultUnDeclare(
            handleSessionResultUnDeclare
          );
          socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
          socketService.match.matchResultUnDeclared(
            handleMarketResultUndeclared
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail?.roleName, socket]);

  useEffect(() => {
    return () => {
      socketService.match.getMatchRatesOff(state?.matchId);
      socketService.match.userSessionBetPlacedOff();
      socketService.match.userMatchBetPlacedOff();
      socketService.match.matchResultDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.matchDeleteBetOff();
      socketService.match.sessionDeleteBetOff();
      socketService.match.sessionResultOff();
      socketService.match.sessionResultUnDeclareOff();
      socketService.match.updateDeleteReasonOff();
      dispatch(resetUserProfitLoss());
      dispatch(resetBetSessionProfitLossGraph());
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(getMatchDetail(state?.matchId));
          dispatch(getUserProfitLoss(state?.matchId));
          dispatch(
            getPlacedBets(
              `eq${state?.matchId}${
                state.userId ? `&userId=${state.userId}` : ""
              }`
            )
          );
        }
        if (state?.userId) {
          dispatch(
            getMatchDetailMarketAnalysis({
              matchId: state?.matchId,
              userId: state?.userId,
            })
          );
        }
      } else if (document.visibilityState === "hidden") {
        socketService.match.getMatchRatesOff(state?.matchId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [state]);

  useEffect(() => {
    return () => {
      dispatch(resetMarketAnalysys());
    };
  }, []);
  return (
    <>
      {visible && (
        <AddNotificationModal
          value=""
          title="Add Remark"
          visible={visible}
          loadingDeleteBet={loading}
          setVisible={setVisible}
          onDone={handleDeleteBet}
          onClick={(e: any) => {
            e.stopPropagation();
            setVisible(false);
          }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          flex: 1,
          height: "100%",
          marginX: "0.5%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            minHeight: "100px",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "700",
              alignSelf: "start",
            }}
          >
            {matchDetail?.title}
          </Typography>
          {matchDetail?.tournament &&
            matchDetail?.tournament
              ?.filter(
                (items: any) =>
                  items.activeStatus === "live" &&
                  !["completed_match", "tied_match"].includes(
                    items?.name?.toLowerCase()
                  )
              )
              ?.sort((a: any, b: any) => a.sNo - b.sNo)
              ?.map((market: any, index: any) => {
                return (
                  <TournamentOdds
                    key={index}
                    currentMatch={matchDetail}
                    minBet={Math.floor(market?.minBet) || 0}
                    maxBet={Math.floor(market?.maxBet) || 0}
                    title={market?.name}
                    liveData={market}
                    profitLossFromAnalysis={marketAnalysis?.betType?.match?.find(
                      (item: any) =>
                        item?.betId === (market?.parentBetId || market?.id)
                    )}
                  />
                );
              })}

          <Box sx={{ width: "150px", height: "3px" }} />
          {matchDetail?.manualSessionActive &&
            matchDetail?.sessionBettings?.filter(
              (item: any) =>
                !JSON.parse(item).selectionId &&
                JSON.parse(item)?.activeStatus === "live"
            )?.length > 0 &&
            matchesMobile && (
              <SessionMarket
                title="Quick Session Market"
                allBetsData={
                  matchDetail?.profitLossDataSession
                    ? Array.from(
                        matchDetail?.profitLossDataSession?.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.betId)
                              ? acc
                              : acc.add(obj.betId) && acc,
                          new Set()
                        ),
                        (id) =>
                          matchDetail?.profitLossDataSession?.find(
                            (obj: any) => obj.betId === id
                          )
                      )
                    : []
                }
                currentMatch={matchDetail}
                sessionData={matchDetail?.sessionBettings?.filter(
                  (item: any) => !JSON.parse(item).selectionId
                )}
                min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                type="session"
              />
            )}
          {matchDetail?.apiSessionActive &&
            Object.entries(matchDetail?.apiSession || {})
              ?.filter(
                ([key, value]: any) =>
                  value?.section?.length > 0 &&
                  key != sessionBettingType.cricketCasino
              )
              ?.slice()
              ?.sort(customSortBySessionMarketName)
              ?.map(([key, value]: any, index: number) => {
                return (
                  <SessionMarket
                    key={index}
                    title={value?.mname || key}
                    allBetsData={
                      matchDetail?.profitLossDataSession
                        ? Array.from(
                            matchDetail?.profitLossDataSession?.reduce(
                              (acc: any, obj: any) =>
                                acc.has(obj.betId)
                                  ? acc
                                  : acc.add(obj.betId) && acc,
                              new Set()
                            ),
                            (id) =>
                              matchDetail?.profitLossDataSession?.find(
                                (obj: any) => obj.betId === id
                              )
                          )
                        : []
                    }
                    currentMatch={matchDetail}
                    sessionData={value?.section}
                    min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                    max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                    type={key || value?.gtype}
                  />
                );
              })}
          {matchDetail?.apiSessionActive &&
            (matchDetail?.apiSession?.cricketCasino?.section || [])
              ?.filter(
                (item: any) =>
                  !(
                    item?.activeStatus === "unSave" ||
                    item?.activeStatus === "result"
                  )
              )
              ?.map((item: any, index: number) => {
                return (
                  <CricketCasinoMarket
                    key={index}
                    title={item?.RunnerName}
                    allBetsData={
                      matchDetail?.profitLossDataSession
                        ? Array.from(
                            matchDetail?.profitLossDataSession?.reduce(
                              (acc: any, obj: any) =>
                                acc.has(obj.betId)
                                  ? acc
                                  : acc.add(obj.betId) && acc,
                              new Set()
                            ),
                            (id) =>
                              matchDetail?.profitLossDataSession?.find(
                                (obj: any) => obj.betId === id
                              )
                          )
                        : []
                    }
                    currentMatch={matchDetail}
                    sessionData={item}
                    min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                    max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                    type={sessionBettingType.cricketCasino}
                  />
                );
              })}
          {matchDetail?.tournament &&
            matchDetail?.tournament
              ?.filter(
                (items: any) =>
                  items.activeStatus === "live" &&
                  ["completed_match", "tied_match"].includes(
                    items?.name?.toLowerCase()
                  )
              )
              ?.sort((a: any, b: any) => a.sNo - b.sNo)
              ?.map((market: any, index: any) => {
                return (
                  <TournamentOdds
                    key={index}
                    currentMatch={matchDetail}
                    minBet={Math.floor(market?.minBet) || 0}
                    maxBet={Math.floor(market?.maxBet) || 0}
                    title={market?.name}
                    liveData={market}
                    profitLossFromAnalysis={marketAnalysis?.betType?.match?.find(
                      (item: any) =>
                        item?.betId === (market?.parentBetId || market?.id)
                    )}
                  />
                );
              })}
          {sessionProLoss?.length > 0 && matchesMobile && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "1px",
                rowGap: "5px",
                height: "440px",
                overflow: "scroll",
                marginTop: "1.25vw",
              }}
            >
              {sessionProLoss.map((v: any) => {
                return (
                  <RunsBox
                    key={v?.id}
                    item={v}
                    currentOdd={currentOdd?.betId === v?.id ? currentOdd : null}
                  />
                );
              })}
            </Box>
          )}

          {matchesMobile && (
            <UserProfitLoss
              single="single"
              title="User Profit Loss"
              matchDetail={matchDetail}
            />
          )}
          {placedBets?.length > 0 && (
            <Box sx={{ mt: 0 }}>
              <FullAllBets
                IObets={
                  placedBets.length > 0
                    ? Array.from(
                        placedBets.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                          new Set()
                        ),
                        (id) => placedBets.find((obj: any) => obj.id === id)
                      )
                    : []
                }
                tag={false}
              />
            </Box>
          )}
        </Box>
        {!matchesMobile && <Box sx={{ width: "20px" }} />}
        {!matchesMobile && (
          <Box
            sx={{
              flex: 1,
              flexDirection: "column",
              display: "flex",
              minHeight: "100px",
              maxWidth: "50%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Box sx={{ width: "150px", marginY: ".75%", height: "15px" }} />
            </Box>
            <Box sx={{ width: "150px", height: "3px" }} />
            {matchDetail?.manualSessionActive &&
              matchDetail?.sessionBettings?.filter(
                (item: any) =>
                  !JSON.parse(item).selectionId &&
                  JSON.parse(item)?.activeStatus === "live"
              )?.length > 0 && (
                <SessionMarket
                  title="Quick Session Market"
                  allBetsData={
                    matchDetail?.profitLossDataSession
                      ? Array.from(
                          matchDetail?.profitLossDataSession?.reduce(
                            (acc: any, obj: any) =>
                              acc.has(obj.betId)
                                ? acc
                                : acc.add(obj.betId) && acc,
                            new Set()
                          ),
                          (id) =>
                            matchDetail?.profitLossDataSession?.find(
                              (obj: any) => obj.betId === id
                            )
                        )
                      : []
                  }
                  currentMatch={matchDetail}
                  sessionExposer="0.00"
                  sessionData={matchDetail?.sessionBettings?.filter(
                    (item: any) => !JSON.parse(item).selectionId
                  )}
                  min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                  max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                  type="session"
                />
              )}

            {sessionProLoss?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "1px",
                  rowGap: "5px",
                  height: "524px",
                  overflow: "scroll",
                  marginTop: "1.25vw",
                }}
              >
                {sessionProLoss?.map((v: any) => {
                  return (
                    <RunsBox
                      key={v?.id}
                      item={v}
                      currentOdd={
                        currentOdd?.betId === v?.id ? currentOdd : null
                      }
                    />
                  );
                })}
              </Box>
            )}
            <UserProfitLoss
              single="single"
              title="User Profit Loss"
              matchDetail={matchDetail}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default MatchDetail;
