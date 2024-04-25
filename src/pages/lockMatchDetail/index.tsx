import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import SessionMarket from "../../components/matchDetail/SessionMarket";
// import MatchComponent from "../../components/Inplay/MatchComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import LiveBookmaker from "../../components/matchDetail/LiveBookmaker";
import MatchOdds from "../../components/matchDetail/MatchOdds";
import service from "../../service";
import { socket, socketService } from "../../socketManager";
import {
  amountupdate,
  getMatchDetail,
  getPlacedBets,
  getUserProfitLoss,
  removeRunAmount,
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
import { resetSessionProfitLoss } from "../../store/actions/reports";
import { AppDispatch, RootState } from "../../store/store";
import { Constants } from "../../utils/Constants";
const LockMatchScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { success, matchDetail } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { placedBets } = useSelector((state: RootState) => state.match.bets);
  const [currentMatch, setCurrentMatch] = useState<any>(null);
  const [matchOddsLive] = useState<any>([]);
  const [mode, setMode] = useState<any>(false);
  const [isMatchLock, setIsMatchLock] = useState<any>(false);
  const [isBookmakerLock, setIsBookmakerLock] = useState<any>(false);
  const [_, setIsManualLock] = useState<any>(false);
  const [isQuickSessionLock, setIsQuickSessionLock] = useState<any>(false);
  const [isSessionLock, setIsSessionLock] = useState<any>(false);

  const handleBlock = async (value: any, locked: any, typeOfBet: any) => {
    try {
      let type = typeOfBet.toUpperCase();
      let payload = {
        matchId: state?.matchId,
        marketType: type,
        marketLock: locked,
        adminTransPassword: value,
      };
      let response = await service.post(
        `/game-match/blockMatchMarket`,
        payload
      );
      console.log(response);
      if (typeOfBet == "Match Odds") {
        setCurrentMatch((prevState: any) => ({
          ...prevState,
          blockMarket: {
            ...prevState.blockMarket,
            MATCH_ODDS: {
              ...prevState.blockMarket.MATCH_ODDS,
              block: locked,
            },
          },
        }));
        setIsMatchLock(false);
      } else if (typeOfBet == "MANUAL BOOKMAKER") {
        setCurrentMatch((prevState: any) => ({
          ...prevState,
          blockMarket: {
            ...prevState.blockMarket,
            MANUALBOOKMAKER: {
              ...prevState.blockMarket.MANUALBOOKMAKER,
              block: locked,
            },
          },
        }));
        setIsManualLock(false);
      } else if (typeOfBet == "BOOKMAKER") {
        setCurrentMatch((prevState: any) => ({
          ...prevState,
          blockMarket: {
            ...prevState.blockMarket,
            BOOKMAKER: {
              ...prevState.blockMarket.BOOKMAKER,
              block: locked,
            },
          },
        }));
        setIsBookmakerLock(false);
      } else if (typeOfBet == "SESSION") {
        setCurrentMatch((prevState: any) => ({
          ...prevState,
          blockMarket: {
            ...prevState.blockMarket,
            SESSION: {
              ...prevState.blockMarket.SESSION,
              block: locked,
            },
          },
        }));
        setIsSessionLock(false);
        setIsQuickSessionLock(false);
      }
    } catch (e: any) {
      console.log(e?.message, "message");
    }
  };

  const handleShowLock = async (_: any, type: any) => {
    if (type === "Match Odds") {
      setIsMatchLock(true);
    } else if (type === "Quick Bookmaker") {
      setIsManualLock(true);
    } else if (type === "BOOKMAKER") {
      setIsBookmakerLock(true);
    } else if (type === "Session Market") {
      setIsSessionLock(true);
    } else if (type === "Quick Session Market") {
      setIsQuickSessionLock(true);
    }
  };
  const handleHide = async () => {
    setIsMatchLock(false);
    setIsManualLock(false);
    setIsBookmakerLock(false);
    setIsSessionLock(false);
    setIsQuickSessionLock(false);
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
      if ((success && profileDetail?.roleName, socket)) {
        socketService.match.getMatchRatesOff(state?.matchId);
        socketService.match.userSessionBetPlacedOff();
        socketService.match.userMatchBetPlacedOff();
        socketService.match.matchResultDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.matchDeleteBetOff();
        socketService.match.sessionDeleteBetOff();
        socketService.match.sessionResultOff();
        socketService.match.sessionResultUnDeclareOff();
        socketService.match.joinMatchRoom(
          state?.matchId,
          profileDetail?.roleName
        );
        socketService.match.getMatchRates(
          state?.matchId,
          updateMatchDetailToRedux
        );
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
    };
  }, [state?.matchId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(getMatchDetail(state?.matchId));
          dispatch(getUserProfitLoss(state?.matchId));
          dispatch(getPlacedBets(`eq${state?.matchId}`));
        }
      } else if (document.visibilityState === "hidden") {
        socketService.match.getMatchRatesOff(state?.matchId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <Box sx={{ paddingLeft: "0.7% " }}>
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
            fontWeight: "700",
            paddingTop: "2%",
            alignSelf: "start",
          }}
        >
          {matchDetail?.teamA} V/S {matchDetail?.teamB}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", lg: "row" },
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
          {matchDetail?.matchOdd?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Match Odds"}
              showBox={matchDetail?.matchOdd?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.matchOdd?.minBet)}
              maxBet={Math.floor(matchDetail?.matchOdd?.maxBet)}
              data={
                matchDetail?.matchOdd?.runners?.length > 0
                  ? matchDetail?.matchOdd?.runners
                  : []
              }
              matchOddsLive={matchOddsLive}
              blockMatch={true}
              locked={currentMatch?.blockMarket?.MATCH_ODDS?.block}
              selft={currentMatch?.blockMarket?.MATCH_ODDS?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isMatchLock}
            />
          )}
          {/* {true && (
            <MatchOdds
              currentMatch={matchDetail}
              data={currentMatch}
              manualBookmakerData={manualBookmakerData}
              typeOfBet={"Quick Bookmaker"}
              blockMatch={true}
              locked={currentMatch?.blockMarket?.MANUALBOOKMAKER?.block}
              selft={currentMatch?.blockMarket?.MANUALBOOKMAKER?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              mShowUnlock={isManualLock}
            />
          )} */}
          {matchDetail?.bookmaker?.isActive && (
            <LiveBookmaker
              currentMatch={matchDetail}
              showBox={matchDetail?.bookmaker?.activeStatus === "save"}
              minBet={Math.floor(matchDetail?.bookmaker?.minBet)}
              maxBet={Math.floor(matchDetail?.bookmaker?.maxBet)}
              data={
                matchDetail?.bookmaker?.runners?.length > 0
                  ? matchDetail?.bookmaker?.runners
                  : []
              }
              blockMatch={true}
              locked={currentMatch?.blockMarket?.BOOKMAKER?.block}
              selft={currentMatch?.blockMarket?.BOOKMAKER?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isBookmakerLock}
            />
          )}

          {matchDetail?.manualSessionActive && (
            <SessionMarket
              allBetsData={
                matchDetail?.profitLossDataSession
                  ? Array.from(
                      matchDetail?.profitLossDataSession?.reduce(
                        (acc: any, obj: any) =>
                          acc.has(obj.betId) ? acc : acc.add(obj.betId) && acc,
                        new Set()
                      ),
                      (id) =>
                        matchDetail?.profitLossDataSession?.find(
                          (obj: any) => obj.betId === id
                        )
                    )
                  : []
              }
              title={"Quick Session Market"}
              currentMatch={matchDetail}
              sessionData={matchDetail?.sessionBettings?.filter(
                (item: any) => !JSON.parse(item).selectionId
              )}
              min={matchDetail?.betFairSessionMinBet || 0}
              max={matchDetail?.betFairSessionMaxBet || 0}
              blockMatch={true}
              locked={currentMatch?.blockMarket?.SESSION?.block}
              selft={currentMatch?.blockMarket?.SESSION?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isQuickSessionLock}
            />
          )}
          {matchDetail?.apiSessionActive && (
            <SessionMarket
              allBetsData={
                matchDetail?.profitLossDataSession
                  ? Array.from(
                      matchDetail?.profitLossDataSession?.reduce(
                        (acc: any, obj: any) =>
                          acc.has(obj.betId) ? acc : acc.add(obj.betId) && acc,
                        new Set()
                      ),
                      (id) =>
                        matchDetail?.profitLossDataSession?.find(
                          (obj: any) => obj.betId === id
                        )
                    )
                  : []
              }
              title={"Session Market"}
              currentMatch={matchDetail}
              sessionData={matchDetail?.apiSession}
              min={Math.floor(matchDetail?.betFairSessionMinBet)}
              max={Math.floor(matchDetail?.betFairSessionMaxBet)}
              blockMatch={true}
              locked={currentMatch?.blockMarket?.SESSION?.block}
              selft={currentMatch?.blockMarket?.SESSION?.selft}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isSessionLock}
            />
          )}
        </Box>
        <Box sx={{ width: "20px" }} />
        <Box
          sx={{
            flex: 1,
            flexDirection: "column",
            display: "flex",
            minHeight: "100px",
          }}
        >
          {/* <MatchComponent
            currentMatch={currentMatch}
            liveScoreData={liveScoreData}
            submit={true}
          /> */}

          {/* <LiveMatchHome currentMatch={currentMatch} submit={true} /> */}
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
          />
        </Box>
      </Box>
    </>
  );
};

export default memo(LockMatchScreen);
