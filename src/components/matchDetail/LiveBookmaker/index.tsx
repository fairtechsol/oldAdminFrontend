import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { ARROWUP, LOCKED, LOCKOPEN } from "../../../assets";
import SmallBox from "../MatchOdds/SmallBox";
import Divider from "../../Inplay/Divider";
import BoxComponent from "./BoxComponent";

const LiveBookmaker = (props: any) => {
  const {
    currentMatch,
    data,
    blockMatch,
    showUnlock,
    locked,
    handleShowLock,
    selft,
    minBet,
    maxBet,
  } = props;

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
    return data?.ex?.availableToLay?.length > 0 ? false : true;
  };
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        marginY: "3px",
        width: "100%",
        alignSelf: { xs: "center", md: "center", lg: "flex-start" },
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
            Bookmaker Market
          </Typography>
          {blockMatch && (
            <img
              onClick={() =>
                selft || selft == undefined
                  ? handleShowLock(true, "BOOKMAKER")
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
            justifyContent: { lg: "flex-end", xs: "flex-end" },
            padding: { lg: "0", xs: "0" },
          }}
        >
          <SmallBox
            color={"#FF4D4D"}
            valueA={bookRatioA(
              currentMatch?.profitLossDataMatch?.teamARate,
              currentMatch?.profitLossDataMatch?.teamBRate
            )}
            valueB={bookRatioB(
              currentMatch?.profitLossDataMatch?.teamARate,
              currentMatch?.profitLossDataMatch?.teamBRate
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
      <Divider />
      {visible && (
        <>
          <>
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
                  MIN: {minBet} MAX:
                  {maxBet}
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
              </Box>
            </Box>
          </>

          <Box sx={{ position: "relative", width: "99.8%" }}>
            <BoxComponent
              // color={"#46e080"}
              teamImage={currentMatch?.teamA_Image}
              name={currentMatch?.teamA}
              rates={
                currentMatch?.profitLossDataMatch?.teamARate
                  ? currentMatch?.profitLossDataMatch?.teamARate
                  : 0
              }
              color={
                currentMatch?.profitLossDataMatch?.teamARate <= 0
                  ? "#FF4D4D"
                  : "#319E5B"
              }
              data={data?.length > 0 ? data[0] : []}
              lock={handleLock(data?.length > 0 ? data[0] : [])}
            />
            <Divider />
            <BoxComponent
              // color={"#FF4D4D"}
              // lock={true}
              teamImage={currentMatch?.teamB_Image}
              name={currentMatch?.teamB}
              rates={
                currentMatch?.profitLossDataMatch?.teamBRate
                  ? currentMatch?.profitLossDataMatch?.teamBRate
                  : 0
              }
              color={
                currentMatch?.profitLossDataMatch?.teamBRate <= 0
                  ? "#FF4D4D"
                  : "#319E5B"
              }
              data={data?.length > 0 ? data[1] : []}
              lock={handleLock(data?.length > 0 ? data[1] : [])}
              align="end"
            />
            {currentMatch?.teamC ? (
              <>
                <Divider />
                <BoxComponent
                  teamImage={
                    currentMatch?.teamC_Image ? currentMatch?.teamC_Image : null
                  }
                  // color={"#FF4D4D"}
                  color={
                    currentMatch?.profitLossDataMatch?.teamCRate <= 0
                      ? "#FF4D4D"
                      : "#46e080"
                  }
                  name={currentMatch?.teamC}
                  rates={
                    currentMatch?.profitLossDataMatch?.teamCRate
                      ? currentMatch?.profitLossDataMatch?.teamCRate
                      : 0
                  }
                  data={data?.length > 0 ? data[2] : []}
                  lock={handleLock(data?.length > 0 ? data[2] : [])}
                  align="end"
                />
              </>
            ) : null}
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
                      marginLeft: "-25px",
                      fontSize: "20px",
                      marginTop: "20px",
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
          {/* <UnlockComponent
            unlock={locked}
            title={(locked ? "Unlock " : "Lock ") + "Bookmaker Market"}
            handleHide={handleHide}
            onSubmit={onSubmit}
          /> */}
        </Box>
      )}
    </Box>
  );
};

export default LiveBookmaker;
