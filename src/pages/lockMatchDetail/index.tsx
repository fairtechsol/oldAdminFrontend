import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import SessionMarket from "../../components/matchDetail/SessionMarket";
import { matchService, socket, socketService } from "../../socketManager";
import {
  getUserDetailsOfLock,
  updateUserMatchLock,
} from "../../store/actions/match/marketLockUnlockAction";
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
  updatePlacedbetsDeleteReason,
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

  const { childStatus, statusSuccess } = useSelector(
    (state: RootState) => state.match.lockUnlock
  );
  const { placedBets } = useSelector((state: RootState) => state.match.bets);
  const [isSessionLock, setIsSessionLock] = useState<any>(false);

  useEffect(() => {
    if (state) {
      matchService.connect([state?.matchId], profileDetail?.roleName);
    }
    return () => {
      matchService.disconnect();
    };
  }, [state]);

  const handleBlock = async (value: any, status: any, typeOfBet: any) => {
    try {
      let payload = {
        matchId: state?.matchId,
        transactionPassword: value,
        userId: profileDetail?.id,
        type: typeOfBet === "SESSION" ? "session" : "match",
        block: status,
        operationToAll: true,
      };
      dispatch(updateUserMatchLock(payload));
    } catch (e: any) {
      console.log(e?.message, "message");
    }
  };

  const handleShowLock = async (_: any, type: any) => {
    if (type === "Match Odds") {
    } else if (type === "Session Market") {
      setIsSessionLock(true);
    }
  };
  const handleHide = async () => {
    setIsSessionLock(false);
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
      if (event?.matchId === state?.matchId) {
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

  const handleDeleteReasonUpdate = (event: any) => {
    try {
      if (event?.matchId === state?.matchId) {
        dispatch(updatePlacedbetsDeleteReason(event));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (statusSuccess) {
      setTimeout(() => {
        dispatch(getUserDetailsOfLock(state?.matchId));
      }, 500);
      handleHide();
    }
  }, [statusSuccess]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (state?.matchId) {
      dispatch(getMatchDetail(state?.matchId));
      dispatch(getUserProfitLoss(state?.matchId));
      dispatch(getUserDetailsOfLock(state?.matchId));
      dispatch(resetSessionProfitLoss());
      dispatch(getPlacedBets(`eq${state?.matchId}`));
    }
  }, [state?.matchId]);

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
        socketService.match.updateDeleteReasonOff();
        socketService.match.joinMatchRoom(state?.matchId);
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
        socketService.match.updateDeleteReason(handleDeleteReasonUpdate);
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
    };
  }, [state?.matchId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (state?.matchId) {
          dispatch(getMatchDetail(state?.matchId));
          dispatch(getUserProfitLoss(state?.matchId));
          dispatch(getUserDetailsOfLock(state?.matchId));
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
          {matchDetail?.title}
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
              title="Session Market"
              currentMatch={matchDetail}
              sessionData={matchDetail?.apiSession}
              min={Math.floor(matchDetail?.betFairSessionMinBet)}
              blockMatch={true}
              locked={childStatus?.allChildSessionDeactive}
              selft={true}
              handleBlock={handleBlock}
              handleHide={handleHide}
              handleShowLock={handleShowLock}
              showUnlock={isSessionLock}
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
              title="Quick Session Market"
              currentMatch={matchDetail}
              sessionData={matchDetail?.sessionBettings?.filter(
                (item: any) => !JSON.parse(item).selectionId
              )}
              min={matchDetail?.betFairSessionMinBet || 0}
              blockMatch={false}
              locked={childStatus?.allChildSessionDeactive}
              selft={true}
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
      </Box>
    </>
  );
};

export default memo(LockMatchScreen);
