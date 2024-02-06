import { Box, Typography } from "@mui/material";
import StockBox from "./StockBox";
import { CHECK } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { checkUserType } from "../../helper";

const MatchListComponent = (props: any) => {
  const { team, team2, selected, mode, data, setSelected } = props;

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
    <Box
      onClick={() => {
        if (mode == "0") {
          navigate(`/${checkUserType()}/market_analysis/matches`, {
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
                  fontSize: { lg: "10px", xs: "10px" },
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
              background: data?.teamA_rate >= 0 ? "#27AC1E" : "#E32A2A",
              width: "38%",
              height: "100%",
              border: "1.5px solid white",
            }}
          >
            <StockBox
              value={data?.teamA_rate ? data?.teamA_rate : 0}
              up={data?.teamA_rate >= 0 ? true : false}
              team={team}
              mode={mode}
            />
          </Box>
          <Box
            sx={{
              background: data?.teamB_rate >= 0 ? "#27AC1E" : "#E32A2A",
              width: "38%",
              height: "100%",
              marginX: "2px",
              border: "1.5px solid white",
            }}
          >
            <StockBox
              value={data?.teamB_rate ? data?.teamB_rate : 0}
              up={data?.teamB_rate >= 0 ? true : false}
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
                data?.totalPlacedBet < 10 && data?.totalPlacedBet > 0
                  ? "0" + data?.totalPlacedBet
                  : data?.totalPlacedBet
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
  );
};

export default MatchListComponent;
