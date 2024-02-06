import { Box, Typography } from "@mui/material";
import moment from "moment";

const HeaderRow = (props: any) => {
  const { match, timeLeft } = props;
  return (
    <Box
      sx={{
        display: "flex",
        height: "38px",
        flexDirection: "row",
        width: "99.7%",
        alignSelf: "center",
      }}
    >
      <Box
        sx={{
          flex: 1.2,
          background: "#f1c550",
          overflow: "hidden",
          alignItems: { lg: "center", xs: "flex-end" },
          display: "flex",
        }}
      >
        <Typography
          noWrap={true}
          sx={{
            overflow: "hidden",
            marginBottom: "2px",
            fontSize: { lg: "14px", xs: "10px" },
            fontWeight: "bold",
            marginLeft: "7px",
          }}
        >
          {match.teamA} vs {match.teamB}{" "}
          <span style={{ fontWeight: "500" }}>
            ({moment(match.startAt).format("LL")})
          </span>
        </Typography>{" "}
        {/* Today at 9:30 PM */}
      </Box>
      <Box
        sx={{
          flex: 0.1,
          background: "#262626",
          // '#262626'
        }}
      >
        <div className="slanted"></div>
      </Box>

      <Box
        sx={{
          flex: 1,
          background: "#262626",
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: "80%",
            marginRight: "3px",
            borderRadius: "4px",
            width: "110px",
            background: "white",
            justifyContent: "space-evenly",
            display: "flex",
            alignSelf: "flex-end",
            visibility:
              Number(timeLeft.days) === 0 &&
              Number(timeLeft.hours) === 0 &&
              Number(timeLeft.minutes) === 0
                ? "hidden"
                : "visible",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#0B4F26",
              }}
            >
              {timeLeft?.days || 0}
            </Typography>
            <Typography
              sx={{
                fontSize: "8px",
                fontWeight: "400",
                color: "#0B4F26",
              }}
            >
              Days
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#0B4F26",
              }}
            >
              :
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#0B4F26",
              }}
            >
              {timeLeft?.hours || 0}
            </Typography>
            <Typography
              sx={{
                fontSize: "8px",
                fontWeight: "400",
                color: "#0B4F26",
              }}
            >
              Hrs
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                color: "#0B4F26",
              }}
            >
              :
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#0B4F26",
              }}
            >
              {timeLeft?.minutes || 0}
            </Typography>
            <Typography
              sx={{
                fontSize: "8px",
                fontWeight: "400",
                color: "#0B4F26",
              }}
            >
              Min
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderRow;
