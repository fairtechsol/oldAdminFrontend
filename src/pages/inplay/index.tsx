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
import { useNavigate } from "react-router-dom";
import MatchComponent from "../../components/Inplay/MatchComponent";
import Loader from "../../components/Loader";
import { socket, socketService } from "../../socketManager";
import {
  getMatchListInplay,
  matchListReset,
  updateMatchRatesFromApiOnList,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { Constants, marketApiConst } from "../../utils/Constants";
const Inplay = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const useStyles = makeStyles({
    whiteTextPagination: {
      "& .MuiPaginationItem-root": {
        color: "white", // Change text color to white
      },
    },
  });
  const classes = useStyles();
  const { loading, matchListInplay, success } = useSelector(
    (state: RootState) => state.match.matchList
  );

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  //   useEffect(() => {
  //     if (matchListInplay?.matches?.length && (!thirdParty || !thirdParty.connected) && success) {
  //       const matchIds = matchListInplay.matches.map((match:any) => match.id);
  //       matchService.connect(matchIds, profileDetail?.roleName);
  //     }
  //     return () => {
  //       matchService.disconnect(); 
  //     }; 
  // }, [success]);

  const getMatchListMarket = async (matchType: string) => {
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

  useEffect(() => {
    try {
      dispatch(getMatchListInplay({ currentPage: currentPage }));
    } catch (e) {
      console.log(e);
    }
  }, [currentPage]);

  const getMatchListService = () => {
    dispatch(getMatchListInplay({ currentPage: currentPage }));
  };

  useEffect(() => {
    try {
      if (success && socket) {
        if (
          matchListInplay?.matches &&
          matchListInplay?.matches?.length > 0 &&
          profileDetail?.roleName
        ) {
          socketService.match.matchResultDeclaredOff();
          socketService.match.matchResultUnDeclaredOff();
          socketService.match.declaredMatchResultAllUserOff();
          socketService.match.unDeclaredMatchResultAllUserOff();
          socketService.match.matchAddedOff();
          // matchListInplay?.matches?.map((item: any) => {
          //   socketService.match.joinMatchRoom(
          //     item?.id,
          //     profileDetail?.roleName
          //   );
          // });
          socketService.match.matchResultDeclared(getMatchListService);
          socketService.match.matchResultUnDeclared(getMatchListService);
          socketService.match.declaredMatchResultAllUser(getMatchListService);
          socketService.match.unDeclaredMatchResultAllUser(getMatchListService);
          socketService.match.matchAdded(getMatchListService);
        }
        dispatch(matchListReset());
      }
    } catch (e) {
      console.log(e);
    }
  }, [
    matchListInplay?.matches?.length,
    success,
    profileDetail?.roleName,
    socket,
  ]);

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
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setCurrentPage(1);
        getMatchListService();
      }
      //  else if (document.visibilityState === "hidden") {
      //   matchListInplay?.matches?.map((item: any) => {
      //     socketService.match.getMatchRatesOff(item?.id);
      //   });
      // }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    getMatchListMarket("cricket");
    getMatchListMarket("tennis");
    getMatchListMarket("football");
    const intervalId = setInterval(() => {
      getMatchListMarket("cricket");
      getMatchListMarket("tennis");
      getMatchListMarket("football");
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {matchListInplay && matchListInplay?.matches?.length > 0
        ? matchListInplay?.matches?.map((match: any) => {
            return (
              <MatchComponent
                key={match.id}
                onClick={() => {
                  navigate(`${Constants.oldAdmin}live_market/matches`, {
                    state: {
                      submit: true,
                      matchId: match?.id,
                    },
                  });
                }}
                top={true}
                blur={false}
                match={match}
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
          onChange={(e: any, value: number) => {
            console.log(e);
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
