import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { formatNumber } from "../../helper";
import SeparateBox from "./SeparateBox";

const TeamDetailRow = (props: any) => {
  const { teamName, runnerNumber, matchOddsLive } = props;
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
            justifyContent: { xs: "flex-end", lg: "center" },
            alignItems: "center",
          }}
        >
          {!matchesMobile && (
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
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
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
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          <SeparateBox
            value={
              matchOddsLive?.runners?.length &&
              matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack
                ?.length > 0
                ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack[0]
                    ?.price
                : 0
            }
            value2={formatNumber(
              matchOddsLive?.runners?.length &&
                matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack
                  ?.length > 0
                ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToBack[0]
                    ?.size
                : 0
            )}
            color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
          />
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          <SeparateBox
            value={
              matchOddsLive?.runners?.length &&
              matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay?.length >
                0
                ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay[0]
                    ?.price
                : 0
            }
            value2={formatNumber(
              matchOddsLive?.runners?.length &&
                matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay
                  ?.length > 0
                ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay[0]
                    ?.size
                : 0
            )}
            color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
          />
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
            <SeparateBox
              value={
                matchOddsLive?.runners?.length &&
                matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay
                  ?.length > 0
                  ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay[1]
                      ?.price
                  : 0
              }
              value2={formatNumber(
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay
                    ?.length > 0
                  ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay[1]
                      ?.size
                  : 0
              )}
              color={matchesMobile ? "white" : "#F2CBCB"}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
          {!matchesMobile && (
            <SeparateBox
              value={
                matchOddsLive?.runners?.length &&
                matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay
                  ?.length > 0
                  ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay[2]
                      ?.price
                  : 0
              }
              value2={formatNumber(
                matchOddsLive?.runners?.length &&
                  matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay
                    ?.length > 0
                  ? matchOddsLive?.runners[runnerNumber]?.ex?.availableToLay[2]
                      ?.size
                  : 0
              )}
              color={matchesMobile ? "white" : "#ECD6D6"}
            />
          )}
          <Box
            sx={{ width: ".25%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      </Box>
    </>
  );
};

export default TeamDetailRow;
