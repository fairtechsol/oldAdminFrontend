import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import { ARROWDOWN, ARROWUP, ARROW_UP, DeleteIcon } from "../../../assets";
import { formatNumber, formatToINR } from "../../../helper";
import CommissionDot from "../../Common/CommissionDot";
import StyledImage from "../../Common/StyledImages";

interface SessionBetSeperateProps {
  profit: boolean;
  allBetsData: any;
  betHistory: boolean;
  isArrow: boolean;
}

const SessionBetSeperate = ({
  profit,
  allBetsData,
  betHistory,
  isArrow,
}: SessionBetSeperateProps) => {
  const [visible, setVisible] = useState(true);
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        width: { md: "100%", xs: "100%", lg: "100%" },
        display: "flex",
        flexDirection: "column",
        marginX: { lg: "0vw", xs: "0px", md: "0px" },
        marginY: { lg: ".5vh", xs: "2px" },
        marginTop: { xs: "0" },
        borderRadius: "2px",
        background: "white",
        padding: "1px",
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "10px", xs: "10px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            Session Bets: {allBetsData?.length < 10 ? 0 : ""}
            {allBetsData?.length || 0}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <Box className="slanted" />
        </Box>

        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            alt="arrow up"
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          />
        </Box>
      </Box>
      {visible && (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1px" }}>
            <Box
              sx={{
                height: "25px",
                width: "30px",
                display: "flex",
                background: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontWeight: "400", fontSize: "10px", color: "white" }}
              >
                No
              </Typography>
            </Box>
            <RowComponent
              header={true}
              data={["Place Time", "Username", "Odds", "Yes/No", "Stake"]}
            />
            {profit && (
              <Box
                sx={{
                  height: "25px",
                  width: "30%",
                  display: "flex",
                  background: "#319E5B",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "10px", lg: ".7vw" },
                    color: "white",
                  }}
                >
                  {matchesMobile ? "P/L" : "Profit/Loss"}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              maxHeight: { xs: "200px", lg: "420px" },
              overflowY: "auto",
            }}
          >
            {allBetsData?.map((i: any, k: any) => {
              const num = allBetsData.length - k;
              const formattedNum = num < 10 ? "0" + num : num.toString();
              return (
                <Box
                  key={k}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                    gap: "1px",
                  }}
                >
                  <Box
                    sx={{
                      height: "40px",
                      marginBottom: { xs: "1px", lg: "1px" },
                      width: "30px",
                      display: "flex",
                      background: "black",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "10px",
                        fontWeight: "500",
                      }}
                    >
                      {formattedNum}
                    </Typography>
                  </Box>
                  <RowComponent header={false} data={i} />
                  {i?.deleteReason && (
                    <Box
                      sx={{
                        width: {
                          xs: profit ? "100%" : "100%",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          display: "flex",
                          lg: profit ? "100 % " : "100% ",
                        },
                        background: "rgba(0, 0, 0, 0.6)",
                        height: "45px",
                        position: "absolute",
                      }}
                    >
                      <Box sx={{ width: "35%" }} />
                    </Box>
                  )}
                  {profit && !i?.deleteReason && (
                    <Box
                      sx={{
                        height: "40px",
                        width: "30%",
                        background: i.totalLoss > 0 ? "#10DC61" : "#E32A2A",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          px: "10px",
                          height: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "11px", lg: "14px" },
                            color: "white",
                            fontWeight: "700",
                          }}
                        >
                          {Number(i.totalLoss) >= 0 ? (
                            <>
                              <span style={{ visibility: "hidden" }}>-</span>
                              {formatToINR(Number(i.totalLoss).toFixed(2))}
                            </>
                          ) : (
                            formatToINR(Number(i.totalLoss).toFixed(2))
                          )}
                        </Typography>
                        {!isArrow && (
                          <StyledImage
                            sx={{
                              width: { xs: "12px", lg: "15px" },
                              height: { xs: "12px", lg: "15px" },
                            }}
                            src={i.myProfitLoss > 0 ? ARROW_UP : ARROWDOWN}
                            alt="arrow"
                          />
                        )}
                      </Box>
                    </Box>
                  )}
                  {profit && i?.deleteReason && (
                    <Box
                      sx={{
                        height: "40px",
                        width: "30%",
                        margin: { xs: "1px", lg: "1px" },
                        display: "flex",
                        background: "black",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingX: "2px",
                        zIndex: 999,
                      }}
                    >
                      <StyledImage
                        sx={{
                          width: { xs: "15px", lg: "20px" },
                          height: { lg: "20px", xs: "14px" },
                          marginRight: "5px",
                        }}
                        src={DeleteIcon}
                        alt="delete"
                      />
                      <Typography
                        sx={{
                          fontSize: { xs: "7px", lg: ".5vw" },
                          color: "white",
                          fontWeight: "700",
                          width: { lg: "65%", xs: "55%" },
                          textTransform: "uppercase",
                        }}
                      >
                        Bet <span style={{ color: "#e41b23" }}>Deleted</span>{" "}
                        Due {"\n"}
                        {i?.deleteReason}
                      </Typography>
                    </Box>
                  )}
                  {i?.deleteReason && betHistory && (
                    <Box
                      sx={{
                        height: "40px",
                        width: "30%",
                        margin: { xs: "1px", lg: "1px" },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingX: "2px",
                        zIndex: 999,
                        position: "absolute",
                        right: 0,
                      }}
                    >
                      <StyledImage
                        sx={{
                          width: { xs: "15px", lg: "20px" },
                          height: { lg: "20px", xs: "14px" },
                          marginRight: "5px",
                        }}
                        src={DeleteIcon}
                        alt="delete"
                      />
                      <Typography
                        sx={{
                          fontSize: { xs: "7px", lg: ".5vw" },
                          color: "white",
                          fontWeight: "700",
                          width: { lg: "65%", xs: "55%" },
                          textTransform: "uppercase",
                        }}
                      >
                        Bet <span style={{ color: "#e41b23" }}>Deleted</span>{" "}
                        Due {"\n"}
                        {i?.deleteReason}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};
const RowComponent = ({ header, data }: any) => {
  const getTime = (date: any) => {
    const now = new Date(date);
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    return timeString;
  };
  const getColor = () => {
    if (header) {
      return "black";
    } else if (data?.betType === "BACK" || data?.betType == "YES") {
      return "#CEEBFF";
    } else if (data?.betType === "LAY" || data?.betType == "NO") {
      return "#F2CBCB";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: header ? "25px" : "40px",
        background: "white",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        gap: "1px",
        marginBottom: { xs: "1px", lg: "1px" },
      }}
    >
      {!header && (
        <>
          <SingleBox
            color={getColor}
            first={true}
            header={header}
            time={getTime(data.createdAt)}
            isCommissionActive={data?.isCommissionActive}
          />
          <SingleBox
            color={getColor()}
            data={data?.username || data?.userName || data?.user?.userName}
            header={header}
          />
          <SingleBox
            color={getColor()}
            data={data?.odds}
            header={header}
            isPercent={true}
            rate={formatNumber(data?.rate)}
          />
          <SingleBox
            color={getColor()}
            data={data?.betType || data?.betType}
            header={header}
          />
          <SingleBox
            color={getColor()}
            data={formatToINR(data?.stack || data?.stake || data?.amount)}
            header={header}
          />
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor}
            data={data[0]}
            first={true}
            header={header}
          />
          <SingleBox color={getColor()} data={data[1]} header={header} />
          <SingleBox color={getColor()} data={data[2]} header={header} />
          <SingleBox color={getColor()} data={data[3]} header={header} />
          <SingleBox color={getColor()} data={data[4]} header={header} />
        </>
      )}
    </Box>
  );
};
const SingleBox = ({
  data,
  header,
  color,
  up,
  first,
  time,
  isPercent,
  rate,
  isCommissionActive,
}: any) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: "140%",
          height: "40px",
          flexDirection: "row",
          background: "#F8C851",
          display: { xs: "initial", lg: "flex" },
          justifyContent: { lg: "center", xs: "initial" },
          alignItems: "center",
        }}
      >
        {isCommissionActive && <CommissionDot />}
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { xs: "9px", lg: "11px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        <Typography
          sx={{
            maxHeight: "2em",
            overflowY: "scroll",
            lineHeight: 1,
            fontWeight: "600",
            fontSize: { lg: "12px", xs: "9px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {data}
        </Typography>
      </Box>
    ) : up ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          marginX: { xs: "1px", lg: "1px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "8px",
            color: "black",
            textAlign: "end",
            marginRight: "3px",
          }}
        >
          {data.time}
        </Typography>
        <Box sx={{ height: ".4vh" }} />
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "12px",
            color: "black",
            textAlign: "start",
            marginLeft: "3px",
          }}
        >
          {data.country}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: {
              xs: "11px",
              lg: "13px",
              textTransform: "capitalize",
            },
            color: "black",
          }}
        >
          {data}
        </Typography>
        {isPercent && (
          <Typography
            sx={{
              fontSize: "9px",
              marginTop: -0.4,
              color: color == "white" ? "white" : "black",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {rate}
          </Typography>
        )}
      </Box>
    )
  ) : header && first ? (
    <Box
      sx={{
        width: "140%",
        height: "25px",
        background: "#319E5B",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "11px",
          color: "white",
          wordWrap: "break-word",
          lineHeight: "0.9",
        }}
      >
        {data}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "25px",
        background: "#319E5B",
        marginX: { xs: "0px", lg: "0px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: { lg: ".7vw", xs: "10px" },
          color: "white",
          flexWrap: "wrap",
        }}
      >
        {data}
      </Typography>
    </Box>
  );
};
export default memo(SessionBetSeperate);
