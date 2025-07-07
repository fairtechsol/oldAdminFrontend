import { Box, useMediaQuery, useTheme } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FullAllBets from "../../../components/matchDetail/Common/FullAllBets";
import UserProfitLoss from "../../../components/matchDetail/Common/UserProfitLoss";
import Layout from "../../../components/multipleAnalysis/Layout";
import { usePhoenixChannel } from "../../../phoenixManager";
import { socket, socketService } from "../../../socketManager";
import {
  analysisListReset,
  getPlacedBets,
  removeRunAmount,
  setCurrentOdd,
  updateBetsPlaced,
  updateMultipleMatchDetail,
  updatePlacedbets,
  updatePlacedbetsDeleteReason,
  updateProfitLoss,
} from "../../../store/actions/match/matchAction";
import {
  getMultipleMatchDetail,
  updateBetDataOnDeclareOfMultipleMatch,
  updateMatchRatesOnMarketUndeclareForMulti,
  updateMaxLossForBetForMultipleMatch,
  updateMaxLossForBetOnUndeclareForMultipleMatch,
  updateMaxLossForDeleteBetForMultiMatch,
  updateTeamRatesOfMultipleMatch,
  updateTeamRatesOnDeleteForMultiMatch,
} from "../../../store/actions/match/multipleMatchAction";
import { resetSessionProfitLoss } from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";

