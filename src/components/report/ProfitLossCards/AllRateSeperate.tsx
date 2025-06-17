import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import { ARROWDOWN, ARROWUP, ARROW_UP, DeleteIcon } from "../../../assets";
import { formatToINR } from "../../../helper";
import StyledImage from "../../Common/StyledImages";
import RowComponent from "./RowComponent";

interface AllRateSeperateProps {
  allBetsData: any;
  count: number;
}

const AllRateSeperate = ({ allBetsData, count }: AllRateSeperateProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Box
        sx={{
          width: { md: "100%", xs: "100%", lg: "100%" },
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          marginX: { lg: "0vw", xs: "0px", md: "0px" },
          marginY: { lg: ".5vh", xs: "2px" },
          marginTop: { xs: "0" },
          marginBottom: { lg: ".5vh", xs: "2px" },
          borderRadius: "2px",
          background: "white",
          padding: "1px",
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
              All Rate Bets: {count < 10 ? 0 : ""}
              {count || 0}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: { xs: "200px", lg: "420px" },
              overflowY: "auto",
              overflowX: matchesMobile ? "auto" : "hidden",
              width: "100%",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "1px",
                minWidth: matchesMobile ? "800px" : "auto",
              }}
            >
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
                data={[
                  "Game Name",
                  "Username",
                  "Created At",
                  "Round Id",
                  "Type",
                  "Provider",
                  "Stake",
                ]}
              />

              <Box
                sx={{
                  height: "25px",
                  width: "12%",
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
                  {matchesMobile ? "P/L" : "Profit Loss"}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                maxHeight: { xs: "200px", lg: "420px" },
                overflowY: "auto",
                minWidth: matchesMobile ? "800px" : "auto",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {[...new Set(allBetsData)]?.map((i: any, k: any) => {
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
                            xs: "100%",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            display: "flex",
                            lg: "100% ",
                          },
                          background: "rgba(0, 0, 0, 0.6)",
                          height: "100%",
                          position: "absolute",
                        }}
                      >
                        <Box sx={{ width: "35%" }} />
                      </Box>
                    )}
                    {!i?.deleteReason && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "12%",
                          background: i?.totalLoss > 0 ? "#10DC61" : "#E32A2A",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height: "100%",
                            px: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: "9px", lg: "14px" },
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

                          {!matchesMobile && (
                            <StyledImage
                              sx={{
                                width: { xs: "12px", lg: "15px" },
                                height: { xs: "5px", lg: "7px" },
                              }}
                              src={i?.totalLoss > 0 ? ARROW_UP : ARROWDOWN}
                              alt="arrow"
                            />
                          )}
                        </Box>
                      </Box>
                    )}
                    {i?.deleteReason && (
                      <Box
                        sx={{
                          height: "40px",
                          width: "12%",
                          display: "flex",
                          background: "black",
                          justifyContent: "center",
                          alignItems: "center",
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
                          Due {"\n"} {i?.deleteReason}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
      <style>
        {`
                /* width */
                .myScroll::-webkit-scrollbar {
                  width: 0px;
                }

                /* Track */
                .myScroll::-webkit-scrollbar-track {
                  background: #f1f1f1;
                }

                /* Handle */
                .myScroll::-webkit-scrollbar-thumb {
                  background: #888;
                }

                /* Handle on hover */
                .myScroll::-webkit-scrollbar-thumb:hover {
                  background: #555;
                }
              `}
      </style>
    </>
  );
};

export default memo(AllRateSeperate);
