import { Box, Typography } from "@mui/material";
import { useState } from "react";
import StyledImage from "../../Common/StyledImages";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  getDomainProfitLoss,
  resetBetProfitLoss,
  resetDomainProfitLoss,
  resetSessionProfitLoss,
} from "../../../store/actions/reports";
import moment from "moment";

const RowHeaderDomain = ({
  item,
  index,
  showMatchList,
  setCurrentPage,
  setShowMatchList,
  startDate,
  endDate,
}: any) => {
  const [visible, setVisible] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box
      onClick={() => {
        if (!visible) {
          let filter = "";
          if (startDate && endDate) {
            filter += `&createdAt=between${moment(startDate)?.format(
              "YYYY-MM-DD"
            )}|${moment(endDate.setDate(endDate.getDate() + 1))?.format(
              "YYYY-MM-DD"
            )}`;
          } else if (startDate) {
            filter += `&createdAt=gte${moment(startDate)?.format(
              "YYYY-MM-DD"
            )}`;
          } else if (endDate) {
            filter += `&createdAt=lte${moment(endDate)?.format("YYYY-MM-DD")}`;
          }
          setCurrentPage(1);
          dispatch(
            getDomainProfitLoss({
              url: item?.domainUrl,
              type: item?.eventType,
              filter: filter,
            })
          );
        }
        dispatch(resetDomainProfitLoss());
        dispatch(resetBetProfitLoss());
        dispatch(resetSessionProfitLoss());
        setShowMatchList((prev: boolean) => !prev);
        setVisible((prev) => !prev);
      }}
      sx={{
        width: "100%",
        height: { lg: "60px", xs: "50px" },
        background: "white",
        display: "flex",
        padding: 0.1,
      }}
    >
      <Box
        sx={{
          width: { xs: "10%", lg: "10%" },
          height: "100%",
          alignItems: "center",
          display: "flex",
          paddingX: "10px",
          background: "#F8C851",
          marginLeft: 0.1,
          justifyContent: "space-between",
          borderRight: "1px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "15px", color: "black", fontWeight: "600" }}
        >
          {index + 1}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "40%", lg: "60%" },
          height: "100%",
          alignItems: "center",
          display: "flex",
          paddingX: "10px",
          background: "#F8C851",
          marginLeft: 0.1,
          justifyContent: "space-between",
          borderRight: "1px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "15px", color: "black", fontWeight: "600" }}
        >
          {item?.domainUrl}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "40%", lg: "60%" },
          height: "100%",
          alignItems: "center",
          display: "flex",
          paddingX: "10px",
          background: "#F8C851",
          marginLeft: 0.1,
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "15px", color: "black", fontWeight: "600" }}
        >
          {item?.eventType}
        </Typography>
        <StyledImage
          src={ArrowDown}
          sx={{
            width: { lg: "20px", xs: "10px" },
            transform: showMatchList ? "rotate(180deg)" : "rotate(0deg)",
            height: { lg: "10px", xs: "6px" },
          }}
        />
      </Box>
      <Box
        sx={{
          background: item?.totalLoss > 0 ? "#27AC1E" : "#E32A2A",
          paddingX: "2px",
          width: { xs: "25%", lg: "30%" },
          height: "100%",
          marginLeft: 0.1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "12px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            {item?.totalLoss > 0 ? "Profit" : "Loss"}
          </Typography>
          <StyledImage
            src={item?.totalLoss > 0 ? ARROW_UP : ARROWDOWN}
            sx={{
              width: { lg: "25px", xs: "15px" },
              height: { lg: "12px", xs: "8px" },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "10px" },
              fontWeight: "700",
              color: "white",
            }}
          >
            {Number(item?.totalLoss) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {Number(item?.totalLoss).toFixed(2)}
              </>
            ) : (
              Number(item?.totalLoss).toFixed(2)
            )}{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#0B4F26",
          paddingX: "2px",
          width: { xs: "25%", lg: "30%" },
          height: "100%",
          marginLeft: 0.1,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          paddingLeft: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "14px", xs: "12px" },
            fontWeight: "700",
            color: "white",
          }}
        >
          Total Bet
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{
              fontSize: { lg: "14px", xs: "10px" },
              fontWeight: "700",
              color: "white",
              textAlign: "center",
            }}
          >
            {item?.totalBet}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RowHeaderDomain;
