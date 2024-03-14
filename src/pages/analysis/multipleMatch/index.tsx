import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FullAllBets from "../../../components/matchDetail/Common/FullAllBets";
import UserProfitLoss from "../../../components/matchDetail/Common/UserProfitLoss";
import LiveBookmaker from "../../../components/matchDetail/LiveBookmaker";
import MatchOdds from "../../../components/matchDetail/MatchOdds";
import SessionMarket from "../../../components/matchDetail/SessionMarket";
import RunsBox from "../../../components/matchDetail/SessionMarket/RunsBox";
import { socketService } from "../../../socketManager";
import {
  analysisListReset,
  getPlacedBets,
  removeRunAmount,
  updateBetsPlaced,
  updateMultipleMatchDetail,
  updatePlacedbets,
  updateProfitLoss,
} from "../../../store/actions/match/matchAction";
import {
  getMultipleMatchDetail,
  updateBetDataOnDeclareOfMultipleMatch,
  updateMaxLossForBetForMultipleMatch,
  updateMaxLossForBetOnUndeclareForMultipleMatch,
  updateMaxLossForDeleteBetForMultiMatch,
  updateTeamRatesOfMultipleMatch,
  updateTeamRatesOnDeleteForMultiMatch,
} from "../../../store/actions/match/multipleMatchAction";
import { resetSessionProfitLoss } from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";
import { formatToINR } from "../../../helper";

