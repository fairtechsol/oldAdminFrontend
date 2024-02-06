import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SeperateBox from "../MatchOdds/SeperateBox";
import { BallStart } from "../../../assets";
import { formatNumber } from "../../../helper";
import PlaceBetComponent from "./PlaceBetComponent";
import PlaceBetComponentWeb from "./PlaceBetComponentWeb";

const SeasonMarketBox = (props: any) => {
  const { newData, setData } = props;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "38px",
          width: "100%",
          position: "relative",
        }}
      >
        {newData?.betStatus === 0 && (
          <Box
            sx={{
              margin: "1px",
              width: "100%",
              height: "100%",
              position: "absolute",
              right: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 2,
            }}
          ></Box>
        )}
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "38px",
            width: "40%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {newData?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            background: "white",
            height: "38px",
            width: { lg: "60%", xs: "80%" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {matchesMobile ? (
            <PlaceBetComponent
              // amount={index == 2}
              newData={newData}
              // setData={setData}
              setData={setData}
            />
          ) : (
            <PlaceBetComponentWeb
              // amount={index == 2}
              newData={newData}
              // setData={setData}
              setData={setData}
            />
          )}

          {newData?.status !== "active" ? (
            <Box
              sx={{
                background: "rgba(0,0,0,1)",
                // marginLeft: "-2px",
                height: "38px",
                // position: "absolute",
                marginLeft: { lg: "20%", md: "0%", xs: "0%" },
                // right: 0,
                width: { lg: "36.5%", md: "60%", xs: "60.5%" },
                justifyContent: { xs: "center", lg: "center" },
                alignItems: "center",
                display: "flex",
                zIndex: 1,
              }}
            >
              {newData?.status == "Ball Started" ? (
                <img
                  src={BallStart}
                  style={{ width: "113px", height: "32px" }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: { xs: "12px", lg: "18px" },
                    textTransform: "uppercase",
                    textAlign: "center",
                    width: "100%",
                    color: "white",
                    fontWeight: "400",
                  }}
                >
                  {newData?.status}
                </Typography>
              )}
            </Box>
          ) : (
            <>
              <SeperateBox
                session={true}
                back={true}
                value={Math.floor(newData?.noRate)}
                value2={Math.floor(newData?.noPercent)}
                lock={
                  newData?.status === "suspended" ||
                  [0, "0"].includes(Math.floor(newData?.noRate))
                }
                color={"#F6D0CB"}
              />
              <Box
                sx={{ width: "3px", display: "flex", background: "pink" }}
              ></Box>
              <SeperateBox
                session={true}
                value={Math.floor(newData?.yesRate)}
                value2={formatNumber(Math.floor(newData?.yesPercent))}
                lock={
                  newData?.status === "suspended" ||
                  [0, "0"].includes(Math.floor(newData?.yesRate))
                }
                color={"#B3E0FF"}
              />
            </>
          )}

          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default SeasonMarketBox;
