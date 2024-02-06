import { Box, Typography } from "@mui/material";
import { useState } from "react";
import StyledImage from "../../Common/StyledImages";
import {
  ARROWDOWN,
  ARROW_UP,
  ArrowDown,
  Cricket,
  Football,
  Tennis,
} from "../../../assets";
import RowHeaderDomain from "./RowHeaderDomain";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import RowComponentMatches from "./RowComponentMatches";

const RowHeaderMatches = ({
  item,
  setCurrentPage,
  startDate,
  endDate,
  selectedId,
  setSelectedId,
}: any) => {
  const [visible, setVisible] = useState(false);
  const { domainProfitLossList } = useSelector(
    (state: RootState) => state.report.reportList
  );
  const [showMatchList, setShowMatchList] = useState(false);
  return (
    <>
      <Box
        onClick={() => {
          setCurrentPage(1);
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
            width: { xs: "10%", lg: "5%" },
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            background: "#F8C851",
          }}
        >
          <StyledImage
            src={
              item?.eventType === "cricket"
                ? Cricket
                : item?.eventType === "soccer"
                ? Football
                : item?.eventType === "tennis"
                ? Tennis
                : Cricket
            }
            sx={{ width: { lg: "35px", xs: "25px" } }}
          />
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
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
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
      {visible &&
        item?.domainData &&
        item?.domainData?.map((domain: any, index: number) => {
          return (
            <>
              <RowHeaderDomain
                item={domain}
                index={index}
                setCurrentPage={setCurrentPage}
                startDate={startDate}
                endDate={endDate}
                showMatchList={showMatchList}
                setShowMatchList={setShowMatchList}
              />
              <Box>
                {showMatchList &&
                  domainProfitLossList?.result?.map((item: any, index: any) => {
                    return (
                      <RowComponentMatches
                        domainUrl={domain?.domainUrl}
                        key={index}
                        item={item}
                        index={index + 1}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                      />
                    );
                  })}
              </Box>
            </>
          );
        })}
    </>
  );
};

export default RowHeaderMatches;
