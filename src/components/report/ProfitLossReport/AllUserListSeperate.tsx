import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { memo, useState } from "react";
import { ARROWDOWN, ARROW_UP, ArrowDown } from "../../../assets";
import service from "../../../service";
import StyledImage from "../../Common/StyledImages";
import AllRateSeperate from "./AllRateSeperate";
import ChildUserList from "./ChildUserList";
import SessionBetSeperate from "./SessionBetSeperate";
import SessionComponentMatches from "./SessionComponentMatches";
import { ApiConstants } from "../../../utils/Constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const AllUserListSeparate = ({
  item,
  index,
  getBetReport,
  sessionBetData,
  selectedId,
  matchId,
  bet1Data,
  sessionBets,
}: any) => {
  const theme = useTheme();

  const { totalBetProfitLossModal } = useSelector(
    (state: RootState) => state.user.profitLoss
  );
  const { userData } = useSelector(
    (state: RootState) => state.report.reportList
  );
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [showChildUserList, setShowChildUserList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [betData, setBetData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [selectedChildBetId, setSelectedChildBetId] = useState("");
  const [showBets, setShowBets] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showSessionBets, setShowSessionBets] = useState(false);

  const [showSubUsers, setSubSusers] = useState({
    value: false,
    id: "",
    roleName: item?.roleName,
  });

  const getBetDataForChildUser = async (props: any) => {
    try {
      let payload = {
        matchId: props?.matchId,
        user: props?.user,
        searchId: userData?.id ? userData?.id : "",
      };
      const resp = await service.post(
        `${ApiConstants.USER.TOTAL_BET_PROFITLOSS}`,
        payload
      );
      if (resp) {
        setBetData(resp?.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const getSessionDataForChildUser = async (props: any) => {
    try {
      let payload = {
        matchId: props?.matchId,
        user: props?.user,
        searchId: userData?.id ? userData?.id : "",
      };
      const resp = await service.post(
        `${ApiConstants.USER.TOTAL_SESSION_PROFITLOSS}`,
        payload
      );
      if (resp) {
        setSessionData(resp?.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Box key={index} sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "45px",
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
            background: "black",
          }}
        >
          <Typography
            sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
          >
            {index > 9 ? index : "0" + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "65%", lg: "80%", md: "65%" },
            position: "relative",
            height: "100%",
            paddingY: "4px",
            alignItems: "center",
            display: "flex",
            paddingX: "10px",
            background: "#0B4F26",
            marginLeft: 0.1,
            justifyContent: "space-between",
          }}
        >
          {/* <Typography
            sx={{
              fontSize: { lg: "0px", xs: "10px" },
              color: "white",
              marginLeft: "5px",
              fontWeight: "500",
              position: "absolute",
              top: 0,
              right: 5,
            }}
          >
            ({moment(item?.betDate).format("DD-MM-YYYY")})
          </Typography> */}

          <Box
            onClick={(e) => {
              e.stopPropagation();
              setShowModal((prev) => !prev);
            }}
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "10px", lg: "15px" },
                color: "white",
                fontWeight: "700",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineClamp: 2,
              }}
            >
              {item?.userName}
            </Typography>
          </Box>
          {item?.roleName !== "user" && (
            <StyledImage
              onClick={() => {
                if (!["user"].includes(item?.roleName)) {
                  if (
                    showSubUsers?.value &&
                    showSubUsers?.id === item?.userId
                  ) {
                    setSubSusers({
                      ...showSubUsers,
                      value: false,
                      id: "",
                    });
                    setShowChildUserList(false);
                  } else {
                    setSubSusers({
                      ...showSubUsers,
                      value: true,
                      id: item?.userId,
                    });
                    setShowChildUserList(true);
                  }
                }
              }}
              src={ArrowDown}
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  showSubUsers?.id === item?.userId && showChildUserList
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            background: "#27AC1E",
            paddingX: "2px",
            width: { xs: "25%", lg: "20%" },
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "12px", xs: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Profit
            </Typography>
            <StyledImage
              src={ARROW_UP}
              sx={{
                width: { lg: "25px", xs: "15px" },
                height: { lg: "12px", xs: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss >= 0 ? +item?.totalLoss : 0}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#E32A2A",
            paddingX: "2px",
            width: { xs: "25%", lg: "20%" },
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "12px", xs: "8px" },
                fontWeight: "500",
                color: "white",
              }}
            >
              Loss
            </Typography>
            <StyledImage
              src={ARROWDOWN}
              sx={{
                width: { lg: "25px", xs: "15px" },
                height: { lg: "12px", xs: "8px" },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: "700", color: "white" }}
            >
              {+item?.totalLoss < 0 ? +item?.totalLoss : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
      <ModalMUI
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              alignSelf: "center",
              width: { xs: "90%", lg: "90%" },
            }}
          >
            <>
              <Box
                sx={[
                  {
                    width: { xs: "96%", lg: "100%", md: "100%" },
                    // marginX: "0.5%",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    borderRadius: "10px",
                    borderBottomRightRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    overflow: "hidden",
                    border: "2px solid white",
                  },
                  (theme: any) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`,
                  }),
                ]}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    display={"flex"}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      px: "10px",
                      py: "6px",
                      backgroundColor: "#F8C851",
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems="center"
                      sx={{ alignItems: "center" }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "14px",
                            lg: "18px",
                            md: "18px",
                          },
                          color: "#000",
                          marginRight: {
                            xs: "10px",
                            lg: "20px",
                            md: "20px",
                          },
                        }}
                      >
                        Profit/Loss Per User
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#000",
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowModal((prev) => !prev);
                        setShowBets(false);
                        setShowSessionBets(false);
                        setShowSessions(false);
                      }}
                    >
                      &times;
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "50px",
                      background: "white",
                      display: "flex",
                      padding: 0.1,
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "50%", lg: "60%" },
                        position: "relative",
                        height: "100%",
                        paddingY: "4px",
                        alignItems: { lg: "center", xs: "center" },
                        display: "flex",
                        paddingX: "10px",
                        background: "#0B4F26",
                        marginLeft: 0.1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          flexDirection: "row",
                          display: "flex",
                          alignItems: "center",
                          marginTop: { xs: "5px", lg: "0" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "10px", lg: "15px" },
                            color: "white",
                            fontWeight: "600",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineClamp: 2,
                          }}
                        >
                          {item?.userName}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        if (showBets) {
                          setShowBets((prev) => !prev);
                        } else {
                          if (showSessions) {
                            setShowSessions(false);
                          }
                          setShowBets((prev) => !prev);
                          // getBetReport({
                          //   eventType: item?.eventType,
                          //   matchId: matchId,
                          //   userId: item?.userId,
                          //   type: "all_bet",
                          //   betId: "",
                          //   sessionBet: false,
                          // });
                          getBetDataForChildUser({
                            matchId,
                            user: {
                              id: item?.userId,
                              roleName: item?.roleName,
                            },
                            searchId: "",
                          });
                        }
                      }}
                      sx={{
                        background:
                          item?.rateProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
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
                            fontSize: { lg: "12px", xs: "8px" },
                            fontWeight: "500",
                            color: "white",
                          }}
                        >
                          Rate Profit/Loss
                        </Typography>
                        <StyledImage
                          src={item?.rateProfitLoss > 0 ? ARROW_UP : ARROWDOWN}
                          sx={{
                            width: { lg: "25px", xs: "15px" },
                            height: { lg: "12px", xs: "8px" },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "10px", lg: "14px" },
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          {item?.rateProfitLoss ? (
                            Number(item?.rateProfitLoss) >= 0 ? (
                              <>
                                <span style={{ visibility: "hidden" }}>-</span>
                                {Number(item?.rateProfitLoss).toFixed(2)}
                              </>
                            ) : (
                              Number(item?.rateProfitLoss).toFixed(2)
                            )
                          ) : (
                            0.0
                          )}
                        </Typography>
                        <StyledImage
                          src={ArrowDown}
                          sx={{
                            width: { lg: "20px", xs: "10px" },
                            height: { lg: "10px", xs: "6px" },
                            transform: showBets
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </Box>
                    </Box>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        if (showSessions) {
                          setShowSessions((prev) => !prev);
                        } else {
                          if (showBets) {
                            setShowBets(false);
                          }
                          if (showSessionBets) {
                            setShowSessionBets(false);
                          }
                          setShowSessions((prev) => !prev);
                          // getBetReport({
                          //   eventType: item?.eventType,
                          //   matchId: matchId,
                          //   userId: item?.userId,
                          //   type: "session_bet",
                          //   betId: "",
                          //   sessionBet: false,
                          // });
                          getSessionDataForChildUser({
                            matchId,
                            user: {
                              id: item?.userId,
                              roleName: item?.roleName,
                            },
                            searchId: "",
                          });
                        }
                      }}
                      sx={{
                        background:
                          item?.sessionProfitLoss > 0 ? "#27AC1E" : "#E32A2A",
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
                            fontSize: { lg: "12px", xs: "8px" },
                            fontWeight: "500",
                            color: "white",
                          }}
                        >
                          Session Profit/Loss
                        </Typography>
                        <StyledImage
                          src={
                            item?.sessionProfitLoss > 0 ? ARROW_UP : ARROWDOWN
                          }
                          sx={{
                            width: { lg: "25px", xs: "15px" },
                            height: { lg: "12px", xs: "8px" },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "10px", lg: "14px" },
                            fontWeight: "700",
                            color: "white",
                          }}
                        >
                          {item?.rateProfitLoss ? (
                            Number(item?.sessionProfitLoss) >= 0 ? (
                              <>
                                <span style={{ visibility: "hidden" }}>-</span>
                                {Number(item?.sessionProfitLoss).toFixed(2)}
                              </>
                            ) : (
                              Number(item?.sessionProfitLoss).toFixed(2)
                            )
                          ) : (
                            0.0
                          )}
                        </Typography>
                        <StyledImage
                          src={ArrowDown}
                          sx={{
                            width: { lg: "20px", xs: "10px" },
                            height: { lg: "10px", xs: "6px" },
                            transform: showSessions
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  {/* {selectedId?.id === item?.matchId && ( */}
                  <>
                    {showBets && (
                      <>
                        <Box
                          sx={{
                            width: { xs: "100%", lg: "100%" },
                            marginTop: { xs: ".25vh" },
                            // marginLeft: { lg: "4%" },
                            display: "flex",
                            flexDirection: { lg: "row", xs: "column" },
                          }}
                        >
                          <AllRateSeperate
                            betHistory={false}
                            count={betData?.length}
                            allBetsData={betData}
                            profit
                          />
                        </Box>
                        <Box sx={{ width: { lg: "1vw", xs: 0 } }}></Box>
                      </>
                    )}
                    {showSessions && (
                      <Box
                        sx={{
                          width: { xs: "100%", lg: "100%" },
                          marginTop: { xs: ".25vh" },
                          // marginLeft: { lg: "4%" },
                          display: "flex",
                          flexDirection: { lg: "row", xs: "column" },
                        }}
                      >
                        <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
                          <Box
                            sx={{
                              width: {
                                xs: "100%",
                                lg: "50%",
                                md: "100%",
                              },
                              maxHeight: "51vh",
                              overflow: "hidden",
                              overflowY: "auto",
                              marginY: { xs: ".2vh", lg: "1vh" },
                              padding: 0.2,
                            }}
                          >
                            {sessionData?.length > 0 &&
                              sessionData?.map((item1: any, index: any) => {
                                return (
                                  <SessionComponentMatches
                                    key={index}
                                    item={{ ...item1, matchId: item?.matchId }}
                                    index={index + 1}
                                    userId={item?.userId}
                                    showSessionBets={showSessionBets}
                                    setShowSessionBets={setShowSessionBets}
                                    getBetReport={getBetReport}
                                    selectedId={selectedId}
                                    sessionBetData={sessionBetData}
                                    user={{
                                      id: item?.userId,
                                      roleName: item?.roleName,
                                    }}
                                    selectedChildBetId={selectedChildBetId}
                                    setSelectedChildBetId={
                                      setSelectedChildBetId
                                    }
                                  />
                                );
                              })}
                          </Box>
                          {(selectedId?.betId !== "" ||
                            selectedChildBetId !== "") &&
                            !matchesMobile &&
                            showSessionBets && (
                              <Box
                                sx={{
                                  width: {
                                    xs: "100%",
                                    lg: "49%",
                                    md: "100%",
                                  },
                                }}
                              >
                                <SessionBetSeperate
                                  betHistory={false}
                                  allBetsData={
                                    totalBetProfitLossModal
                                      ? Array.from(
                                          new Set(totalBetProfitLossModal)
                                        )
                                      : []
                                  }
                                  profit
                                  isArrow={true}
                                />
                              </Box>
                            )}
                        </Box>
                      </Box>
                    )}
                  </>
                  {/* )} */}
                </Box>
              </Box>
            </>
          </Box>
        </Box>
      </ModalMUI>
      {showSubUsers?.value && (
        <>
          <Box
            sx={{
              width: { xs: "100%", lg: "99%" },
              marginTop: { xs: ".25vh" },
              marginLeft: { lg: "1%" },
              display: "flex",
              flexDirection: { lg: "row", xs: "column" },
            }}
          >
            <Box sx={{ width: "100%", display: "flex", gap: 1 }}>
              <Box
                sx={{
                  width: { xs: "100%", lg: "100%", md: "100%" },
                  // maxHeight: "51vh",
                  overflow: "hidden",
                  // overflowY: "auto",
                  marginY: { xs: ".2vh", lg: "1vh" },
                  padding: 0.2,
                }}
              >
                <ChildUserList
                  id={showSubUsers?.id}
                  show={showSubUsers?.value}
                  setShow={showSubUsers}
                  matchId={matchId}
                  bet1Data={bet1Data}
                  roleName={showSubUsers?.roleName}
                  getBetReport={getBetReport}
                  sessionBetData={sessionBetData}
                  sessionBets={sessionBets}
                />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(AllUserListSeparate);
