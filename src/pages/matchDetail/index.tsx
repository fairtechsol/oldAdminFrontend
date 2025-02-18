import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddNotificationModal from "../../components/matchDetail/Common/AddNotificationModal";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import UserProfitLoss from "../../components/matchDetail/Common/UserProfitLoss";
import CricketCasinoMarket from "../../components/matchDetail/CricketCasinoMarket";
import LiveBookmaker from "../../components/matchDetail/LiveBookmaker";
import MatchOdds from "../../components/matchDetail/MatchOdds";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import RunsBox from "../../components/matchDetail/SessionMarket/RunsBox";
import TournamentOdds from "../../components/matchDetail/TournamentOdds";
import { customSortBySessionMarketName, formatToINR } from "../../helper";
import { socket, socketService } from "../../socketManager";
import {
  AllBetDelete,
  amountupdate,
  // betDataFromSocket,
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
  const [mode, setMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
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

  const handleDeleteBet = (value: any) => {
    try {
      let payload: any = {
        matchId: state?.matchId,
        deleteReason: value,
        urlData: {},
      };
      selectedBetData.forEach((item: any) => {
        const { userId, betId, domain } = item;

        if (!payload.urlData[domain]) {
          payload.urlData[domain] = [];
        }

        payload.urlData[domain].push({
          userId,
          betId,
          placeBetId: item.id,
        });
      });
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
      if (event?.matchId === state?.matchId && event.isMatchDeclare) {
        if (location.pathname.includes("market_analysis")) {
          navigate(`${Constants.oldAdmin}market_analysis`);
        } else {
          navigate(`${Constants.oldAdmin}live_market`);
        }
      } else {
        getPlacedBets(
          `eq${state?.matchId}${state.userId ? `&userId=${state.userId}` : ""}`
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const matchDeleteBet = (event: any) => {
    try {
      setMode(false);
      if (event?.matchId === state?.matchId) {
        // dispatch(getMatchDetail(state?.matchId));
        // dispatch(getPlacedBets(state?.matchId));
        dispatch(updatePlacedbets(event));
        dispatch(updateTeamRatesOnDelete(event));
      }
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
        // dispatch(updateBalance(event));
        // dispatch(betDataFromSocket(event));
        dispatch(updateProfitLoss(event));
        dispatch(updateMaxLossForBet(event));
        dispatch(
          setCurrentOdd({
            matchId: event?.jobData?.placedBet?.matchId,
            betId: event?.jobData?.placedBet?.betId,
            odds: event?.jobData?.placedBet?.odds,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setMatchBetsPlaced = (event: any) => {
    try {
      if (event?.jobData?.matchId === state?.matchId) {
        dispatch(updateBetsPlaced(event?.jobData));
        // dispatch(updateBalance(event?.jobData));
        dispatch(updateTeamRates(event));
      }
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSessionDeleteBet = (event: any) => {
    try {
      // setMode(false);
      if (event?.matchId === state?.matchId) {
        dispatch(updatePlacedbets(event));
        dispatch(updateMaxLossForDeleteBet(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteReasonUpdate = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updatePlacedbetsDeleteReason(event));
      }
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
      }
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
        socketService.match.joinMatchRoom(
          state?.matchId,
          profileDetail?.roleName
        );
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
        }
        // dispatch(matchListReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail?.roleName, socket]);

  useEffect(() => {
    return () => {
      socketService.match.leaveMatchRoom(state?.matchId);
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
        socketService.match.leaveMatchRoom(state?.matchId);
        socketService.match.getMatchRatesOff(state?.matchId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [state]);

  let profitLossFromAnalysisForMarket = marketAnalysis?.betType?.match?.filter(
    (item: any) =>
      [
        "matchOdd",
        "bookmaker",
        "bookmaker2",
        "quickbookmaker1",
        "quickbookmaker2",
        "quickbookmaker3",
      ].includes(item?.marketType)
  );
  let profitLossFromAnalysisForTiedMarket = marketAnalysis?.betType?.match?.filter(
    (item: any) =>
      ["tiedMatch1", "tiedMatch2", "tiedMatch3"].includes(item?.marketType)
  );
  let profitLossFromAnalysisForCompleteMarket = marketAnalysis?.betType?.match?.filter(
    (item: any) =>
      ["completeMatch", "completeMatch1", "completeManual"].includes(
        item?.marketType
      )
  );

  useEffect(() => {
    return () => {
      dispatch(resetMarketAnalysys());
    };
  }, []);
  return (
    <>
      {visible && selectedBetData.length > 0 && (
        <>
          <AddNotificationModal
            value={""}
            title={"Add Remark"}
            visible={visible}
            loadingDeleteBet={loading}
            setVisible={setVisible}
            onDone={handleDeleteBet}
            onClick={(e: any) => {
              e.stopPropagation();
              setVisible(false);
              setMode(false);
            }}
          />
        </>
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
          {matchDetail?.matchOdd?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Match Odds"}
              minBet={formatToINR(Math.floor(matchDetail?.matchOdd?.minBet))}
              maxBet={formatToINR(Math.floor(matchDetail?.matchOdd?.maxBet))}
              liveData={matchDetail?.matchOdd}
              data={
                matchDetail?.matchOdd?.runners?.length > 0
                  ? matchDetail?.matchOdd?.runners
                  : []
              }
              showBox={matchDetail?.matchOdd?.activeStatus === "save"}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === matchDetail?.matchOdd?.id
                ) ?? profitLossFromAnalysisForMarket?.[0]
              }
            />
          )}
          {matchDetail?.bookmaker?.isActive && (
            <LiveBookmaker
              liveData={matchDetail?.bookmaker}
              currentMatch={matchDetail}
              minBet={formatToINR(Math.floor(matchDetail?.bookmaker?.minBet))}
              maxBet={formatToINR(Math.floor(matchDetail?.bookmaker?.maxBet))}
              data={
                matchDetail?.bookmaker?.runners?.length > 0
                  ? matchDetail?.bookmaker?.runners
                  : []
              }
              showBox={matchDetail?.bookmaker?.activeStatus === "save"}
              title={matchDetail?.bookmaker?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === matchDetail?.bookmaker?.id
                ) ?? profitLossFromAnalysisForMarket?.[0]
              }
            />
          )}
          {matchDetail?.other &&
            matchDetail?.other
              ?.filter(
                (item: any) => item?.activeStatus === "live" && item?.isActive
              )
              ?.map((match: any) => (
                <LiveBookmaker
                  currentMatch={matchDetail}
                  showBox={match?.activeStatus === "save"}
                  minBet={Math.floor(match?.minBet)}
                  maxBet={Math.floor(match?.maxBet)}
                  liveData={match}
                  data={match?.runners?.length > 0 ? match?.runners : []}
                  title={match?.name}
                  profitLossFromAnalysis={marketAnalysis?.betType?.match?.find(
                    (item: any) => item?.betId === match?.id
                  )}
                />
              ))}
          {matchDetail?.tournament &&
            matchDetail?.tournament
              ?.filter((items: any) => items.activeStatus === "live")
              ?.map((market: any, index: any) => {
                return (
                  <TournamentOdds
                    key={index}
                    currentMatch={matchDetail}
                    minBet={Math.floor(market?.minBet) || 0}
                    maxBet={Math.floor(market?.maxBet) || 0}
                    typeOfBet={market?.name}
                    liveData={market}
                    profitLossFromAnalysis={marketAnalysis?.betType?.match?.find(
                      (item: any) =>
                        item?.betId === (market?.parentBetId || market?.id)
                    )}
                  />
                );
              })}
          {matchDetail?.marketBookmaker2?.isActive && (
            <LiveBookmaker
              liveData={matchDetail?.marketBookmaker2}
              currentMatch={matchDetail}
              minBet={formatToINR(
                Math.floor(matchDetail?.marketBookmaker2?.minBet)
              )}
              maxBet={formatToINR(
                Math.floor(matchDetail?.marketBookmaker2?.maxBet)
              )}
              data={
                matchDetail?.marketBookmaker2?.runners?.length > 0
                  ? matchDetail?.marketBookmaker2?.runners
                  : []
              }
              showBox={matchDetail?.marketBookmaker2?.activeStatus === "save"}
              title={matchDetail?.marketBookmaker2?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.marketBookmaker2?.id
                ) ?? profitLossFromAnalysisForMarket?.[0]
              }
            />
          )}

          {matchDetail?.quickBookmaker
            ?.filter((item: any) => item?.isActive)
            .map((bookmaker: any, index: any) => {
              return (
                <MatchOdds
                  key={index}
                  currentMatch={matchDetail}
                  session={"manualBookMaker"}
                  data={bookmaker}
                  minBet={formatToINR(Math.floor(bookmaker?.minBet)) || 0}
                  maxBet={formatToINR(Math.floor(bookmaker?.maxBet)) || 0}
                  typeOfBet={bookmaker?.name}
                  matchOddsData={bookmaker}
                  liveData={bookmaker}
                  profitLossFromAnalysis={
                    marketAnalysis?.betType?.match?.find(
                      (item: any) => item?.betId === bookmaker?.id
                    ) ?? profitLossFromAnalysisForMarket?.[0]
                  }
                />
              );
            })}

          {matchDetail?.apiTideMatch2?.isActive && (
            <MatchOdds
              liveData={matchDetail?.apiTideMatch2}
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
              title={matchDetail?.apiTideMatch2?.name}
              minBet={formatToINR(
                Math.floor(matchDetail?.apiTideMatch2?.minBet)
              )}
              maxBet={formatToINR(
                Math.floor(matchDetail?.apiTideMatch2?.maxBet)
              )}
              data={
                matchDetail?.apiTideMatch2?.runners?.length > 0
                  ? matchDetail?.apiTideMatch2?.runners
                  : []
              }
              showBox={matchDetail?.apiTideMatch2?.activeStatus === "save"}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === matchDetail?.apiTideMatch2?.id
                ) ?? profitLossFromAnalysisForTiedMarket?.[0]
              }
            />
          )}
          {matchDetail?.manualTiedMatch?.isActive && matchesMobile && (
            <MatchOdds
              liveData={matchDetail?.manualTiedMatch}
              typeOfBet={"Manual Tied Match"}
              data={matchDetail?.manualTiedMatch}
              currentMatch={matchDetail}
              session={"manualBookMaker"}
              minBet={formatToINR(
                Math.floor(matchDetail?.manualTiedMatch?.minBet)
              )}
              maxBet={formatToINR(
                Math.floor(matchDetail?.manualTiedMatch?.maxBet)
              )}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.manualTiedMatch?.id
                ) ?? profitLossFromAnalysisForTiedMarket?.[0]
              }
            />
          )}
          {matchDetail?.marketCompleteMatch1?.isActive && (
            <MatchOdds
              liveData={matchDetail?.marketCompleteMatch1}
              currentMatch={matchDetail}
              typeOfBet={"Market Complete Match"}
              minBet={formatToINR(
                Math.floor(matchDetail?.marketCompleteMatch1?.minBet)
              )}
              maxBet={formatToINR(
                Math.floor(matchDetail?.marketCompleteMatch1?.maxBet)
              )}
              data={
                matchDetail?.marketCompleteMatch1?.runners?.length > 0
                  ? matchDetail?.marketCompleteMatch1?.runners
                  : []
              }
              showBox={
                matchDetail?.marketCompleteMatch1?.activeStatus === "save"
              }
              title={matchDetail?.marketCompleteMatch1?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.marketCompleteMatch1?.id
                ) ?? profitLossFromAnalysisForCompleteMarket?.[0]
              }
            />
          )}
          {matchDetail?.manualCompleteMatch?.isActive && matchesMobile && (
            <MatchOdds
              liveData={matchDetail?.manualCompleteMatch}
              typeOfBet={"Manual Complete Match"}
              data={matchDetail?.manualCompleteMatch}
              currentMatch={matchDetail}
              session={"manualBookMaker"}
              minBet={formatToINR(
                Math.floor(matchDetail?.manualCompleteMatch?.minBet)
              )}
              maxBet={formatToINR(
                Math.floor(matchDetail?.manualCompleteMatch?.maxBet)
              )}
              title={matchDetail?.manualCompleteMatch?.name}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.manualCompleteMatch?.id
                ) ?? profitLossFromAnalysisForCompleteMarket?.[0]
              }
            />
          )}

          <Box sx={{ width: "150px", height: "3px" }}></Box>
          {matchDetail?.manualSessionActive &&
            matchDetail?.sessionBettings?.filter(
              (item: any) => !JSON.parse(item).selectionId
            )?.length > 0 &&
            matchesMobile && (
              <SessionMarket
                title={"Quick Session Market"}
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
              ?.map(([key, value]: any) => {
                return (
                  <SessionMarket
                    key={key}
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
              ?.map((item: any) => {
                return (
                  <CricketCasinoMarket
                    key={item?.selectionId}
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
          {matchDetail?.apiTideMatch?.isActive && (
            <MatchOdds
              liveData={matchDetail?.apiTideMatch}
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
              title={matchDetail?.apiTideMatch?.name}
              minBet={formatToINR(
                Math.floor(matchDetail?.apiTideMatch?.minBet)
              )}
              maxBet={formatToINR(
                Math.floor(matchDetail?.apiTideMatch?.maxBet)
              )}
              data={
                matchDetail?.apiTideMatch?.runners?.length > 0
                  ? matchDetail?.apiTideMatch?.runners
                  : []
              }
              showBox={matchDetail?.apiTideMatch?.activeStatus === "save"}
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) => item?.betId === matchDetail?.apiTideMatch?.id
                ) ?? profitLossFromAnalysisForTiedMarket?.[0]
              }
            />
          )}
          {matchDetail?.marketCompleteMatch?.isActive && (
            <MatchOdds
              liveData={matchDetail?.marketCompleteMatch}
              currentMatch={matchDetail}
              typeOfBet={matchDetail?.marketCompleteMatch?.name}
              minBet={formatToINR(
                Math.floor(matchDetail?.marketCompleteMatch?.minBet)
              )}
              maxBet={formatToINR(
                Math.floor(matchDetail?.marketCompleteMatch?.maxBet)
              )}
              data={
                matchDetail?.marketCompleteMatch?.runners?.length > 0
                  ? matchDetail?.marketCompleteMatch?.runners
                  : []
              }
              showBox={
                matchDetail?.marketCompleteMatch?.activeStatus === "save"
              }
              profitLossFromAnalysis={
                marketAnalysis?.betType?.match?.find(
                  (item: any) =>
                    item?.betId === matchDetail?.marketCompleteMatch?.id
                ) ?? profitLossFromAnalysisForCompleteMarket?.[0]
              }
            />
          )}
          {/* {matchDetail?.apiSessionActive &&
            matchesMobile &&
            matchDetail?.apiSession?.length > 0 && (
              <SessionMarket
                title={"Session Market"}
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
                sessionData={matchDetail?.apiSession}
                min={formatToINR(Math.floor(matchDetail?.betFairSessionMinBet))}
                max={formatToINR(Math.floor(matchDetail?.betFairSessionMaxBet))}
              />
            )} */}
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
              single={"single"}
              title={"User Profit Loss"}
              // matchId={matchId}
              matchDetail={matchDetail}
            />
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            {mode && (
              <Box
                onClick={() => {
                  setMode(!mode);
                }}
                sx={{
                  width: "150px",
                  marginY: ".75%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  background: "#f1c550",
                  height: "35px",
                  border: "1.5px solid white",
                  display: "flex",
                  alignSelf: "flex-end",
                  cursor: "pointer",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "black",
                    marginRight: "10px",
                  }}
                >
                  {"Cancel"}
                </Typography>
              </Box>
            )}
            <Box sx={{ width: "2%" }}></Box>
          </Box>
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
                mode={mode}
                tag={false}
                setSelectedBetData={setSelectedBetData}
                selectedBetData={selectedBetData}
                role={state.roleName}
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
              maxWidth: "50%"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {/* {mode && <CancelButton />} */}
              <Box sx={{ width: "2%" }}></Box>
              <Box
                sx={{ width: "150px", marginY: ".75%", height: "15px" }}
              ></Box>
            </Box>
            {matchDetail?.manualTiedMatch?.isActive && (
              <MatchOdds
                liveData={matchDetail?.manualTiedMatch}
                typeOfBet={"Manual Tied Match"}
                currentMatch={matchDetail}
                session={"manualBookMaker"}
                data={matchDetail?.manualTiedMatch}
                minBet={formatToINR(
                  Math.floor(matchDetail?.manualTiedMatch?.minBet)
                )}
                maxBet={formatToINR(
                  Math.floor(matchDetail?.manualTiedMatch?.maxBet)
                )}
                title={matchDetail?.manualTiedMatch?.name}
              />
            )}
            {matchDetail?.marketCompleteMatch?.isActive && (
              <MatchOdds
                liveData={matchDetail?.marketCompleteMatch}
                typeOfBet={"Manual Complete Match"}
                currentMatch={matchDetail}
                session={"manualBookMaker"}
                data={matchDetail?.marketCompleteMatch}
                minBet={formatToINR(
                  Math.floor(matchDetail?.marketCompleteMatch?.minBet)
                )}
                maxBet={formatToINR(
                  Math.floor(matchDetail?.marketCompleteMatch?.maxBet)
                )}
                title={matchDetail?.marketCompleteMatch?.name}
              />
            )}
            <Box sx={{ width: "150px", height: "3px" }}></Box>
            {matchDetail?.manualSessionActive &&
              matchDetail?.sessionBettings?.filter(
                (item: any) => !JSON.parse(item).selectionId
              )?.length > 0 && (
                <SessionMarket
                  title={"Quick Session Market"}
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
                  sessionExposer={"0.00"}
                  sessionData={matchDetail?.sessionBettings?.filter(
                    (item: any) => !JSON.parse(item).selectionId
                  )}
                  min={formatToINR(matchDetail?.betFairSessionMinBet) || 0}
                  max={formatToINR(matchDetail?.betFairSessionMaxBet) || 0}
                  type="session"
                />
              )}

            {/* {matchDetail?.apiSessionActive &&
              matchDetail?.apiSession?.length > 0 && (
                <SessionMarket
                  title={"Session Market"}
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
                  sessionExposer={"0.00"}
                  sessionData={matchDetail?.apiSession}
                  max={formatToINR(
                    Math.floor(matchDetail?.betFairSessionMaxBet)
                  )}
                  min={formatToINR(
                    Math.floor(matchDetail?.betFairSessionMinBet)
                  )}
                />
              )} */}
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
              single={"single"}
              title={"User Profit Loss"}
              matchDetail={matchDetail}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default MatchDetail;