const MultipleMatch = ({}) => {
  const theme = useTheme();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const [storedMatchData, setStoredMatchData] = useState({
    matchId: "",
    teamA: "",
    teamB: "",
    teamC: "",
  });
  const [showUserProfitLoss, setShowUserProfitLoss] = useState(false);
  const [selectedBetData, setSelectedBetData] = useState([]);
  const [currentOdds] = useState<any>(null);
  const { multipleMatchDetail, success } = useSelector(
    (state: RootState) => state.match.analysisList
  );

  const { placedBets, sessionProLoss } = useSelector(
    (state: RootState) => state.match.bets
  );

  const sessionBets: any = [];

  const updateMatchDetailToRedux = (event: any) => {
    dispatch(updateMultipleMatchDetail(event));
  };

  const setMultiSessionBetsPlaced = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.jobData?.placedBet?.matchId)) {
        dispatch(
          updateBetsPlaced({
            newBet: {
              ...event?.jobData?.placedBet,
            },
            userName: event?.jobData?.betPlaceObject?.betPlacedData?.userName,
            myStake: event?.jobData?.betPlaceObject?.myStack,
          })
        );
        dispatch(updateProfitLoss(event));
        dispatch(updateMaxLossForBetForMultipleMatch(event));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setMultiMatchBetsPlaced = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.jobData?.newBet?.matchId)) {
        dispatch(
          updateBetsPlaced({
            newBet: {
              ...event?.jobData?.newBet,
              userId: event?.jobData?.userId,
            },
            userName: event?.jobData?.userName,
            myStake: event?.jobData?.myStake,
          })
        );
        dispatch(updateTeamRatesOfMultipleMatch(event));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const matchMultiResultDeclared = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        navigate(`/admin/market_analysis`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultiMatchSessionResultDeclare = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        dispatch(
          updateBetDataOnDeclareOfMultipleMatch({
            betId: event?.betId,
            matchId: event?.matchId,
          })
        );
        dispatch(removeRunAmount(event));
        dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultiMatchSessionResultUnDeclare = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        dispatch(updateMaxLossForBetOnUndeclareForMultipleMatch(event));
        dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultiMatchDeleteBet = (event: any) => {
    if (state?.matchIds.includes(event?.matchId)) {
      dispatch(updatePlacedbets(event));
      dispatch(updateTeamRatesOnDeleteForMultiMatch(event));
    }
  };
  const handleMultiMatchSessionDeleteBet = (event: any) => {
    if (state?.matchIds.includes(event?.matchId)) {
      dispatch(updatePlacedbets(event));
      dispatch(updateMaxLossForDeleteBetForMultiMatch(event));
    }
  };

  const handleClicked = (item: any) => {
    try {
      setStoredMatchData(() => {
        return {
          matchId: item?.matchId,
          teamA: item?.teamA,
          teamB: item?.teamB,
          teamC: item?.teamC,
        };
      });
      setShowUserProfitLoss(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (state?.matchIds) {
        dispatch(getMultipleMatchDetail(state?.matchIds));
        dispatch(resetSessionProfitLoss());
        dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
      }
    } catch (error) {
      console.log(error);
    }
  }, [state?.matchIds]);

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName) {
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRatesOff(item, updateMatchDetailToRedux);
        });
        socketService.match.userSessionBetPlacedOff(setMultiSessionBetsPlaced);
        socketService.match.userMatchBetPlacedOff(setMultiMatchBetsPlaced);
        socketService.match.matchResultDeclaredOff(matchMultiResultDeclared);
        socketService.match.matchDeleteBetOff(handleMultiMatchDeleteBet);
        socketService.match.sessionDeleteBetOff(
          handleMultiMatchSessionDeleteBet
        );
        socketService.match.sessionResultOff(
          handleMultiMatchSessionResultDeclare
        );
        socketService.match.sessionResultUnDeclareOff(
          handleMultiMatchSessionResultUnDeclare
        );
        state?.matchIds?.map((item: any) => {
          socketService.match.joinMatchRoom(item, profileDetail?.roleName);
        });
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRates(item, updateMatchDetailToRedux);
        });
        socketService.match.userSessionBetPlaced(setMultiSessionBetsPlaced);
        socketService.match.userMatchBetPlaced(setMultiMatchBetsPlaced);
        socketService.match.matchResultDeclared(matchMultiResultDeclared);
        socketService.match.matchDeleteBet(handleMultiMatchDeleteBet);
        socketService.match.sessionDeleteBet(handleMultiMatchSessionDeleteBet);
        socketService.match.sessionResult(handleMultiMatchSessionResultDeclare);
        socketService.match.sessionResultUnDeclare(
          handleMultiMatchSessionResultUnDeclare
        );
        dispatch(analysisListReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail]);

  useEffect(() => {
    return () => {
      state?.matchIds?.map((item: any) => {
        socketService.match.leaveMatchRoom(item);
      });
      state?.matchIds?.map((item: any) => {
        socketService.match.getMatchRatesOff(item, updateMatchDetailToRedux);
      });
      socketService.match.userSessionBetPlacedOff(setMultiSessionBetsPlaced);
      socketService.match.userMatchBetPlacedOff(setMultiMatchBetsPlaced);
      socketService.match.matchResultDeclaredOff(matchMultiResultDeclared);
      socketService.match.matchDeleteBetOff(handleMultiMatchDeleteBet);
      socketService.match.sessionDeleteBetOff(handleMultiMatchSessionDeleteBet);
      socketService.match.sessionResultOff(
        handleMultiMatchSessionResultDeclare
      );
      socketService.match.sessionResultUnDeclareOff(
        handleMultiMatchSessionResultUnDeclare
      );
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchIds) {
          dispatch(getMultipleMatchDetail(state?.matchIds));
          dispatch(resetSessionProfitLoss());
          dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
        }
      } else if (document.visibilityState === "hidden") {
        state?.matchIds?.map((item: any) => {
          socketService.match.leaveMatchRoom(item);
        });
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRatesOff(item, updateMatchDetailToRedux);
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {state?.match == 3 && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { matchesMobile: "column", lg: "row" },
              flex: 1,
              height: "100%",
              marginLeft: "0.5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {multipleMatchDetail?.length > 0 &&
                multipleMatchDetail?.map((item: any, index: any) => {
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );

                  const QuicksessionData = item?.sessionBettings
                    ?.filter((item: any) => !JSON.parse(item).selectionId)
                    ?.map((item: any) => {
                      return item;
                    });

                  return (
                    <>
                      {index === 0 ? (
                        <>
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              width: "100%",
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
                                  width: "100%",
                                  color: "white",
                                  fontWeight: "700",
                                  paddingTop: "2%",
                                  alignSelf: "start",
                                }}
                              >
                                {item?.teamA} V/S {item?.teamB}
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleClicked({
                                      matchId: item?.id,
                                      teamA: item?.teamA,
                                      teamB: item?.teamB,
                                      teamC: item?.teamC,
                                    });
                                  }}
                                  sx={{
                                    backgroundColor: "#F8C851",
                                    fontSize: "10px",
                                    color: "black",
                                    fontWeight: "700",
                                    float: "right",
                                    border: " 1px solid white",
                                    marginBottom: "2px",
                                    alignSelf: "start",
                                    "&:hover": {
                                      backgroundColor: "#F8C851",
                                    },
                                  }}
                                >
                                  User Profit Loss
                                </Button>
                              </Typography>
                              {item?.matchOdd?.isActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  matchOddsLive={item?.matchOdd}
                                  minBet={formatToINR(
                                    Math.floor(item?.matchOdd?.minBet)
                                  )}
                                  maxBet={formatToINR(
                                    Math.floor(item?.matchOdd?.maxBet)
                                  )}
                                  data={
                                    item?.matchOdd?.runners?.length > 0
                                      ? item?.matchOdd?.runners
                                      : []
                                  }
                                  typeOfBet={"Match Odds"}
                                />
                              )}
                              {item?.marketCompleteMatch?.isActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  typeOfBet={"Market Complete Match"}
                                  minBet={formatToINR(
                                    Math.floor(
                                      item?.marketCompleteMatch?.minBet
                                    )
                                  )}
                                  maxBet={formatToINR(
                                    Math.floor(
                                      item?.marketCompleteMatch?.maxBet
                                    )
                                  )}
                                  data={
                                    item?.marketCompleteMatch?.runners?.length >
                                    0
                                      ? item?.marketCompleteMatch?.runners
                                      : []
                                  }
                                />
                              )}
                              {item?.apiTideMatch?.isActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  typeOfBet={"Tied Match"}
                                  minBet={formatToINR(
                                    Math.floor(item?.apiTideMatch?.minBet)
                                  )}
                                  maxBet={formatToINR(
                                    Math.floor(item?.apiTideMatch?.maxBet)
                                  )}
                                  data={
                                    item?.apiTideMatch?.runners?.length > 0
                                      ? item?.apiTideMatch?.runners
                                      : []
                                  }
                                />
                              )}
                              {item?.quickBookmaker
                                ?.filter((item: any) => item?.isActive === true)
                                .map((bookmaker: any) => {
                                  return (
                                    <MatchOdds
                                      currentMatch={item}
                                      session={"manualBookMaker"}
                                      data={bookmaker}
                                      minBet={
                                        formatToINR(bookmaker?.minBet) || 0
                                      }
                                      maxBet={
                                        formatToINR(bookmaker?.maxBet) || 0
                                      }
                                      typeOfBet={bookmaker?.name}
                                      matchOddsData={bookmaker}
                                    />
                                  );
                                })}
                              {item?.bookmaker?.isActive && (
                                <LiveBookmaker
                                  currentMatch={item}
                                  minBet={formatToINR(
                                    Math.floor(item?.bookmaker?.minBet)
                                  )}
                                  maxBet={formatToINR(
                                    Math.floor(item?.bookmaker?.maxBet)
                                  )}
                                  bookmakerLive={item?.bookmaker}
                                  data={
                                    item?.bookmaker?.runners?.length > 0
                                      ? item?.bookmaker?.runners
                                      : []
                                  }
                                />
                              )}
                              {item?.manualTiedMatch?.isActive && (
                                <MatchOdds
                                  typeOfBet={"Manual Tied Match"}
                                  currentMatch={item}
                                  data={item?.manualTiedMatch}
                                  session={"manualBookMaker"}
                                  minBet={formatToINR(
                                    Math.floor(item?.manualTiedMatch?.minBet)
                                  )}
                                  maxBet={formatToINR(
                                    Math.floor(item?.manualTiedMatch?.maxBet)
                                  )}
                                />
                              )}

                              {item?.manualSessionActive && (
                                <SessionMarket
                                  title={"Quick Session Market"}
                                  allBetsData={
                                    item?.profitLossDataSession
                                      ? Array.from(
                                          item?.profitLossDataSession?.reduce(
                                            (acc: any, obj: any) =>
                                              acc.has(obj.id)
                                                ? acc
                                                : acc.add(obj.id) && acc,
                                            new Set()
                                          ),
                                          (id) =>
                                            item?.profitLossDataSession?.find(
                                              (obj: any) => obj.id === id
                                            )
                                        )
                                      : []
                                  }
                                  // match={"multiple"}
                                  //   currentOdds={currentOdds}
                                  sessionData={QuicksessionData}
                                  currentMatch={item}
                                  data={[]}
                                  sessionOffline={item?.sessionOffline}
                                  //   sessionExposer={
                                  //     manualSessionHttp?.sessionExposure
                                  //   }
                                  sessionBets={sessionBetsData?.length}
                                  //   setPopData={setPopData}
                                  //   popData={popData}
                                  //   sessionData={
                                  //     manualSessionHttp?.manualSessionRate
                                  //   }
                                  max={formatToINR(item?.betFairSessionMaxBet)}
                                  min={formatToINR(item?.betFairSessionMinBet)}
                                />
                              )}
                              {item?.apiSessionActive && (
                                <SessionMarket
                                  title={"Session Market"}
                                  allBetsData={
                                    item?.profitLossDataSession
                                      ? Array.from(
                                          item?.profitLossDataSession?.reduce(
                                            (acc: any, obj: any) =>
                                              acc.has(obj.id)
                                                ? acc
                                                : acc.add(obj.id) && acc,
                                            new Set()
                                          ),
                                          (id) =>
                                            item?.profitLossDataSession?.find(
                                              (obj: any) => obj.id === id
                                            )
                                        )
                                      : []
                                  }
                                  match={"multiple"}
                                  //   currentOdds={currentOdds}
                                  sessionData={item?.apiSession}
                                  currentMatch={item}
                                  data={[]}
                                  sessionOffline={item?.sessionOffline}
                                  //   sessionExposer={
                                  //     manualSessionHttp?.sessionExposure
                                  //   }
                                  sessionBets={sessionBetsData?.length}
                                  //   setPopData={setPopData}
                                  //   popData={popData}
                                  max={formatToINR(item?.betFairSessionMaxBet)}
                                  min={formatToINR(item?.betFairSessionMinBet)}
                                />
                              )}
                              {sessionProLoss?.length > 0 &&
                                sessionProLoss.filter(
                                  (runAmount: any) =>
                                    runAmount?.matchId === item?.id
                                ).length > 0 && (
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
                                    {sessionProLoss
                                      .filter(
                                        (runAmount: any) =>
                                          runAmount?.matchId === item?.id
                                      )
                                      .map((v: any) => {
                                        return (
                                          <RunsBox
                                            key={v?.id}
                                            item={v}
                                            currentOdd={
                                              currentOdds?.betId === v?.id
                                                ? currentOdds
                                                : null
                                            }
                                          />
                                        );
                                      })}
                                  </Box>
                                )}
                            </Box>
                            <Box
                              sx={{
                                flex: 1,
                                flexDirection: "column",
                                display: "flex",
                                minHeight: "100px",
                                marginX: "0.5%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "150px",
                                    marginY: ".75%",
                                    height: "35px",
                                  }}
                                ></Box>
                              </Box>
                              <FullAllBets
                                tag={false}
                                IObets={Array.from(
                                  placedBets.reduce(
                                    (acc: any, obj: any) =>
                                      acc.has(obj.id)
                                        ? acc
                                        : acc.add(obj.id) && acc,
                                    new Set()
                                  ),
                                  (id) =>
                                    placedBets.find((obj: any) => obj.id === id)
                                ).filter(
                                  (bet: any) =>
                                    (bet?.match?.id || bet?.matchId) ===
                                    item?.id
                                )}
                                setSelectedBetData={setSelectedBetData}
                                selectedBetData={selectedBetData}
                              />
                            </Box>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box
                            key={index}
                            sx={{
                              maxWidth: matchesMobile ? "99%" : "49.5%",
                              flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                              marginRight: "0.5%",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "white",
                                fontWeight: "700",
                                paddingTop: "0.7%",
                                alignSelf: "start",
                              }}
                            >
                              {item?.teamA} V/S {item?.teamB}
                              <Button
                                onClick={() =>
                                  handleClicked({
                                    matchId: item?.id,
                                    teamA: item?.teamA,
                                    teamB: item?.teamB,
                                    teamC: item?.teamC,
                                  })
                                }
                                sx={{
                                  backgroundColor: "#F8C851",
                                  fontSize: "10px",
                                  color: "black",
                                  fontWeight: "700",
                                  float: "right",
                                  border: " 1px solid white",
                                  marginBottom: "2px",
                                  alignSelf: "start",
                                  "&:hover": { backgroundColor: "#F8C851" },
                                }}
                              >
                                User Profit Loss
                              </Button>
                            </Typography>
                            {item?.matchOdd && (
                              <MatchOdds
                                currentMatch={item}
                                // matchOddsLive={matchOddsLive}
                                minBet={formatToINR(
                                  Math.floor(item?.matchOdd?.minBet)
                                )}
                                maxBet={formatToINR(
                                  Math.floor(item?.matchOdd?.maxBet)
                                )}
                                matchOddsLive={item?.matchOdd}
                                // data={[]}
                                data={
                                  item?.matchOdd?.runners?.length > 0
                                    ? item?.matchOdd?.runners
                                    : []
                                }
                                typeOfBet={"Match Odds"}
                              />
                            )}
                            {item?.marketCompleteMatch && (
                              <MatchOdds
                                currentMatch={item}
                                typeOfBet={"Market Complete Match"}
                                minBet={formatToINR(
                                  Math.floor(item?.marketCompleteMatch?.minBet)
                                )}
                                maxBet={formatToINR(
                                  Math.floor(item?.marketCompleteMatch?.maxBet)
                                )}
                                data={
                                  item?.marketCompleteMatch?.runners?.length > 0
                                    ? item?.marketCompleteMatch?.runners
                                    : []
                                }
                              />
                            )}
                            {item?.apiTideMatch && (
                              <MatchOdds
                                currentMatch={item}
                                typeOfBet={"Tied Match"}
                                minBet={formatToINR(
                                  Math.floor(item?.apiTideMatch?.minBet)
                                )}
                                maxBet={formatToINR(
                                  Math.floor(item?.apiTideMatch?.maxBet)
                                )}
                                data={
                                  item?.apiTideMatch?.runners?.length > 0
                                    ? item?.apiTideMatch?.runners
                                    : []
                                }
                              />
                            )}
                            {item?.bookmaker && (
                              <LiveBookmaker
                                currentMatch={item}
                                minBet={formatToINR(
                                  Math.floor(item?.bookmaker?.minBet)
                                )}
                                maxBet={formatToINR(
                                  Math.floor(item?.bookmaker?.maxBet)
                                )}
                                bookmakerLive={item?.bookmaker}
                                data={
                                  item?.bookmaker?.runners?.length > 0
                                    ? item?.bookmaker?.runners
                                    : []
                                }
                              />
                            )}
                            {item?.quickBookmaker
                              ?.filter((item: any) => item?.isActive === true)
                              ?.map((bookmaker: any) => {
                                return (
                                  <MatchOdds
                                    currentMatch={item}
                                    session={"manualBookMaker"}
                                    data={bookmaker}
                                    minBet={formatToINR(bookmaker?.minBet) || 0}
                                    maxBet={formatToINR(bookmaker?.maxBet) || 0}
                                    typeOfBet={bookmaker?.name}
                                    matchOddsData={bookmaker}
                                  />
                                );
                              })}
                            {/* {item?.manualBookMakerActive && (
                              <Odds
                                currentMatch={item}
                                data={item}
                                manualBookmakerData={matchOddsDataTemp}
                                typeOfBet={"Quick Bookmaker"}
                                // data={matchOddsLive?.length > 0 ? matchOddsLive[0] : []}
                              />
                            )} */}
                            {/* {manualSessionHttp?.manualBookRate?.map(
                              (bookmaker: any) => {
                                if (bookmaker.betStatus === 1) {
                                  return (
                                    <MatchOdds
                                      currentMatch={item}
                                      session={"manualBookMaker"}
                                      data={bookmaker}
                                      minBet={bookmaker?.min_bet || 0}
                                      maxBet={bookmaker?.max_bet || 0}
                                      typeOfBet={bookmaker?.marketName}
                                      matchOddsData={bookmaker}
                                    />
                                  );
                                }
                              }
                            )} */}
                            {/* {item?.apiBookMakerActive && (
                              <LiveBookmaker
                                currentMatch={item}
                                minBet={Math.floor(item?.bookmaker?.minBet)}
                                maxBet={Math.floor(item?.bookmaker?.maxBet)}
                                bookmakerLive={item?.bookmakerLive}
                                data={
                                  item?.bookmakerLive?.runners?.length > 0
                                    ? item?.bookmakerLive?.runners
                                    : []
                                }
                              />
                            )} */}
                            {item?.manualTiedMatch && (
                              <MatchOdds
                                typeOfBet={"Manual Tied Match"}
                                currentMatch={item}
                                session={"manualBookMaker"}
                                data={item?.manualTiedMatch}
                                minBet={formatToINR(
                                  Math.floor(item?.manualTiedMatch?.minBet)
                                )}
                                maxBet={formatToINR(
                                  Math.floor(item?.manualTiedMatch?.maxBet)
                                )}
                                matchOddsData={item?.manualTiedMatch}
                              />
                            )}

                            {item?.apiSessionActive && (
                              <SessionMarket
                                title={"Quick Session Market"}
                                allBetsData={
                                  item?.profitLossDataSession
                                    ? Array.from(
                                        item?.profitLossDataSession?.reduce(
                                          (acc: any, obj: any) =>
                                            acc.has(obj.id)
                                              ? acc
                                              : acc.add(obj.id) && acc,
                                          new Set()
                                        ),
                                        (id) =>
                                          item?.profitLossDataSession?.find(
                                            (obj: any) => obj.id === id
                                          )
                                      )
                                    : []
                                }
                                sessionData={item?.sessionBettings}
                                currentMatch={item}
                                sessionOffline={item?.sessionOffline}
                                sessionBets={sessionBetsData?.length}
                                max={formatToINR(item?.betFairSessionMaxBet)}
                                min={formatToINR(item?.betFairSessionMinBet)}
                              />
                            )}
                            {item?.manualSessionActive && (
                              <SessionMarket
                                title={"Session Market"}
                                allBetsData={
                                  item?.profitLossDataSession
                                    ? Array.from(
                                        item?.profitLossDataSession?.reduce(
                                          (acc: any, obj: any) =>
                                            acc.has(obj.id)
                                              ? acc
                                              : acc.add(obj.id) && acc,
                                          new Set()
                                        ),
                                        (id) =>
                                          item?.profitLossDataSession?.find(
                                            (obj: any) => obj.id === id
                                          )
                                      )
                                    : []
                                }
                                match={"multiple"}
                                currentMatch={item}
                                sessionData={item?.apiSession}
                                sessionOffline={item?.sessionOffline}
                                sessionBets={sessionBetsData?.length}
                                max={formatToINR(item?.betFairSessionMaxBet)}
                                min={formatToINR(item?.betFairSessionMaxBet)}
                              />
                            )}
                            {sessionProLoss?.length > 0 &&
                              sessionProLoss.filter(
                                (runAmount: any) =>
                                  runAmount?.matchId === item?.id
                              ).length > 0 && (
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
                                  {sessionProLoss
                                    .filter(
                                      (runAmount: any) =>
                                        runAmount?.matchId === item?.id
                                    )
                                    .map((v: any) => {
                                      return (
                                        <RunsBox
                                          key={v?.id}
                                          item={v}
                                          currentOdd={
                                            currentOdds?.betId === v?.id
                                              ? currentOdds
                                              : null
                                          }
                                        />
                                      );
                                    })}
                                </Box>
                              )}
                            <FullAllBets
                              tag={false}
                              IObets={Array.from(
                                placedBets.reduce(
                                  (acc: any, obj: any) =>
                                    acc.has(obj.id)
                                      ? acc
                                      : acc.add(obj.id) && acc,
                                  new Set()
                                ),
                                (id) =>
                                  placedBets.find((obj: any) => obj.id === id)
                              ).filter(
                                (bet: any) =>
                                  (bet?.match?.id || bet?.matchId) === item?.id
                              )}
                              setSelectedBetData={setSelectedBetData}
                              selectedBetData={selectedBetData}
                            />
                          </Box>
                        </>
                      )}
                    </>
                  );
                })}
            </Box>
          </Box>
          <ModalMUI
            open={showUserProfitLoss}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  alignSelf: "center",
                  width: { xs: "90%", lg: "50%" },
                }}
              >
                <UserProfitLoss
                  title={"User Profit Loss"}
                  matchData={storedMatchData}
                  setShowUserProfitLoss={setShowUserProfitLoss}
                  single={"multiple"}
                />
              </Box>
            </Box>
          </ModalMUI>
        </>
      )}

      {(state?.match == 2 || state?.match == 4) && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: { matchesMobile: "column", lg: "row" },
              flex: 1,
              height: "100%",
              // marginX: "0.5%",
              marginLeft: "0.5%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {multipleMatchDetail?.length > 0 &&
                multipleMatchDetail?.map((item: any) => {
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );

                  const QuicksessionData = item?.sessionBettings
                    ?.filter((item: any) => !JSON.parse(item).selectionId)
                    ?.map((item: any) => {
                      return item;
                    });

                  return (
                    <>
                      <Box
                        key={item?.id}
                        sx={{
                          maxWidth: matchesMobile ? "99%" : "49.5%",
                          flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                          marginRight: matchesMobile ? "0%" : "0.5%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "white",
                            fontWeight: "700",
                            paddingTop: "0.7%",
                            alignSelf: "start",
                          }}
                        >
                          {item?.teamA} V/S {item?.teamB}
                          <Button
                            onClick={() =>
                              handleClicked({
                                matchId: item?.id,
                                teamA: item?.teamA,
                                teamB: item?.teamB,
                                teamC: item?.teamC,
                              })
                            }
                            sx={{
                              backgroundColor: "#F8C851",
                              fontSize: "10px",
                              color: "black",
                              fontWeight: "700",
                              float: "right",
                              border: " 1px solid white",
                              marginBottom: "2px",
                              alignSelf: "start",
                              "&:hover": { backgroundColor: "#F8C851" },
                            }}
                          >
                            User Profit Loss
                          </Button>
                        </Typography>

                        {item?.matchOdd?.isActive && (
                          <MatchOdds
                            currentMatch={item}
                            matchOddsLive={item?.matchOdd}
                            minBet={formatToINR(
                              Math.floor(item?.matchOdd?.minBet)
                            )}
                            maxBet={formatToINR(
                              Math.floor(item?.matchOdd?.maxBet)
                            )}
                            data={
                              item.matchOdd?.runners?.length > 0
                                ? item.matchOdd?.runners
                                : []
                            }
                            typeOfBet={"Match Odds"}
                          />
                        )}
                        {item?.marketCompleteMatch?.isActive && (
                          <MatchOdds
                            currentMatch={item}
                            typeOfBet={"Market Complete Match"}
                            minBet={formatToINR(
                              Math.floor(item?.marketCompleteMatch?.minBet)
                            )}
                            maxBet={formatToINR(
                              Math.floor(item?.marketCompleteMatch?.maxBet)
                            )}
                          />
                        )}
                        {item?.apiTideMatch?.isActive && (
                          <MatchOdds
                            currentMatch={item}
                            typeOfBet={"Tied Match"}
                            minBet={formatToINR(
                              Math.floor(item?.apiTideMatch?.minBet)
                            )}
                            maxBet={formatToINR(
                              Math.floor(item?.apiTideMatch?.maxBet)
                            )}
                          />
                        )}
                        {/* {item?.manualBookMakerActive && (
                          <Odds
                            currentMatch={item}
                            data={item}
                            manualBookmakerData={matchOddsDataTemp}
                            typeOfBet={"Quick Bookmaker"}
                          />
                        )} */}
                        {item?.bookmaker?.isActive && (
                          <LiveBookmaker
                            currentMatch={item}
                            minBet={formatToINR(Math.floor(item?.bookmaker?.minBet))}
                            maxBet={formatToINR(Math.floor(item?.bookmaker?.maxBet))}
                            bookmakerLive={item?.bookmakerLive}
                            data={
                              item?.bookmaker?.runners?.length > 0
                                ? item?.bookmaker?.runners
                                : []
                            }
                          />
                        )}
                        {item?.quickBookmaker
                          ?.filter((item: any) => item?.isActive === true)
                          ?.map((bookmaker: any) => {
                            return (
                              <MatchOdds
                                key={bookmaker?.id}
                                currentMatch={item}
                                session={"manualBookMaker"}
                                data={bookmaker}
                                minBet={formatToINR(bookmaker?.minBet) || 0}
                                maxBet={formatToINR(bookmaker?.maxBet) || 0}
                                typeOfBet={bookmaker?.name}
                                matchOddsData={bookmaker}
                              />
                            );
                          })}

                        {/* {item?.apiBookMakerActive && (
                          <LiveBookmaker
                            currentMatch={item}
                            minBet={Math.floor(item?.bookmaker?.minBet)}
                            maxBet={Math.floor(item?.bookmaker?.maxBet)}
                            bookmakerLive={item?.bookmakerLive}
                            data={
                              item?.bookmakerLive?.runners?.length > 0
                                ? item?.bookmakerLive?.runners
                                : []
                            }
                          />
                        )} */}

                        {item?.manualTiedMatch?.isActive && (
                          <MatchOdds
                            typeOfBet={"Manual Tied Match"}
                            currentMatch={item}
                            session={"manualBookMaker"}
                            minBet={formatToINR(Math.floor(item?.manualTiedMatch?.minBet))}
                            maxBet={formatToINR(Math.floor(item?.manualTiedMatch?.maxBet))}
                            matchOddsData={item?.manualTiedMatch}
                          />
                        )}

                        {item?.apiSessionActive && (
                          <SessionMarket
                            title={"Quick Session Market"}
                            allBetsData={
                              item?.profitLossDataSession
                                ? Array.from(
                                    item?.profitLossDataSession?.reduce(
                                      (acc: any, obj: any) =>
                                        acc.has(obj.id)
                                          ? acc
                                          : acc.add(obj.id) && acc,
                                      new Set()
                                    ),
                                    (id) =>
                                      item?.profitLossDataSession?.find(
                                        (obj: any) => obj.id === id
                                      )
                                  )
                                : []
                            }
                            // match={"multiple"}
                            currentMatch={item}
                            sessionData={QuicksessionData}
                            // currentOdds={currentOdds}
                            sessionOffline={item?.sessionOffline}
                            // sessionExposer={manualSessionHttp?.sessionExposure}
                            sessionBets={sessionBetsData?.length}
                            // sessionData={manualSessionHttp?.manualSessionRate}
                            // setPopData={setPopData}
                            // popData={popData}
                            max={formatToINR(item?.betFairSessionMaxBet)}
                            min={formatToINR(item?.betFairSessionMinBet)}
                          />
                        )}
                        {item?.apiSessionActive && (
                          <SessionMarket
                            title={"Session Market"}
                            allBetsData={
                              item?.profitLossDataSession
                                ? Array.from(
                                    item?.profitLossDataSession?.reduce(
                                      (acc: any, obj: any) =>
                                        acc.has(obj.id)
                                          ? acc
                                          : acc.add(obj.id) && acc,
                                      new Set()
                                    ),
                                    (id) =>
                                      item?.profitLossDataSession?.find(
                                        (obj: any) => obj.id === id
                                      )
                                  )
                                : []
                            }
                            match={"multiple"}
                            currentMatch={item}
                            sessionData={item?.apiSession}
                            // currentOdds={currentOdds}
                            sessionOffline={item?.sessionOffline}
                            // sessionExposer={manualSessionHttp?.sessionExposure}
                            sessionBets={sessionBetsData?.length}
                            // setPopData={setPopData}
                            // popData={popData}
                            max={formatToINR(item?.betFairSessionMaxBet)}
                            min={formatToINR(item?.betFairSessionMinBet)}
                          />
                        )}
                        {sessionProLoss?.length > 0 &&
                          sessionProLoss.filter(
                            (runAmount: any) => runAmount?.matchId === item?.id
                          ).length > 0 && (
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
                              {sessionProLoss
                                .filter(
                                  (runAmount: any) =>
                                    runAmount?.matchId === item?.id
                                )
                                .map((v: any) => {
                                  return (
                                    <RunsBox
                                      key={v?.id}
                                      item={v}
                                      currentOdd={
                                        currentOdds?.betId === v?.id
                                          ? currentOdds
                                          : null
                                      }
                                    />
                                  );
                                })}
                            </Box>
                          )}
                        <FullAllBets
                          tag={false}
                          IObets={Array.from(
                            placedBets.reduce(
                              (acc: any, obj: any) =>
                                acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                              new Set()
                            ),
                            (id) => placedBets.find((obj: any) => obj.id === id)
                          ).filter(
                            (bet: any) =>
                              (bet?.match?.id || bet?.matchId) === item?.id
                          )}
                          setSelectedBetData={setSelectedBetData}
                          selectedBetData={selectedBetData}
                        />
                      </Box>
                    </>
                  );
                })}
            </Box>
          </Box>
          <ModalMUI
            open={showUserProfitLoss}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <Box
                sx={{
                  alignSelf: "center",
                  width: { xs: "90%", lg: "50%" },
                }}
              >
                <UserProfitLoss
                  title={"User Profit Loss"}
                  matchData={storedMatchData}
                  setShowUserProfitLoss={setShowUserProfitLoss}
                  single={"multiple"}
                />
              </Box>
            </Box>
          </ModalMUI>
        </>
      )}
    </>
  );
};

export default MultipleMatch;
