import { Box, Typography } from "@mui/material";
import { UD } from "../../../assets";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { getSessionProLoss } from "../../../store/actions/match/matchAction";
import { handleNumber } from "../../../helper";

const PlaceBetComponentWeb = ({
  newData,
  profitLoss,
  color,
  // sessionData,
  index,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  // const profitloss = handleNumber(parseFloat(profitLoss?.maxLoss), color);
  return (
    <>
      <Box
        onClick={() => {
          dispatch(
            getSessionProLoss({
              matchId: newData?.matchId,
              id: newData?.id,
              name: newData?.name ?? newData?.RunnerName,
              type: !newData?.isManual
                ? "Session Market"
                : "Quick Session Market",
            })
          );
        }}
        sx={{
          background: "#0B4F26",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingX: ".2vw",
          width: "10vw",
          borderRadius: "5px",
          height: "32px",
          right: "11vw",
          position: "absolute",
        }}
      >
        {/* <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "45%",
            height: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#FF4D4D" }}
          >
            Total Bet
          </Typography>
          <Typography
            sx={{ fontSize: ".6vw", fontWeight: "bold", color: "#0B4F26" }}
          >
            {Math.floor(profitLoss?.totalBet) || 0}
          </Typography>
        </Box> */}
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: profitLoss?.maxLoss ? ".65vw" : ".6vw" },
              fontWeight: profitLoss?.maxLoss ? "bold" : "500",
              color: "white",
            }}
          >
            {!profitLoss?.profitLoss
              ? "Profit/Loss"
              : handleNumber(
                  parseFloat(profitLoss?.profitLoss[index]).toFixed(2),
                  color
                )}
          </Typography>
          <img
            src={UD}
            style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PlaceBetComponentWeb;
