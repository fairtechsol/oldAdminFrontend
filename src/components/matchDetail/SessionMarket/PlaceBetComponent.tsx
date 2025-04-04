import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleNumber } from "../../../helper";
import {
  addRunAmount,
  getSessionProLoss,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";

const PlaceBetComponent = ({ newData, profitLoss, color, type }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const profitloss = handleNumber(parseFloat(profitLoss?.maxLoss), color);

  const { marketAnalysis } = useSelector(
    (state: RootState) => state.match.matchList
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Box
        onClick={() => {
          if (marketAnalysis?.betType) {
            const currBetPL = [
              ...(marketAnalysis?.betType?.session || []),
              ...(marketAnalysis?.betType?.khado || []),
              ...(marketAnalysis?.betType?.meter || []),
              ...(marketAnalysis?.betType?.overByover || []),
              ...(marketAnalysis?.betType?.ballByBall || []),
            ]?.find((item: any) => item.betId === newData?.id);
            if (currBetPL) {
              dispatch(
                addRunAmount({
                  id: newData?.id,
                  name: newData?.name,
                  type: !newData?.isManual
                    ? "Session Market"
                    : "Quick Session Market",
                  matchId: newData?.matchId,
                  proLoss: JSON.stringify(currBetPL?.profitLoss),
                })
              );
            }
          } else {
            if (
              [
                "session",
                "khado",
                "meter",
                "overByover",
                "ballByBall",
              ].includes(type)
            ) {
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
            }
          }
        }}
        sx={{
          background: "#0B4F26",
          position: "absolute",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          right: { xs: "43vw", lg: "41vw", md: "41vw" },
          justifyContent: "center",
          width: { lg: "90px", xs: "60px", md: "90px" },
          borderRadius: "5px",
          height: "35px",
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            background: "#FDF21A",
            borderRadius: "3px",
            width: "90%",
            height: "45%",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "10px", xs: "8px" },
              fontWeight: "bold",
              color: "#FF4D4D",
            }}
          >
            Total Bet :{" "}
            <span style={{ color: "#0B4F26" }}>
              {Math.floor(profitLoss?.totalBet) || 0}
            </span>
          </Typography>
        </Box>
        <Box sx={{ zIndex: 100, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              marginTop: "2px",
              fontSize: {
                lg: !profitLoss?.maxLoss ? "8px" : "8px",
                md: "8px",
                xs: "8px",
              },
              fontWeight: !profitLoss?.maxLoss ? "500" : "500",
              color: "white",
            }}
          >
            {" "}
            {!profitLoss?.maxLoss ? "Profit/Loss" : profitloss}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaceBetComponent;
