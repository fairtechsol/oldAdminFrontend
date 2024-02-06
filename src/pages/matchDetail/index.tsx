import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DeleteIcon } from "../../assets";
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
  getMatchDetail,
  getPlacedBets,
  matchListReset,
  updateMatchRates,
} from "../../store/actions/match/matchAction";
import { useSelector } from "react-redux";
import { socketService } from "../../socketManager";
import FullAllBets from "../../components/matchDetail/Common/FullAllBets";
import AddNotificationModal from "../../components/matchDetail/Common/AddNotificationModal";
import { checkUserType } from "../../helper";

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
  const { success, matchDetail } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const { placedBets, loading } = useSelector(
    (state: RootState) => state.match.bets
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
      if (event?.matchId === state?.matchId) {
        if (location.pathname.includes("market_analysis")) {
          navigate(`/${checkUserType()}/market_analysis`);
        } else {
          navigate(`/${checkUserType()}/live_market`);
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
        dispatch(getMatchDetail(state?.matchId));
        dispatch(getPlacedBets(state?.matchId));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (state?.matchId) {
        dispatch(getMatchDetail(state?.matchId));
        dispatch(getPlacedBets(state?.matchId));
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
        socketService.match.sessionDeleteBet(matchDeleteBet);
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      socketService.match.leaveAllRooms();
      socketService.match.leaveMatchRoom(state?.matchId);
    };
  }, [state?.matchId]);

  useEffect(() => {
    try {
      if (success) {
        dispatch(matchListReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [success]);

  const QuicksessionData = matchDetail?.sessionBettings
    ?.filter((item: any) => !JSON.parse(item).selectionId)
    ?.map((item: any) => {
      return item;
    });

  const sessionData = matchDetail?.sessionBettings
    ?.filter((item: any) => JSON.parse(item).selectionId)
    ?.map((item: any) => {
      return item;
    });

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
              minBet={Math.floor(matchDetail?.matchOdd?.minBet)}
              maxBet={Math.floor(matchDetail?.matchOdd?.maxBet)}
            />
          )}
          {matchDetail?.marketCompleteMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Market Complete Match"}
              minBet={Math.floor(matchDetail?.marketCompleteMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.marketCompleteMatch?.maxBet)}
            />
          )}
          {matchDetail?.apiTideMatch?.isActive && (
            <MatchOdds
              currentMatch={matchDetail}
              typeOfBet={"Tied Match"}
              minBet={Math.floor(matchDetail?.apiTideMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.apiTideMatch?.maxBet)}
            />
          )}
          {matchDetail?.bookmaker?.isActive && (
            <LiveBookmaker
              currentMatch={matchDetail}
              minBet={Math.floor(matchDetail?.bookmaker?.minBet)}
              maxBet={Math.floor(matchDetail?.bookmaker?.maxBet)}
              data={
                matchDetail?.bookmaker?.runners?.length > 0
                  ? matchDetail?.bookmaker?.runners
                  : []
              }
            />
          )}
          {matchDetail?.quickBookmaker?.map((bookmaker: any, index: any) => {
            return (
              <MatchOdds
                key={index}
                currentMatch={matchDetail}
                session={"manualBookMaker"}
                data={bookmaker}
                minBet={Math.floor(bookmaker?.minBet) || 0}
                maxBet={Math.floor(bookmaker?.maxBet) || 0}
                typeOfBet={bookmaker?.name}
                matchOddsData={bookmaker}
              />
            );
          })}
          {matchDetail?.manualTiedMatch && matchesMobile && (
            <MatchOdds
              typeOfBet={"Manual Tied Match"}
              data={matchDetail?.manualTiedMatch}
              currentMatch={matchDetail}
              session={"manualBookMaker"}
              minBet={Math.floor(matchDetail?.manualTiedMatch?.minBet)}
              maxBet={Math.floor(matchDetail?.manualTiedMatch?.maxBet)}
            />
          )}

          {matchDetail?.manualSessionActive && matchesMobile && (
            <SessionMarket
              title={"Quick Session Market"}
              currentMatch={matchDetail}
              sessionData={QuicksessionData}
              min={matchDetail?.betFairSessionMinBet || 0}
              max={matchDetail?.betFairSessionMaxBet || 0}
            />
          )}
          {matchDetail?.apiSessionActive && matchesMobile && (
            <SessionMarket
              title={"Session Market"}
              currentMatch={matchDetail}
              sessionData={sessionData}
              min={Math.floor(matchDetail?.betFairSessionMinBet)}
              max={Math.floor(matchDetail?.betFairSessionMaxBet)}
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
            <Box
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
            </Box>
          </Box>
          <Box sx={{ mt: 0 }}>
            <FullAllBets
              IObets={placedBets.length > 0 ? placedBets : []}
              mode={mode}
              tag={false}
              setSelectedBetData={setSelectedBetData}
              selectedBetData={selectedBetData}
            />
          </Box>
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
                minBet={Math.floor(matchDetail?.manualTiedMatch?.minBet)}
                maxBet={Math.floor(matchDetail?.manualTiedMatch?.maxBet)}
              />
            )}
            {matchDetail?.manualSessionActive && (
              <SessionMarket
                title={"Quick Session Market"}
                currentMatch={matchDetail}
                sessionExposer={"0.00"}
                sessionData={QuicksessionData}
                min={matchDetail?.betFairSessionMinBet || 0}
                max={matchDetail?.betFairSessionMaxBet || 0}
              />
            )}
            {matchDetail?.apiSessionActive && (
              <SessionMarket
                title={"Session Market"}
                currentMatch={matchDetail}
                sessionExposer={"0.00"}
                sessionData={sessionData}
                max={Math.floor(matchDetail?.betFairSessionMaxBet)}
                min={Math.floor(matchDetail?.betFairSessionMinBet)}
              />
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
