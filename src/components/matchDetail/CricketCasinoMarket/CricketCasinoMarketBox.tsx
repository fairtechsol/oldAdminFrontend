import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SeperateBox from "../MatchOdds/SeperateBox";
import { BallStart } from "../../../assets";
import { formatToINR } from "../../../helper";
import PlaceBetComponent from "./PlaceBetComponent";
import PlaceBetComponentWeb from "./PlaceBetComponentWeb";

const CricketCasinoMarketBox = (props: any) => {
  const { newData, setData, profitLossData, index, sessionData } = props;
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
        {newData?.activeStatus === "save" && (
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
            height: "38px",
            width: "40%",
            alignItems: "center",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
          }}
        >
          <Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "12px", md: "11px", xs: "10px" },
                marginLeft: "7px",
                fontWeight: "600",
                lineHeight: "10px",
              }}
            >
              {`${index} Number`}
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "9px", md: "9px", xs: "8px" },
                marginLeft: "7px",
                fontWeight: "500",
              }}
            >
              max: {formatToINR(newData?.maxBet || newData?.max)}
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
            height: "38px",
            width: { lg: "60%", xs: "80%" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {matchesMobile ? (
            <PlaceBetComponent
              sessionData={sessionData}
              newData={newData}
              profitLoss={profitLossData?.length > 0 && profitLossData[0]}
              setData={setData}
              index={index}
            />
          ) : (
            <PlaceBetComponentWeb
              sessionData={sessionData}
              newData={newData}
              profitLoss={profitLossData?.length > 0 && profitLossData[0]}
              setData={setData}
              index={index}
            />
          )}

          {!["ACTIVE", "active", "", undefined, null, "", "OPEN"].includes(
            newData?.gstatus
          ) || !newData.odds?.length ? (
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
              {newData?.status == "Ball Running" ||
              newData?.status === "ball start" ? (
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
                  {!newData?.gstatus ? "SUSPENDED" : newData?.gstatus}
                </Typography>
              )}
            </Box>
          ) : (
            <>
              {newData?.odds?.map((item: any, index: number) => (
                <>
                  <SeperateBox
                    key={index}
                    session={true}
                    back={true}
                    value={item?.odds ?? 0}
                    value2={item?.size ?? 0}
                    lock={
                      [null, 0, "0"].includes(Math.floor(item?.odds ?? 0))
                        ? true
                        : false
                    }
                    color={"#B3E0FF"}
                  />
                  <Box
                    sx={{ width: "3px", display: "flex", background: "pink" }}
                  ></Box>
                </>
              ))}
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

export default CricketCasinoMarketBox;
