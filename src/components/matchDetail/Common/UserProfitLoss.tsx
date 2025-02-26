import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Refresh } from "../../../assets";
import {
  getUserProfitLoss,
  resetUserProfitLoss,
} from "../../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../../store/store";
import Divider from "../../Inplay/Divider";
import UserProfitLossListComp from "./UserProfitLossListComp";

const UserProfitLoss = (props: any) => {
  const {
    title,
    matchData,
    setShowUserProfitLoss,
    single,
    matchDetail,
  } = props;
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { userProfitLossData } = useSelector(
    (state: RootState) => state.match.userProfitLoss
  );

  useEffect(() => {
    if (matchData?.matchId !== undefined) {
      dispatch(getUserProfitLoss(matchData?.matchId));
    }
  }, [matchData?.matchId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          background: "white",
          padding: 0.3,
          flexDirection: "column",
          marginBottom: "3px",
          width: "100%",
          maxHeight: single === "single" ? "29rem" : null,
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
            width: "99.7%",
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
                fontSize: {
                  lg: "13px",
                  md: "12px",
                  xs: matchesMobile ? "12px" : "12px",
                },
                fontWeight: "bold",
                marginLeft: "7px",
              }}
            >
              {title}
            </Typography>
            {single === "multiple" && (
              <img
                onClick={(event) => {
                  event.preventDefault();
                  dispatch(getUserProfitLoss(matchData?.matchId));
                }}
                src={Refresh}
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
            }}
          >
            <div className="slanted"></div>
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
            {single === "multiple" ? (
              <Button
                sx={{
                  color: "#f1c40f",
                  fontSize: "30px",
                  minWidth: 0,
                  padding: "0px 8px",
                }}
                onClick={() => {
                  setShowUserProfitLoss(false);
                  dispatch(resetUserProfitLoss());
                }}
              >
                &times;
              </Button>
            ) : (
              <img
                onClick={() => {
                  dispatch(getUserProfitLoss(matchDetail?.id));
                }}
                src={Refresh}
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              background: "#319E5B",
              height: "25px",
              width: "99.7%",
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: "10%",
                alignItems: "center",
                minWidth: "100px",
                position:"sticky",
                left:0,
                zIndex:2
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: { lg: "11px", xs: "9px" },
                  marginLeft: "7px",
                }}
              >
                Username
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                background: "#319E5B",
                height: "25px",
                width: { lg: "90%", xs: "90%" },
                // justifyContent: { lg: "flex-end", xs: "flex-end" },
                // overflow: "auto",
              }}
            >
              {userProfitLossData?.markets?.map((item: any) => {
                return (
                  <>
                    <Box
                      sx={{
                        background: "#f1c550",
                        border: "1px solid #2626264D",
                        width: { lg: "30%", xs: "30.06%" },
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minWidth: "100px",
                      }}
                      className="wrapContent"
                      key={item?.betId}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "13px",
                            md: "12px",
                            xs: matchesMobile ? "8px" : "8px",
                          },
                          color: "black",
                          fontWeight: "600",
                          lineHeight: "0.9",
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                    {/* <Box
                      sx={{
                        width: "3px",
                        display: "flex",
                        background: "white",
                      }}
                    ></Box> */}
                  </>
                );
              })}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxHeight: single === "single" ? "400" : "160px",
              width: "100%",
              position: "relative",
            }}
          >
            {userProfitLossData?.profitLoss?.length > 0 &&
              userProfitLossData?.profitLoss?.map(
                (element: any, index: number) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        display: element?.betStatus === 2 ? "none" : "block",
                      }}
                    >
                      <UserProfitLossListComp
                        element={element}
                        markets={userProfitLossData?.markets}
                      />
                      <Divider />
                    </Box>
                  );
                }
              )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserProfitLoss;
