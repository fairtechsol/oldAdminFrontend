import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UD } from "../../../assets";
import { handleNumber } from "../../../helper";
import {
  addRunAmount,
  getSessionProLoss,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";

interface PlaceBetComponentWebProps {
  newData: any;
  profitLoss: any;
  type: string;
}

const PlaceBetComponentWeb = ({
  newData,
  profitLoss,
  type,
}: PlaceBetComponentWebProps) => {
  const dispatch: AppDispatch = useDispatch();
  const profitloss = handleNumber(parseFloat(profitLoss?.maxLoss), "");

  const { marketAnalysis } = useSelector(
    (state: RootState) => state.match.matchList
  );
  return (
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
            ["session", "khado", "meter", "overByover", "ballByBall"].includes(
              type
            )
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
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingX: ".2vw",
        width: "10vw",
        borderRadius: "5px",
        height: "32px",
        right: "11vw",
        position: "absolute",
        cursor: "pointer",
      }}
    >
      <Box
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
      </Box>
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
          {!profitLoss?.maxLoss ? "Profit/Loss" : profitloss}
        </Typography>
        <img
          src={UD}
          style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          alt="ud"
        />
      </Box>
    </Box>
  );
};

export default memo(PlaceBetComponentWeb);
