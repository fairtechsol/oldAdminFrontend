import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import MatchOdds from "../../components/matchDetail/MatchOdds";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import LiveBookmaker from "../../components/matchDetail/LiveBookmaker";
import UserProfitLoss from "../../components/matchDetail/Common/UserProfitLoss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  AllBetDelete,
  amountupdate,
  // betDataFromSocket,
  getMatchDetail,
  getPlacedBets,
  getUserProfitLoss,
  removeRunAmount,
  // updateBalance,
  updateBetsPlaced,
  updateMatchRates,
  updateMaxLossForBet,
  updateMaxLossForBetOnUndeclare,
  updateMaxLossForDeleteBet,
  updatePlacedbets,
  updateProfitLoss,
  updateTeamRates,
  updateTeamRatesOnDelete,
} from "../../store/actions/match/matchAction";
import { useSelector } from "react-redux";
import { socketService } from "../../socketManager";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import AddNotificationModal from "../../components/matchDetail/Common/AddNotificationModal";
import { Constants } from "../../utils/Constants";
import RunsBox from "../../components/matchDetail/SessionMarket/RunsBox";
import { resetSessionProfitLoss } from "../../store/actions/reports";
import { formatToINR } from "../../helper";

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
  const { placedBets, loading, sessionProLoss } = useSelector(
    (state: RootState) => state.match.bets
  );

  const [currentOdds] = useState<any>(null);

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
      if (event?.matchId === state?.matchId) {
        if (location.pathname.includes("market_analysis")) {
          navigate(`${Constants.oldAdmin}market_analysis`);
        } else {
          navigate(`${Constants.oldAdmin}live_market`);
        }
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
        dispatch(getPlacedBets(`eq${state?.matchId}`));
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
  const handleSessionResultUnDeclare = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updateMaxLossForBetOnUndeclare(event));
        dispatch(getPlacedBets(`eq${state?.matchId}`));
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
      dispatch(getPlacedBets(`eq${state?.matchId}`));
    }
  }, []);

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName) {
        socketService.match.getMatchRatesOff(
          state?.matchId,
          updateMatchDetailToRedux
        );
        socketService.match.userSessionBetPlacedOff(setSessionBetsPlaced);
        socketService.match.userMatchBetPlacedOff(setMatchBetsPlaced);
        socketService.match.matchResultDeclaredOff(matchResultDeclared);
        socketService.match.matchDeleteBetOff(matchDeleteBet);
        socketService.match.sessionDeleteBetOff(handleSessionDeleteBet);
        socketService.match.sessionResultOff(handleSessionResultDeclare);
        socketService.match.sessionResultUnDeclareOff(
          handleSessionResultUnDeclare
        );
        socketService.match.joinMatchRoom(
          state?.matchId,
          profileDetail?.roleName
        );
        socketService.match.getMatchRates(
          state?.matchId,
          updateMatchDetailToRedux
        );
        socketService.match.matchResultDeclared(matchResultDeclared);
        socketService.match.matchDeleteBet(matchDeleteBet);
        socketService.match.sessionDeleteBet(handleSessionDeleteBet);
        socketService.match.userSessionBetPlaced(setSessionBetsPlaced);
        socketService.match.userMatchBetPlaced(setMatchBetsPlaced);
        socketService.match.sessionResult(handleSessionResultDeclare);
        socketService.match.sessionResultUnDeclare(
          handleSessionResultUnDeclare
        );
        // dispatch(matchListReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail?.roleName]);

  useEffect(() => {
    return () => {
      socketService.match.leaveMatchRoom(state?.matchId);
      socketService.match.getMatchRatesOff(
        state?.matchId,
        updateMatchDetailToRedux
      );
      socketService.match.userSessionBetPlacedOff(setSessionBetsPlaced);
      socketService.match.userMatchBetPlacedOff(setMatchBetsPlaced);
      socketService.match.matchResultDeclaredOff(matchResultDeclared);
      socketService.match.matchDeleteBetOff(matchDeleteBet);
      socketService.match.sessionDeleteBetOff(handleSessionDeleteBet);
      socketService.match.sessionResultOff(handleSessionResultDeclare);
      socketService.match.sessionResultUnDeclareOff(
        handleSessionResultUnDeclare
      );
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(getMatchDetail(state?.matchId));
          dispatch(getUserProfitLoss(state?.matchId));
          dispatch(getPlacedBets(`eq${state?.matchId}`));
        }
      } else if (document.visibilityState === "hidden") {
        socketService.match.getMatchRatesOff(
          state?.matchId,
          updateMatchDetailToRedux
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
            {matchDetail?.teamA} V/S {matchDetail?.teamB}
          </Typography>
          {matchDetail?.matchOdd?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Match Odds"}
              minBet={formatToINR(Math.floor(matchDetail?.matchOdd?.minBet))}
              maxBet={formatToINR(Math.floor(matchDetail?.matchOdd?.maxBet))}
              data={
                matchDetail?.matchOdd?.runners?.length > 0
                  ? matchDetail?.matchOdd?.runners
                  : []
              }
              showBox={matchDetail?.matchOdd?.activeStatus === "save"}
            />
          )}
          {matchDetail?.marketCompleteMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Market Complete Match"}
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
            />
          )}
          {matchDetail?.apiTideMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
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
            />
          )}
          {matchDetail?.bookmaker?.isActive && (
            <LiveBookmaker
              currentMatch={matchDetail}
              minBet={formatToINR(Math.floor(matchDetail?.bookmaker?.minBet))}
              maxBet={formatToINR(Math.floor(matchDetail?.bookmaker?.maxBet))}
              data={
                matchDetail?.bookmaker?.runners?.length > 0
                  ? matchDetail?.bookmaker?.runners
                  : []
              }
              showBox={matchDetail?.bookmaker?.activeStatus === "save"}
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
                />
              );
            })}
          {matchDetail?.manualTiedMatch?.isActive && matchesMobile && (
            <MatchOdds
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
                            acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                          new Set()
                        ),
                        (id) =>
                          matchDetail?.profitLossDataSession?.find(
                            (obj: any) => obj.id === id
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
              />
            )}

          {matchDetail?.apiSessionActive &&
            matchesMobile &&
            matchDetail?.apiSession?.length > 0 && (
              <SessionMarket
                title={"Session Market"}
                allBetsData={
                  matchDetail?.profitLossDataSession
                    ? Array.from(
                        matchDetail?.profitLossDataSession?.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                          new Set()
                        ),
                        (id) =>
                          matchDetail?.profitLossDataSession?.find(
                            (obj: any) => obj.id === id
                          )
                      )
                    : []
                }
                currentMatch={matchDetail}
                sessionData={matchDetail?.apiSession}
                min={formatToINR(Math.floor(matchDetail?.betFairSessionMinBet))}
                max={formatToINR(Math.floor(matchDetail?.betFairSessionMaxBet))}
              />
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
            {/* <Box
              onClick={() => {
                if (mode) {
                  setVisible(true);
                } else {
                  setMode(!mode);
                }
              }}
              sx={{
                width: "150px",
                marginY: ".75%",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
                background: "#E32A2A",
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
                  color: "white",
                  marginRight: "10px",
                }}
              >
                {!mode ? "Delete Bet" : "Delete"}
              </Typography>
              <img src={DeleteIcon} style={{ width: "17px", height: "20px" }} />
            </Box> */}
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
                              acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                            new Set()
                          ),
                          (id) =>
                            matchDetail?.profitLossDataSession?.find(
                              (obj: any) => obj.id === id
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
                />
              )}
            {matchDetail?.apiSessionActive &&
              matchDetail?.apiSession?.length > 0 && (
                <SessionMarket
                  title={"Session Market"}
                  allBetsData={
                    matchDetail?.profitLossDataSession
                      ? Array.from(
                          matchDetail?.profitLossDataSession?.reduce(
                            (acc: any, obj: any) =>
                              acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
                            new Set()
                          ),
                          (id) =>
                            matchDetail?.profitLossDataSession?.find(
                              (obj: any) => obj.id === id
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
                        currentOdds?.betId === v?.id ? currentOdds : null
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