const MultipleMatch = () => {
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
  const { currentOdd } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { multipleMatchDetail, success } = useSelector(
    (state: RootState) => state.match.analysisList
  );

  const { placedBets, sessionProLoss } = useSelector(
    (state: RootState) => state.match.bets
  );

  const { data } = usePhoenixChannel({
    role: sessionStorage.getItem("userRole") || profileDetail?.roleName,
    matchId: state?.matchIds.join(","),
    userId: sessionStorage.getItem("key") || profileDetail?.id,
  });

  // useEffect(() => {
  //   if (state) {
  //     matchService.connect(state?.matchIds, profileDetail?.roleName);
  //   }
  //   return () => {
  //     matchService.disconnect();
  //   };
  // }, [state]);

  const updateMatchDetailToRedux = (event: any) => {
    dispatch(updateMultipleMatchDetail(event));
  };

  useEffect(() => {
    updateMatchDetailToRedux(data);
  }, [data]);

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
        dispatch(
          setCurrentOdd({
            matchId: event?.jobData?.betPlaceObject?.betPlacedData?.matchId,
            betId: event?.jobData?.betPlaceObject?.betPlacedData?.betId,
            odds: event?.jobData?.betPlaceObject?.betPlacedData?.odds,
          })
        );
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
        if (event?.isMatchDeclare) {
          navigate(`/admin/market_analysis`);
        } else {
          dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
        }
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

  const updateMultiplePlacedbetsDeleteReason = (event: any) => {
    if (state?.matchIds.includes(event?.matchId)) {
      dispatch(updatePlacedbetsDeleteReason(event));
    }
  };

  const handleMatchResultUndeclared = (event: any) => {
    try {
      if (state?.matchIds.includes(event?.matchId)) {
        dispatch(getPlacedBets(`inArr${JSON.stringify(state?.matchIds)}`));
        // dispatch(getPlacedBets(`eq${state?.matchId}`));
        dispatch(updateMatchRatesOnMarketUndeclareForMulti(event));
      }
    } catch (error) {
      console.log(error);
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
      if (success && profileDetail?.roleName && socket) {
        // state?.matchIds?.map((item: any) => {
        //   socketService.match.getMatchRatesOff(item);
        // });
        socketService.match.userSessionBetPlacedOff();
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.sessionDeleteBetOff();
        socketService.match.sessionResultOff();
        socketService.match.sessionResultUnDeclareOff();
        socketService.match.updateDeleteReasonOff();
        // state?.matchIds?.map((item: any) => {
        //   socketService.match.joinMatchRoom(item);
        // });
        // state?.matchIds?.map((item: any) => {
        //   socketService.match.getMatchRates(item, updateMatchDetailToRedux);
        // });
        socketService.match.userSessionBetPlaced(setMultiSessionBetsPlaced);
        socketService.match.userMatchBetPlaced(setMultiMatchBetsPlaced);
        socketService.match.matchResultDeclared(matchMultiResultDeclared);
        socketService.match.declaredMatchResultAllUser(
          matchMultiResultDeclared
        );
        socketService.match.matchDeleteBet(handleMultiMatchDeleteBet);
        socketService.match.sessionDeleteBet(handleMultiMatchSessionDeleteBet);
        socketService.match.sessionResult(handleMultiMatchSessionResultDeclare);
        socketService.match.sessionResultUnDeclare(
          handleMultiMatchSessionResultUnDeclare
        );
        socketService.match.updateDeleteReason(
          updateMultiplePlacedbetsDeleteReason
        );
        socketService.match.matchResultUnDeclared(handleMatchResultUndeclared);
        dispatch(analysisListReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail, socket]);

  useEffect(() => {
    return () => {
      // state?.matchIds?.map((item: any) => {
      //   socketService.match.getMatchRatesOff(item);
      // });
      socketService.match.userSessionBetPlacedOff();
      socketService.match.userMatchBetPlacedOff();
      socketService.match.matchResultDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.matchDeleteBetOff();
      socketService.match.sessionDeleteBetOff();
      socketService.match.sessionResultOff();
      socketService.match.sessionResultUnDeclareOff();
      socketService.match.updateDeleteReasonOff();
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
                  const QuicksessionData = item?.sessionBettings
                    ?.filter((item: any) => !JSON.parse(item).selectionId)
                    ?.map((item: any) => {
                      return item;
                    });

                  return (
                    <>
                      {index === 0 ? (
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
                            <Layout
                              item={item}
                              handleClicked={handleClicked}
                              QuicksessionData={QuicksessionData}
                              sessionProLoss={sessionProLoss}
                              currentOdd={currentOdd}
                              placedBets={placedBets}
                            />
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
                              />
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
                                  (bet?.match?.id || bet?.matchId) === item?.id
                              )}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          key={index}
                          sx={{
                            maxWidth: matchesMobile ? "99%" : "49.5%",
                            flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                            marginRight: "0.5%",
                          }}
                        >
                          <Layout
                            item={item}
                            handleClicked={handleClicked}
                            QuicksessionData={QuicksessionData}
                            sessionProLoss={sessionProLoss}
                            currentOdd={currentOdd}
                            placedBets={placedBets}
                            showBets={true}
                          />
                        </Box>
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
                  title="User Profit Loss"
                  matchData={storedMatchData}
                  setShowUserProfitLoss={setShowUserProfitLoss}
                  single="multiple"
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
                  const QuicksessionData = item?.sessionBettings
                    ?.filter((item: any) => !JSON.parse(item).selectionId)
                    ?.map((item: any) => {
                      return item;
                    });

                  return (
                    <Box
                      key={item?.id}
                      sx={{
                        maxWidth: matchesMobile ? "99%" : "49.5%",
                        flex: matchesMobile ? "0 0 99%" : "0 0 49.5%",
                        marginRight: matchesMobile ? "0%" : "0.5%",
                      }}
                    >
                      <Layout
                        item={item}
                        handleClicked={handleClicked}
                        QuicksessionData={QuicksessionData}
                        sessionProLoss={sessionProLoss}
                        currentOdd={currentOdd}
                        placedBets={placedBets}
                        showBets={true}
                      />
                    </Box>
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
                  title="User Profit Loss"
                  matchData={storedMatchData}
                  setShowUserProfitLoss={setShowUserProfitLoss}
                  single="multiple"
                />
              </Box>
            </Box>
          </ModalMUI>
        </>
      )}
    </>
  );
};

export default memo(MultipleMatch);
