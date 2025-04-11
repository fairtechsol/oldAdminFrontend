import { Box, Typography } from "@mui/material";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { MatchComponentInterface } from "../../interface/inplay";
import BackLayRow from "./BackLayRow";
import Divider from "./Divider";
import HeaderRow from "./HeaderRow";
import TeamDetailRow from "./TeamDetailRow";

const MatchComponent = ({
  onClick,
  top,
  blur,
  match,
}: MatchComponentInterface) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
  });

  const calculateTimeLeft = () => {
    const diff = moment(match?.startAt).diff(moment());
    return diff > 0
      ? {
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
          2,
          "0"
        ),
        minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
          2,
          "0"
        ),
      }
      : { days: "00", hours: "00", minutes: "00" };
  };

  const upcoming: any =
    Number(timeLeft?.days) === 0 &&
    Number(timeLeft?.hours) === 0 &&
    Number(timeLeft?.minutes) <= 30;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 100);
    return () => clearInterval(timer);
  }, [match?.startAt]);

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
        sx={{
          position: "relative",
          marginY: { xs: "13px", lg: "3px" },
          marginTop: {
            xs: top ? "20px" : "1.2vh",
            lg: top ? "25px" : "1vh",
            md: top ? "25px" : "1vh",
            sm: top ? "20px" : "1vh",
          },
          width: { xs: "98%", lg: "97.8%" },
          marginX: "1vw",
          padding: 0.1,
          background: "white",
        }}
      >
        {!upcoming && (
          <Box
            onClick={onClick}
            sx={{
              position: "absolute",
              cursor: "pointer",
              zIndex: 2,
              background: "rgba(0,0,0,0.5)",
              width: "100%",
              right: 0,
              height: "100%",
            }}
          />
        )}
        {!upcoming && (
          <Box
            sx={{
              width: "70px",
              zIndex: 3,
              border: "1px solid white",
              height: { xs: "20px", lg: "13px" },
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              background: "#129FFE",
              position: "absolute",
              marginTop: { xs: "-10px", lg: -1 },
              borderRadius: "3px",
              marginLeft: { xs: "0", lg: "0" },
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
        <Box
          onClick={onClick}
          sx={{
            zIndex: 0,
            filter: blur ? "blur(0px)" : null,
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignSelf: {
              xs: "center",
              mg: "center",
              lg: "flex-start",
            },
            background: "white",
            cursor: "pointer",
          }}
        >
          {upcoming && (
            <Box
              className="liveAnimation"
              sx={{
                width: "70px",
                border: "1px solid white",
                height: { xs: "20px", lg: "13px" },
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                background: "#46CF4D",
                position: "absolute",
                marginTop: -1,
                borderRadius: "3px",
                marginLeft: 1,
              }}
            >
              <Box className="wave" />
              <Typography
                sx={{
                  fontStyle: "italic",
                  fontSize: { lg: "10px", xs: "10px" },
                  fontWeight: "600",
                  color: "white",
                }}
              >
                LIVE NOW
              </Typography>
            </Box>
          )}
          <HeaderRow match={match} timeLeft={timeLeft} />
          <BackLayRow />
          <TeamDetailRow
            teamName={match.teamA}
            runnerNumber={0}
            match={match}
          />
          {match.teamB && (
            <>
              <Divider />
              <TeamDetailRow
                teamName={match.teamB}
                runnerNumber={1}
                match={match}
              />
            </>
          )}
          {match.teamC && (
            <>
              <Divider />
              <TeamDetailRow
                teamName={match.teamC}
                runnerNumber={2}
                match={match}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MatchComponent;