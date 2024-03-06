import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import StyledImage from "../../Common/StyledImages";
import { BallStart, LockSolid } from "../../../assets";
import MoneyBox from "./MoneyBox";
import SeperateBox from "./SeperateBox";

const TeamRowComponent = (props: any) => {
  const {
    name,
    color,
    align,
    lock,
    rates,
    matchOddsData,
    ballStatus,
    status,
    isTeamC,
  } = props;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "40px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          background: "white",
          position: "relative",
          height: "40px",
          width: "40%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* {teamImage !== null && (
            <>
              <img
                src={`${"wallet"}/${teamImage}`}
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "10px",
                  backgroundSize: "contains",
                }}
                alt={name}
              />
            </>
          )} */}
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "14px", xs: "13px" },
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            {name}
          </Typography>
        </Box>
      </Box>

      {ballStatus ? (
        <Box
          sx={{
            background: "#000",
            height: isTeamC ? "125px" : "82px",
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 10,
            width: { lg: "30%", xs: "40.5%" },
            justifyContent: { xs: "center", lg: "center" },
            alignItems: "center",
            display: "flex",
          }}
        >
          <img src={BallStart} style={{ width: "113px", height: "32px" }} />
        </Box>
      ) : (
        <>
          {status ? (
            <Box
              sx={{
                height: "40px",
                display: "flex",
                width: { lg: "60%", xs: "80%" },
                justifyContent: { xs: "flex-end", lg: "flex-end" },
                alignItems: "center",
              }}
            >
              <MoneyBox color={color} rates={rates} />
              <Box
                sx={{
                  background: "rgba(0,0,0,1)",
                  height: "40px",
                  display: "flex",
                  width: {
                    xs: "61%",
                    lg: "10.17vw",
                    desktop: "10.17vw",
                    desktop2XL: "10.12vw",
                  },
                  justifyContent: { xs: "flex-end", lg: "flex-end" },
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    fontSize: matchesMobile ? "12px" : "18px",
                    textTransform: "uppercase",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "400",
                  }}
                >
                  suspended
                </Typography>
              </Box>
            </Box>
          ) : (
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
              <MoneyBox color={color} rates={rates} />

              {!lock && ![0, "0"].includes(matchOddsData?.back) ? (
                <SeperateBox
                  align={align}
                  value={matchOddsData?.back ? matchOddsData?.back : 0}
                  value2={null}
                  color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
                />
              ) : (
                <Box
                  sx={{
                    height: "94%",
                    background: "#FDF21A",
                    border: "1px solid #2626264D",
                    width: { xs: "30%", lg: "5vw" },
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <StyledImage
                    src={LockSolid}
                    sx={{ height: "20px", width: "20px" }}
                  />
                </Box>
              )}

              <Box
                sx={{ width: "3px", display: "flex", background: "pink" }}
              ></Box>
              {!lock && ![0, "0"].includes(matchOddsData?.lay) ? (
                <SeperateBox
                  align={align}
                  value={matchOddsData?.lay ? matchOddsData?.lay : 0}
                  value2={null}
                  color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
                />
              ) : (
                <Box
                  sx={{
                    height: "94%",
                    background: "#FDF21A",
                    border: "1px solid #2626264D",
                    width: { xs: "30%", lg: "5vw" },
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <StyledImage
                    src={LockSolid}
                    sx={{ height: "20px", width: "20px" }}
                  />
                </Box>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default TeamRowComponent;
