import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SeparateBox from "./SeparateBox";

const TeamDetailRow = (props: any) => {
  const { teamName, runnerNumber, match } = props;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "40px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: "40%",
            alignItems: "center",
          }}
        >
          {/* {image !== null && (
            <img
              src={`${apiBasePath}/${image}`}
              style={{ width: "25px", height: "25px", marginLeft: "10px" }}
              alt={image}
            />
          )} */}
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "10px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {teamName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { lg: "60%", xs: "80%" },
            justifyContent: { xs: "flex-end", lg: "flex-end" },
            alignItems: "center",
          }}
        >
          {/* {!matchesMobile && (
            <SeparateBox
              value={
                matchOddsLive?.runners?.length &&
                matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack
                  ?.length > 0
                  ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack[2]
                      ?.price
                  : 0
              }
              value2={formatNumber(
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack
                    ?.length > 0
                  ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack[2]
                      ?.size
                  : 0
              )}
              color={matchesMobile ? "white" : "#CEEBFF"}
            />
          )} */}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          {/* {!matchesMobile && (
            <SeparateBox
              value={
                matchOddsLive?.runners?.length &&
                matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack
                  ?.length > 0
                  ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack[1]
                      ?.price
                  : 0
              }
              value2={formatNumber(
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack
                    ?.length > 0
                  ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack[1]
                      ?.size
                  : 0
              )}
              color={matchesMobile ? "white" : "#C2E6FF"}
            />
          )} */}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          <SeparateBox
            value={
              (runnerNumber == 0
                ? match?.back1 || match?.section?.[0]?.odds?.[0]?.odds || 0
                : runnerNumber == 1
                ? match?.back11 || match?.section?.[1]?.odds?.[0]?.odds || 0
                : runnerNumber == 2
                ? match?.back12 || match?.section?.[2]?.odds?.[0]?.odds || 0
                : 0) ?? 0
            }
            value2={""}
            color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
          />
          <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
          <SeparateBox
            value={
              (runnerNumber == 0
                ? match?.lay1 || match?.section?.[0]?.odds?.[1]?.odds || 0
                : runnerNumber == 1
                ? match?.lay11 || match?.section?.[1]?.odds?.[1]?.odds || 0
                : runnerNumber == 2
                ? match?.lay12 || match?.section?.[2]?.odds?.[1]?.odds || 0
                : 0) ?? 0
            }
            value2={""}
            color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
          />
          <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
        </Box>
      </Box>
    </>
  );
};

export default TeamDetailRow;
