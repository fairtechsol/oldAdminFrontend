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

const PlaceBetComponentWeb = ({ newData, profitLoss, color, index }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { marketAnalysis } = useSelector(
    (state: RootState) => state.match.matchList
  );
  return (
    <Box
      onClick={() => {
        if (marketAnalysis?.betType) {
          const currBetPL = marketAnalysis?.betType?.session?.find(
            (item: any) => item.betId === newData?.id
          );
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
          {!profitLoss?.profitLoss && !profitLoss?.betPlaced
            ? "Profit/Loss"
            : handleNumber(
                parseFloat(
                  profitLoss?.betPlaced?.[index] ??
                    profitLoss?.profitLoss?.[index]
                ).toFixed(2),
                color
              )}
        </Typography>
        <img
          src={UD}
          style={{ width: "12px", height: "12px", marginLeft: "5px" }}
          alt="icon"
        />
      </Box>
    </Box>
  );
};

export default memo(PlaceBetComponentWeb);
