import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ARROWUP, LOCKED, LOCKOPEN } from "../../../assets";
import { customSort } from "../../../helper";
import { RootState } from "../../../store/store";
import { sessionBettingType } from "../../../utils/Constants";
import Divider from "../../Inplay/Divider";
import UnlockComponent from "../../lockMatchDetailComponent/UnlockComponent";
import BetsCountBox from "./BetsCountBox";
import SeasonMarketBox from "./SeasonMarketBox";

const SessionMarket = (props: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const {
    blockMatch,
    showUnlock,
    locked,
    handleShowLock,
    selft,
    title,
    min,
    sessionData,
    allBetsData,
    currentMatch,
    type,
    handleBlock,
    handleHide,
  } = props;
  const [visible, setVisible] = useState(true);
  const { marketAnalysis } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const onSubmit = (value: any) => {
    handleBlock(value, !locked, "SESSION");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: 0.3,
          flexDirection: "column",
          marginBottom: "3px",
          width: "100%",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
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
                fontSize: {
                  lg: "13px",
                  md: "12px",
                  xs: matchesMobile ? "12px" : "12px",
                },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {blockMatch && (
              <img
                onClick={() =>
                  selft || selft == undefined
                    ? handleShowLock(true, `${title}`)
                    : ""
                }
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
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ gap: "4px", display: "flex" }}>
              <BetsCountBox
                total={
                  marketAnalysis?.betType
                    ? marketAnalysis?.betType?.session
                        ?.filter((item: any) => item.type == type)
                        ?.reduce((prev: number, session: any) => {
                          prev += session?.profitLoss?.totalBet || 0;
                          return prev;
                        }, 0)
                    : allBetsData
                        ?.filter(
                          (item: any) =>
                            JSON.parse(
                              currentMatch?.sessionBettings?.find(
                                (items: any) =>
                                  JSON.parse(items)?.id == item?.betId
                              ) || "{}"
                            )?.type == type
                        )
                        ?.reduce((acc: number, bet: any) => {
                          return acc + +bet?.totalBet;
                        }, 0)
                }
              />
              {/* static code */}
              <Box
                sx={{
                  width: { lg: "72px", xs: "50px" },
                  flexDirection: "column",
                  // position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30px",
                  background: "white",
                  borderRadius: "3px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "8px", lg: "8px" },
                    fontWeight: "bold",
                    color: "#FF4D4D",
                  }}
                >
                  Amount
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "14px", lg: "14px" },
                    fontWeight: "bold",
                    color: "#0B4F26",
                    lineHeight: 1,
                  }}
                >
                  {/* {allBetsData?.reduce((acc: number, bet: any) => {
                    let total = Number(acc) + Number(bet?.maxLoss);
                    return Number(total)?.toFixed(2);
                  }, 0)} */}
                  {new Intl.NumberFormat("en-IN").format(
                    parseFloat(
                      marketAnalysis?.betType
                        ? marketAnalysis?.betType?.session
                            ?.filter((item: any) => item.type == type)
                            ?.reduce((prev: number, session: any) => {
                              prev += +session?.profitLoss?.maxLoss || 0;
                              return prev;
                            }, 0)
                        : allBetsData
                            ?.filter(
                              (item: any) =>
                                JSON.parse(
                                  currentMatch?.sessionBettings?.find(
                                    (items: any) =>
                                      JSON.parse(items)?.id == item?.betId
                                  ) || "{}"
                                )?.type == type
                            )
                            ?.reduce((acc: number, bet: any) => {
                              return acc + (Number(bet?.maxLoss) || 0);
                            }, 0)
                            .toFixed(2)
                    )
                  )}
                </Typography>
              </Box>
            </Box>
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
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {
              <Box
                sx={{
                  display: "flex",
                  background: "#319E5B",
                  height: "25px",
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
                    MIN: {min}
                    {/* MAX:
                    {max} */}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    background: "#319E5B",
                    height: "25px",
                    width: { lg: "60%", xs: "81%" },
                    justifyContent: { lg: "flex-end", xs: "flex-end" },
                  }}
                >
                  <Box
                    sx={{
                      background:
                        sessionBettingType.oddEven == type
                          ? "#00C0F9"
                          : "#FF9292",
                      width: { lg: "5.02vw", xs: "30.06%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {sessionBettingType.oddEven == type
                        ? "BACK"
                        : sessionBettingType.fancy1 == type
                        ? "LAY"
                        : "NO"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ width: "3px", display: "flex", background: "white" }}
                  ></Box>
                  <Box
                    sx={{
                      background: "#00C0F9",
                      width: { lg: "5.05vw", xs: "30%" },
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      {[
                        sessionBettingType.oddEven,
                        sessionBettingType.fancy1,
                      ].includes(type)
                        ? "BACK"
                        : "YES"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            }
            {locked && (
              <Box
                sx={{
                  position: "absolute",
                  height: "86%",
                  top: "14%",
                  width: "100%",
                  display: "flex",
                  zIndex: "999",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0, 0, 0, .6)",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "60%", lg: "20%", md: "60%" },
                  }}
                ></Box>
                <Box
                  sx={{
                    width: { xs: "40%", lg: "60%", md: "40%" },
                    gap: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={LOCKED} style={{ width: "35px", height: "40px" }} />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      margin: "20px 0px 0px -25px",
                      fontSize: "20px",
                      color: "#FFF",
                    }}
                  >
                    {" "}
                    Locked{" "}
                  </Typography>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // maxHeight: "160px",
                width: "100%",
                position: "relative",
              }}
            >
              {sessionData?.length > 0 &&
                sessionData
                  ?.slice()
                  .sort(customSort)
                  ?.map((element: any, index: any) => {
                    return (
                      <Box
                        key={
                          title === "Quick Session Market"
                                        ? JSON.parse(element)?.id
                                        : element?.id
                        }
                        sx={{
                          width: "100%",
                          display: element?.betStatus === 2 ? "none" : "block",
                        }}
                      >
                        <SeasonMarketBox
                          newData={
                            title === "Quick Session Market"
                              ? JSON.parse(element)
                              : element
                          }
                          profitLossData={
                            marketAnalysis?.betType
                              ? [
                                  marketAnalysis?.betType?.session?.find(
                                    (item: any) =>
                                      item.betId ==
                                      (title === "Quick Session Market"
                                        ? JSON.parse(element)?.id
                                        : element?.id)
                                  )?.profitLoss,
                                ]
                              : allBetsData?.filter(
                                  (item: any) =>
                                    item?.betId ===
                                    (title === "Quick Session Market"
                                      ? JSON.parse(element)?.id
                                      : element?.id)
                                )
                          }
                          index={index}
                          type={type}
                        />
                        <Divider />
                      </Box>
                    );
                  })}
            </Box>
            {showUnlock && (
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
                  title={(locked ? "Unlock " : "Lock ") + title}
                  handleHide={handleHide}
                  onSubmit={onSubmit}
                />
              </Box>
            )}
            {showUnlock && (
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
                  title={(locked ? "Unlock " : "Lock ") + title}
                  handleHide={handleHide}
                  onSubmit={onSubmit}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default SessionMarket;
