import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MatchComponent from "../../components/Inplay/MatchComponent";
import Loader from "../../components/Loader";
import { socketService } from "../../socketManager";
import {
  getMatchListInplay,
  updateMatchRatesFromApiOnList,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { Constants, marketApiConst } from "../../utils/Constants";
const Inplay = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, matchListInplay, success } = useSelector(
    (state: RootState) => state.match.matchList
  );
  const useStyles = makeStyles({
    whiteTextPagination: {
      "& .MuiPaginationItem-root": {
        color: "white", // Change text color to white
      },
    },
  });

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const getMatchListMarket = async (matchType: any) => {
    try {
      const resp: any = await axios.get(marketApiConst[matchType], {
        timeout: 2000,
      });
      if (resp?.status) {
        dispatch(updateMatchRatesFromApiOnList(resp?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMatchListService = () => {
    try {
      setTimeout(() => {
        dispatch(
          getMatchListInplay({ currentPage: currentPage, matchType: type })
        );
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      dispatch(
        getMatchListInplay({ currentPage: currentPage, matchType: type })
      );
    } catch (e) {
      console.log(e);
    }
  }, [currentPage, type]);

  useEffect(() => {
    try {
      if (success && profileDetail?.roleName) {
        socketService.match.matchResultDeclaredOff();
        socketService.match.matchResultUnDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.unDeclaredMatchResultAllUserOff();
        socketService.match.matchAddedOff();
        // matchListInplay?.matches?.map((item: any) => {
        //   socketService.match.joinMatchRoom(item?.id, profileDetail?.roleName);
        // });
        socketService.match.matchResultDeclared(getMatchListService);
        socketService.match.matchResultUnDeclared(getMatchListService);
        socketService.match.declaredMatchResultAllUser(getMatchListService);
        socketService.match.unDeclaredMatchResultAllUser(getMatchListService);
        socketService.match.matchAdded(getMatchListService);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success, profileDetail?.roleName, type]);

  useEffect(() => {
    return () => {
      // matchListInplay?.matches?.map((item: any) => {
      //   socketService.match.leaveMatchRoom(item?.id);
      // });
      socketService.match.matchResultDeclaredOff();
      socketService.match.matchResultUnDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.unDeclaredMatchResultAllUserOff();
      socketService.match.matchAddedOff();
    };
  }, [success, profileDetail?.roleName, type]);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "visible") {
  //       setCurrentPage(1);
  //       getMatchListService();
  //     }
  //   };
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [type]);
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      getMatchListMarket(type);
    }, 1500);
    const intervalId = setInterval(() => {
      getMatchListMarket(type);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [type]);
  return (
    <>
      {matchListInplay && matchListInplay?.matches?.length > 0
        ? matchListInplay?.matches?.map((match: any) => {
            return (
              <MatchComponent
                key={match.id}
                onClick={() => {
                  navigate(
                    `/admin/matchList/${match?.matchType}/${match?.id}`,
                    {
                      state: {
                        submit: true,
                        matchId: match?.id,
                        matchType: match?.matchType,
                      },
                    }
                  );
                }}
                top={true}
                blur={false}
                match={match}
                // handleUpdateMatch={handleUpdateMatch}
              />
            );
          })
        : !loading && (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    No Record Found...
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
      {matchListInplay && matchListInplay?.matches?.length > 0 && (
        <Pagination
          page={currentPage}
          className={`${classes.whiteTextPagination} d-flex justify-content-center`}
          count={Math.ceil(
            parseInt(matchListInplay?.count ? matchListInplay?.count : 1) /
              Constants.pageLimit
          )}
          color="primary"
          onChange={(_: any, value: number) => {
            setCurrentPage(value);
          }}
        />
      )}
      {loading && (
        <Box
          sx={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader text="" />
        </Box>
      )}
    </>
  );
};

export default Inplay;
