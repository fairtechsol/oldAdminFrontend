import { Box, Typography } from "@mui/material";
import StockBox from "./StockBox";
import { CHECK } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { Constants } from "../../utils/Constants";

const MatchListComponent = (props: any) => {
  const { team, team2, selected, mode, data, setSelected} = props;

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  function calculateTimeLeft() {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const targetDate = moment(data?.startAt).tz(timezone);
      const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          days:
            ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) ||
            0,
          hours:
            ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(
              -2
            ) || 0,
          minutes:
            ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || 0,
          seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || 0,
        };
      } else {
        timeLeft = {
          days: "00",
          hours: "00",
          minutes: "00",
        };
      }

      return timeLeft;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const upcoming =
    Number(timeLeft.days) === 0 &&
    Number(timeLeft.hours) === 0 &&
    Number(timeLeft.minutes) <= 30;
  return (
    <>
      <style scoped>
        {`
          @keyframes gradient {
            0% {
              background-position: 0% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }

          .liveAnimation {
            overflow: hidden;
            background: linear-gradient(
              315deg,
              rgb(117 255 0) 3%,
              rgb(177 60 206) 38%,
              rgb(255 0 233) 68%,
              rgba(255, 25, 25, 1) 98%
            );
            animation: gradient 5s ease infinite;
            background-size: 400% 400%;
            background-attachment: fixed;
            position: absolute;
            top: 0;
            left: -9px;
            width: 60px;
          }
          .wave {
            border-radius: 1000% 1000% 0 0;

            height: 12em;
            animation: wave 10s -3s linear infinite;
            transform: translate3d(0, 0, 0);
            opacity: 0.8;
            bottom: 0;
            left: 0;
            z-index: -1;
            background: linear-gradient(
              315deg,
              rgba(101, 0, 94, 1) 3%,
              rgba(60, 132, 206, 1) 38%,
              rgba(48, 238, 226, 1) 68%,
              rgba(255, 25, 25, 1) 98%
            );
          }
          @keyframes wave {
            2% {
              transform: translateX(1);
            }

            25% {
              transform: translateX(-25%);
            }

            50% {
              transform: translateX(-50%);
            }

            75% {
              transform: translateX(-25%);
            }

            100% {
              transform: translateX(1);
            }
          }
          @media only screen and (max-width: 575px) {
            .liveAnimation {
              top: -2px;
              left: -8px;
              height: 18px;
            }
          }
        `}
      </style>
      <Box
        onClick={() => {
          if (mode == "0") {
            navigate(`${Constants.oldAdmin}market_analysis/matches`, {
              state: { submit: true, matchId: data?.id },
            });
          }
          setSelected();
        }}
        sx={{
          cursor: "pointer",
          width: "99%",
          display: "flex",
          position: "relative",
          margin: { xs: "4px", md: "6px", lg: "6px 0" },
          alignSelf: "center",
          justifyContent: "space-evenly",
          height: "55px",
          flexDirection: { xs: "column", lg: "row" },
          marginX: ".5%",
        }}
      >
        <Box sx={{ display: "flex", width: "100%", position: "relative" }}>
          {mode == "1" && (
            <Box
              sx={{
                width: "55px",
                height: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1.5px solid white",
                background: !selected ? "#46CF4D" : "rgba(0,0,0,.5)",
              }}
            >
              <img src={CHECK} style={{ width: "40px", height: "40px" }} />
            </Box>
          )}
          <Box
            sx={{
              position: "relative",
              background: "#F8C851",
              paddingY: { xs: 0.5, lg: 0 },
              width: { xs: "36%", lg: "45%" },
              height: "100%",
              display: "flex",
              alignItems: "center",
              marginX: "2px",
              border: "1.5px solid white",
              minHeight: "30px",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "16px", xs: "10px" },
                fontWeight: "bold",
                marginLeft: "5px",

                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {team} Vs {team2}
            </Typography>
            {upcoming && (
              <Box
                className="liveAnimation"
                sx={{
                  backgroundSize: "400% 400%",
                  position: "absolute",
                  zIndex: 11,
                  width: "50px",
                  height: "15px",
                  top: "-8px",
                  marginTop: -1,
                  left: mode == "1" ? "65px" : "10px",
                  background: "#46CF4D",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid white",
                  borderRadius: "3px",
                }}
              >
                <Box className="wave"> </Box>
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "white",
                    fontStyle: "italic",
                  }}
                >
                  LIVE NOW
                </Typography>
              </Box>
            )}

            {!upcoming && (
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 11,
                  width: "70px",
                  height: "15px",
                  top: "-10px",

                  left: "-1px",
                  background: "#129FFE",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid white",
                  borderRadius: "3px",
                }}
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontSize: { lg: "10px", xs: "10px" },
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  UPCOMING
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "64%",
              alignSelf: "center",
              display: "flex",
              height: "100%",
            }}
          >
            <Box
              sx={{
                background: data?.teamARate >= 0 ? "#27AC1E" : "#E32A2A",
                width: "38%",
                height: "100%",
                border: "1.5px solid white",
              }}
            >
              <StockBox
                value={
                  data?.teamARate
                    ?  data?.teamARate
                    : 0
                }
                up={data?.teamARate >= 0 ? true : false}
                team={team}
                mode={mode}
              />
            </Box>
            <Box
              sx={{
                background: data?.teamBRate >= 0 ? "#27AC1E" : "#E32A2A",
                width: "38%",
                height: "100%",
                marginX: "2px",
                border: "1.5px solid white",
              }}
            >
              <StockBox
                value={
                  data?.teamBRate
                    ? data?.teamBRate
                    : 0
                }
                up={data?.teamBRate >= 0 ? true : false}
                team={team2}
                mode={mode}
              />
            </Box>
            <Box
              sx={{
                background: "#0B4F26",
                width: "23%",
                height: "100%",
                border: "1.5px solid white",
              }}
            >
              <StockBox
                value={
                  data?.totalBet < 10 && data?.totalBet > 0
                    ? "0" + data?.totalBet
                    : data?.totalBet
                }
                team={"Total Bet"}
                mode={mode}
              />
            </Box>
          </Box>
          {!upcoming && (
            <Box
              sx={{
                width: "99.67%",
                marginRight: ".1%",
                height: "94%",
                marginTop: "1.5px",
                background: "rgba(0,0,0,.6)",
                position: "absolute",
                right: 0,
              }}
            ></Box>
          )}
          {selected && mode == "1" && (
            <Box
              sx={{
                width: "99.67%",
                marginRight: ".1%",
                height: "94%",
                marginTop: "1.5px",
                background: "rgba(0,0,0,.6)",
                position: "absolute",
                right: 0,
              }}
            ></Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MatchListComponent;
