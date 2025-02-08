import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ARROWUP, LOCKED, LOCKOPEN } from "../../../assets";
import { formatToINR } from "../../../helper";
import { RootState } from "../../../store/store";
import CommissionDot from "../../Common/CommissionDot";
import Divider from "../../Inplay/Divider";
import UnlockComponent from "../../lockMatchDetailComponent/UnlockComponent";
import BoxComponent from "../LiveBookmaker/BoxComponent";
import SmallBox from "../MatchOdds/SmallBox";

const TournamentOdds = (props: any) => {
  const {
    currentMatch,
    minBet,
    maxBet,
    typeOfBet,
    locked,
    blockMatch,
    handleShowLock,
    selft,
    showBox,
    upcoming,
    showUnlock,
    handleBlock,
    handleHide,
    liveData,
    title,
    profitLossFromAnalysis,
  } = props;
  const { marketAnalysis } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const [visible, setVisible] = useState(true);

  const bookRatioA = (teamARates: any, teamBRates: any) => {
    const bookRatio = teamARates != 0 ? teamBRates / teamARates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamARates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const bookRatioB = (teamARates: any, teamBRates: any) => {
    const bookRatio = teamBRates != 0 ? teamARates / teamBRates || 0 : 0;
    const formattedRatio = Math.abs(bookRatio).toFixed(2);
    return teamBRates < 0 ? `-${formattedRatio}` : formattedRatio;
  };

  const handleLock = (data: any) => {
    return data?.ex?.availableToBack?.length > 0 ? false : true;
  };

  const onSubmit = (value: any) => {
    handleBlock(value, !locked, typeOfBet);
  };
  return (
    <Box
      key="odds"
      sx={{
        position: "relative",
        display: "flex",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        width: "100%",
        marginTop: typeOfBet == "Quick Bookmaker" ? "0" : "3px",
        marginBottom: typeOfBet == "Quick Bookmaker" ? "3px" : "0",
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
          position: "relative",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "99.7%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "12px", xs: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            {typeOfBet === "MANUAL BOOKMAKER"
              ? "QUICK BOOKMAKER"
              : title
              ? title
              : typeOfBet}
          </Typography>
          {liveData?.isCommissionActive && <CommissionDot />}
          {blockMatch && (
            <img
              onClick={() => (selft ? handleShowLock(true, typeOfBet) : "")}
              src={locked ? LOCKED : LOCKOPEN}
              style={{ width: "14px", height: "20px" }}
            />
          )}
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <div className="slanted"></div>
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: { lg: "flex-end", xs: "flex-end" },
            paddingRight: { lg: "0", xs: "0" },
          }}
        >
          <SmallBox
            valueA={bookRatioA(
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.a
                  : 0
                : currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[
                    liveData?.id + "_profitLoss_" + currentMatch?.id
                  ]
                  ? JSON.parse(
                      currentMatch?.profitLossDataMatch[
                        liveData?.id + "_profitLoss_" + currentMatch?.id
                      ] || "{}"
                    )?.[liveData?.runners?.[0]?.id]
                  : 0
                : 0,
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.b
                  : 0
                : currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[
                    liveData?.id + "_profitLoss_" + currentMatch?.id
                  ]
                  ? JSON.parse(
                      currentMatch?.profitLossDataMatch[
                        liveData?.id + "_profitLoss_" + currentMatch?.id
                      ] || "{}"
                    )?.[liveData?.runners?.[1]?.id]
                  : 0
                : 0
            )}
            valueB={bookRatioB(
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.a
                  : 0
                : currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[
                    liveData?.id + "_profitLoss_" + currentMatch?.id
                  ]
                  ? JSON.parse(
                      currentMatch?.profitLossDataMatch[
                        liveData?.id + "_profitLoss_" + currentMatch?.id
                      ] || "{}"
                    )?.[liveData?.runners?.[0]?.id]
                  : 0
                : 0,
              marketAnalysis?.betType
                ? profitLossFromAnalysis
                  ? profitLossFromAnalysis?.profitLoss?.b
                  : 0
                : currentMatch?.profitLossDataMatch
                ? currentMatch?.profitLossDataMatch[
                    liveData?.id + "_profitLoss_" + currentMatch?.id
                  ]
                  ? JSON.parse(
                      currentMatch?.profitLossDataMatch[
                        liveData?.id + "_profitLoss_" + currentMatch?.id
                      ] || "{}"
                    )?.[liveData?.runners?.[1]?.id]
                  : 0
                : 0
            )}
          />
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      {visible && (
        <>
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "25px",
              borderTop: "2px solid white",
              width: "99.7%",
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "'#319E5B'",
                height: "25px",
                width: "40%",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { lg: "11px", xs: "9px" },
                  marginLeft: "7px",
                }}
              >
                MIN:{formatToINR(minBet)} MAX: {formatToINR(maxBet)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { lg: "60%", xs: "80%" },
                justifyContent: { lg: "flex-end", xs: "flex-end" },
              }}
            >
              <Box
                sx={{
                  background: "#00C0F9",
                  border: "1px solid #2626264D",
                  width: { lg: "5vw", xs: "30%" },
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                >
                  Back
                </Typography>
              </Box>
              <Box
                sx={{ width: "3px", display: "flex", background: "white" }}
              ></Box>
              <Box
                sx={{
                  background: "#FF9292",
                  border: "1px solid #2626264D",
                  width: { lg: "5vw", xs: "30%" },
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: "12px", color: "black", fontWeight: "600" }}
                >
                  Lay
                </Typography>
              </Box>
              <Box
                sx={{ width: ".7px", display: "flex", background: "white" }}
              ></Box>
            </Box>
          </Box>

          <Box sx={{ position: "relative", width: "99.8%", background: "red" }}>
            {(upcoming ||
              showBox ||
              !liveData?.isActive||
              (!["ACTIVE", "OPEN", ""].includes(liveData?.status) &&
                liveData?.gtype == "match")) && (
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  // top: "18%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .71)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "12px", lg: "22px" },
                    textTransform: "uppercase",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "400",
                  }}
                >
                  {!["ACTIVE", "OPEN", ""].includes(liveData?.status) &&
                  liveData?.gtype == "match"
                    ? liveData?.status
                    : ""}
                </Typography>
              </Box>
            )}
            {liveData?.runners?.map((runner: any, index: number) => (
              <>
                <BoxComponent
                  name={runner?.nat || runner?.runnerName}
                  rates={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis
                        ? profitLossFromAnalysis?.profitLoss?.[
                            String.fromCharCode(97 + index)
                          ]
                        : 0
                      : currentMatch?.profitLossDataMatch?.[
                          liveData?.id +
                            "_" +
                            "profitLoss" +
                            "_" +
                            currentMatch?.id
                        ]
                      ? JSON.parse(
                          currentMatch?.profitLossDataMatch?.[
                            liveData?.id +
                              "_" +
                              "profitLoss" +
                              "_" +
                              currentMatch?.id
                          ]
                        )?.[runner?.id]
                      : 0
                  }
                  color={
                    marketAnalysis?.betType
                      ? profitLossFromAnalysis?.profitLoss?.[
                          String.fromCharCode(97 + index)
                        ] < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : currentMatch?.profitLossDataMatch?.[
                          liveData?.id +
                            "_" +
                            "profitLoss" +
                            "_" +
                            currentMatch?.id
                        ]
                      ? JSON.parse(
                          currentMatch?.profitLossDataMatch?.[
                            liveData?.id +
                              "_" +
                              "profitLoss" +
                              "_" +
                              currentMatch?.id
                          ]
                        )?.[runner?.id] < 0
                        ? "#FF4D4D"
                        : "#319E5B"
                      : "#319E5B"
                  }
                  data={runner}
                  lock={handleLock(runner)}
                  marketDetails={liveData}
                />
                <Divider />
              </>
            ))}

            {/* <BoxComponent
              name={
                typeOfBet !== ("Match Odds" || "Half Time")
                  ? "Yes"
                  : currentMatch?.teamA
              }
              rates={
                currentMatch?.profitLossDataMatch
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.A +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : 0
              }
              color={
                currentMatch?.profitLossDataMatch
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.A +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.A +
                          "_" +
                          currentMatch?.id
                      ] < 0
                      ? "#FF4D4D"
                      : "#319E5B"
                    : "#319E5B"
                  : "#319E5B"
              }
              data={liveData?.length > 0 ? liveData[0] : []}
              lock={handleLock(liveData?.length > 0 ? liveData[0] : [])}
            />
            <Divider />
            <BoxComponent
              color={
                currentMatch?.profitLossDataMatch
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.B +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          currentMatch?.id
                      ] < 0
                      ? "#FF4D4D"
                      : "#319E5B"
                    : "#319E5B"
                  : "#319E5B"
              }
              name={
                typeOfBet !== ("Match Odds" || "Half Time")
                  ? "No"
                  : currentMatch?.teamB
              }
              rates={
                currentMatch?.profitLossDataMatch
                  ? currentMatch?.profitLossDataMatch[
                      profitLossDataForMatchConstants[liveData?.type]?.B +
                        "_" +
                        currentMatch?.id
                    ]
                    ? currentMatch?.profitLossDataMatch[
                        profitLossDataForMatchConstants[liveData?.type]?.B +
                          "_" +
                          currentMatch?.id
                      ]
                    : 0
                  : 0
              }
              data={liveData?.length > 0 ? liveData[1] : []}
              lock={handleLock(liveData?.length > 0 ? liveData[1] : [])}
              align="end"
            /> */}
            {locked && (
              <Box
                sx={{
                  background: "rgba(0,0,0,.5)",
                  width: "100%",
                  height: currentMatch?.teamC ? "150px" : "105px",
                  position: "absolute",
                  top: "-24px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  display: "flex",
                  zIndex: "999",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    alignSelf: "flex-end",
                    height: currentMatch?.teamC ? "150px" : "105px",
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <img src={LOCKED} style={{ width: "35px", height: "40px" }} />

                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "600",
                      marginLeft: "15px",
                      fontSize: "20px",
                      marginTop: "12px",
                    }}
                  >
                    Locked
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </>
      )}
      {false && (
        <Box
          sx={{
            position: "absolute",
            width: { xs: "90%", lg: "100%" },
            background: "transparent",
            alignSelf: "center",
            marginTop: "38px",
            left: { xs: "10%", lg: "20%" },
            zIndex: 999,
          }}
        >
          <UnlockComponent
            unlock={locked}
            title={(locked ? "Unlock " : "Lock ") + "Manual Bookmaker Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
          />
        </Box>
      )}

      {showUnlock && liveData?.type === "matchOdd" && (
        <Box
          sx={{
            position: "absolute",
            width: { xs: "90%", lg: "100%" },
            background: "transparent",
            alignSelf: "center",
            marginTop: "38px",
            left: { xs: "10%", lg: "20%" },
            zIndex: 999,
          }}
        >
          <UnlockComponent
            unlock={locked}
            title={(locked ? "Unlock " : "Lock ") + typeOfBet + " Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
          />
        </Box>
      )}
    </Box>
  );
};

export default TournamentOdds;
