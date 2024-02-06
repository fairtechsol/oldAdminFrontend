import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import MatchOdds from "../../../components/matchDetail/MatchOdds";
import UserProfitLoss from "../../../components/matchDetail/Common/UserProfitLoss";
import FullAllBets from "../../../components/matchDetail/Common/FullAllBets";
import SessionMarket from "../../../components/matchDetail/SessionMarket";
import LiveBookmaker from "../../../components/matchDetail/LiveBookmaker";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  analysisListReset,
  getMultipleMatchDetail,
  updateMultipleMatchDetail,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { socketService } from "../../../socketManager";

const MultipleMatch = ({}) => {
  const theme = useTheme();
  const { state } = useLocation();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch: AppDispatch = useDispatch();
  const [selectedBetData, setSelectedBetData] = useState([]);
  const { multipleMatchDetail, success } = useSelector(
    (state: RootState) => state.match.analysisList
  );

  const IObets: any = [];
  const sessionBets: any = [];

  const updateMatchDetailToRedux = (event: any) => {
    dispatch(updateMultipleMatchDetail(event));
  };

  useEffect(() => {
    try {
      if (state?.matchIds) {
        socketService.match.leaveAllRooms();
        dispatch(getMultipleMatchDetail(state?.matchIds));
      }
      if (state?.matchIds && state?.matchIds?.length > 0) {
        state?.matchIds?.map((item: any) => {
          socketService.match.joinMatchRoom(item, profileDetail?.roleName);
        });
        state?.matchIds?.map((item: any) => {
          socketService.match.getMatchRates(item, updateMatchDetailToRedux);
        });
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      state?.matchIds?.map((item: any) => {
        socketService.match.leaveMatchRoom(item);
      });
    };
  }, [state?.matchIds]);

  useEffect(() => {
    if (success) {
      dispatch(analysisListReset());
    }
  }, [success]);

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
                  let IObetsData = IObets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );

                  const QuicksessionData = item?.sessionBettings
                    ?.filter((item: any) => !JSON.parse(item).selectionId)
                    ?.map((item: any) => {
                      return item;
                    });

                  const sessionData = item?.sessionBettings
                    ?.filter((item: any) => JSON.parse(item).selectionId)
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
                                    // handleClicked(item?.id);
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
                                  minBet={Math.floor(item?.matchOdd?.minBet)}
                                  maxBet={Math.floor(item?.matchOdd?.maxBet)}
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
                                  minBet={Math.floor(
                                    item?.marketCompleteMatch?.minBet
                                  )}
                                  maxBet={Math.floor(
                                    item?.marketCompleteMatch?.maxBet
                                  )}
                                />
                              )}
                              {item?.apiTideMatch?.isActive && (
                                <MatchOdds
                                  currentMatch={item}
                                  typeOfBet={"Tied Match"}
                                  minBet={Math.floor(
                                    item?.apiTideMatch?.minBet
                                  )}
                                  maxBet={Math.floor(
                                    item?.apiTideMatch?.maxBet
                                  )}
                                />
                              )}
                              {item?.quickBookmaker?.map((bookmaker: any) => {
                                return (
                                  <MatchOdds
                                    currentMatch={item}
                                    session={"manualBookMaker"}
                                    data={bookmaker}
                                    minBet={bookmaker?.minBet || 0}
                                    maxBet={bookmaker?.maxBet || 0}
                                    typeOfBet={bookmaker?.name}
                                    matchOddsData={bookmaker}
                                  />
                                );
                              })}
                              {item?.bookmaker?.isActive && (
                                <LiveBookmaker
                                  currentMatch={item}
                                  minBet={Math.floor(item?.bookmaker?.minBet)}
                                  maxBet={Math.floor(item?.bookmaker?.maxBet)}
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
                                  session={"manualBookMaker"}
                                  minBet={Math.floor(
                                    item?.manualTiedMatch?.minBet
                                  )}
                                  maxBet={Math.floor(
                                    item?.manualTiedMatch?.maxBet
                                  )}
                                />
                              )}

                              {item?.manualSessionActive && (
                                <SessionMarket
                                  title={"Quick Session Market"}
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
                                  max={item?.betFairSessionMaxBet}
                                  min={item?.betFairSessionMinBet}
                                />
                              )}
                              {item?.apiSessionActive && (
                                <SessionMarket
                                  title={"Session Market"}
                                  match={"multiple"}
                                  //   currentOdds={currentOdds}
                                  sessionData={sessionData}
                                  currentMatch={item}
                                  data={[]}
                                  sessionOffline={item?.sessionOffline}
                                  //   sessionExposer={
                                  //     manualSessionHttp?.sessionExposure
                                  //   }
                                  sessionBets={sessionBetsData?.length}
                                  //   setPopData={setPopData}
                                  //   popData={popData}
                                  max={item?.betFairSessionMaxBet}
                                  min={item?.betFairSessionMinBet}
                                />
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
                                IObets={IObetsData}
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
                                // onClick={() => handleClicked(item?.id)}
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
                                minBet={Math.floor(item?.matchOdd?.minBet)}
                                maxBet={Math.floor(item?.matchOdd?.maxBet)}
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
                                minBet={Math.floor(
                                  item?.marketCompleteMatch?.minBet
                                )}
                                maxBet={Math.floor(
                                  item?.marketCompleteMatch?.maxBet
                                )}
                              />
                            )}
                            {item?.apiTideMatch && (
                              <MatchOdds
                                currentMatch={item}
                                typeOfBet={"Tied Match"}
                                minBet={Math.floor(item?.apiTideMatch?.minBet)}
                                maxBet={Math.floor(item?.apiTideMatch?.maxBet)}
                              />
                            )}
                            {item?.bookmaker && (
                              <LiveBookmaker
                                currentMatch={item}
                                minBet={Math.floor(item?.bookmaker?.minBet)}
                                maxBet={Math.floor(item?.bookmaker?.maxBet)}
                                bookmakerLive={item?.bookmaker}
                                data={
                                  item?.bookmaker?.runners?.length > 0
                                    ? item?.bookmaker?.runners
                                    : []
                                }
                              />
                            )}
                            {item?.quickBookmaker?.map((bookmaker: any) => {
                              return (
                                <MatchOdds
                                  currentMatch={item}
                                  session={"manualBookMaker"}
                                  data={bookmaker}
                                  minBet={bookmaker?.minBet || 0}
                                  maxBet={bookmaker?.maxBet || 0}
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
                                minBet={Math.floor(
                                  item?.manualTiedMatch?.minBet
                                )}
                                maxBet={Math.floor(
                                  item?.manualTiedMatch?.maxBet
                                )}
                                matchOddsData={item?.manualTiedMatch}
                              />
                            )}

                            {item?.apiSessionActive && (
                              <SessionMarket
                                title={"Quick Session Market"}
                                sessionData={item?.sessionBettings}
                                currentMatch={item}
                                sessionOffline={item?.sessionOffline}
                                sessionBets={sessionBetsData?.length}
                                max={item?.betFairSessionMaxBet}
                                min={item?.betFairSessionMinBet}
                              />
                            )}
                            {item?.manualSessionActive && (
                              <SessionMarket
                                title={"Session Market"}
                                match={"multiple"}
                                currentMatch={item}
                                sessionOffline={item?.sessionOffline}
                                sessionBets={sessionBetsData?.length}
                                max={item?.betFairSessionMaxBet}
                                min={item?.betFairSessionMaxBet}
                              />
                            )}
                            <FullAllBets
                              tag={true}
                              IObets={IObetsData}
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
            open={false}
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
                  //   matchId={storedMatchid}
                  //   setShowUserProfitLoss={setShowUserProfitLoss}
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
                  // let manualSessionHttp: any = {};
                  // if (manualRateHttp.hasOwnProperty(item?.id)) {
                  //   manualSessionHttp = manualRateHttp[item?.id];
                  // }
                  // let matchOddsDataTemp = item?.bettings?.filter(
                  //   (element: any) => element?.sessionBet === false
                  // );
                  let IObetsData = IObets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );
                  let sessionBetsData = sessionBets?.filter(
                    (element: any) => element?.match_id === item?.id
                  );

                  const QuicksessionData = item?.sessionBettings
                    ?.filter((item: any) => !JSON.parse(item).selectionId)
                    ?.map((item: any) => {
                      return item;
                    });

                  const sessionData = item?.sessionBettings
                    ?.filter((item: any) => JSON.parse(item).selectionId)
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
                            // onClick={() => handleClicked(item?.id)}
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
                            minBet={Math.floor(item?.matchOdd?.minBet)}
                            maxBet={Math.floor(item?.matchOdd?.maxBet)}
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
                            minBet={Math.floor(
                              item?.marketCompleteMatch?.minBet
                            )}
                            maxBet={Math.floor(
                              item?.marketCompleteMatch?.maxBet
                            )}
                          />
                        )}
                        {item?.apiTideMatch?.isActive && (
                          <MatchOdds
                            currentMatch={item}
                            typeOfBet={"Tied Match"}
                            minBet={Math.floor(item?.apiTideMatch?.minBet)}
                            maxBet={Math.floor(item?.apiTideMatch?.maxBet)}
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
                            minBet={Math.floor(item?.bookmaker?.minBet)}
                            maxBet={Math.floor(item?.bookmaker?.maxBet)}
                            bookmakerLive={item?.bookmakerLive}
                            data={
                              item?.bookmaker?.runners?.length > 0
                                ? item?.bookmaker?.runners
                                : []
                            }
                          />
                        )}
                        {item?.quickBookmaker?.map((bookmaker: any) => {
                          return (
                            <MatchOdds
                              key={bookmaker?.id}
                              currentMatch={item}
                              session={"manualBookMaker"}
                              data={bookmaker}
                              minBet={bookmaker?.minBet || 0}
                              maxBet={bookmaker?.maxBet || 0}
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
                            minBet={Math.floor(item?.manualTiedMatch?.minBet)}
                            maxBet={Math.floor(item?.manualTiedMatch?.maxBet)}
                            matchOddsData={item?.manualTiedMatch}
                          />
                        )}

                        {item?.apiSessionActive && (
                          <SessionMarket
                            title={"Quick Session Market"}
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
                            max={item?.betFairSessionMaxBet}
                            min={item?.betFairSessionMinBet}
                          />
                        )}
                        {item?.apiSessionActive && (
                          <SessionMarket
                            title={"Session Market"}
                            match={"multiple"}
                            currentMatch={item}
                            sessionData={sessionData}
                            // currentOdds={currentOdds}
                            sessionOffline={item?.sessionOffline}
                            // sessionExposer={manualSessionHttp?.sessionExposure}
                            sessionBets={sessionBetsData?.length}
                            // setPopData={setPopData}
                            // popData={popData}
                            max={item?.betFairSessionMaxBet}
                            min={item?.betFairSessionMinBet}
                          />
                        )}
                        <FullAllBets
                          tag={true}
                          IObets={IObetsData}
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
            open={false}
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
                  //   matchId={storedMatchid}
                  //   setShowUserProfitLoss={setShowUserProfitLoss}
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
