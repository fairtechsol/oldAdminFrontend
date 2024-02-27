import { Box, Typography } from "@mui/material";
import { UD } from "../../../assets";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { getSessionProLoss } from "../../../store/actions/match/matchAction";

const PlaceBetComponentWeb = ({ newData, profitLoss }: any) => {
  const dispatch: AppDispatch = useDispatch();
  
  return (
    <>
      <Box
         onClick={() => {
          dispatch(
            getSessionProLoss({
              id: newData?.id,
              name: newData?.name,
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
            sx={{ fontSize: ".5vw", fontWeight: "bold", color: "#0B4F26" }}
          >
            {profitLoss?.totalBet || 0}
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
            {" "}
            {!profitLoss?.maxLoss ? "Profit/Loss" : profitLoss?.maxLoss}
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
