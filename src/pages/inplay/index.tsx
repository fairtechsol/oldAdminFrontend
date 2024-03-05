import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Loader from "../../components/Loader";
import MatchComponent from "../../components/Inplay/MatchComponent";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMatchDetail,
  getMatchListInplay,
  getPlacedBets,
  matchListReset,
  updateMatchRates,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Constants } from "../../utils/Constants";
import { socketService } from "../../socketManager";
import { makeStyles } from '@material-ui/core/styles';
const Inplay = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { state } = useLocation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const useStyles = makeStyles({
    whiteTextPagination: {
      '& .MuiPaginationItem-root': {
        color: 'white', // Change text color to white
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

  const matchResultDeclared = () => {
    try {
      dispatch(getMatchListInplay({ currentPage: currentPage }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      dispatch(getMatchListInplay({ currentPage: currentPage }));
    } catch (e) {
      console.log(e);
    }
  }, [currentPage]);

  useEffect(() => {
    try {
    } catch (e) {
      if (success) {
        dispatch(matchListReset());
      }
    }
  }, [success]);

  const getMatchListService = () => {
    dispatch(getMatchListInplay({ currentPage: currentPage }));
  };
  const updateMatchDetailToRedux = (event: any) => {
    try {
      if (state?.matchId === event?.id) {
        dispatch(updateMatchRates(event));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if(success){
      if (matchListInplay && matchListInplay?.matches?.length > 0) {
        matchListInplay?.matches?.map((item: any) => {
          socketService.match.joinMatchRoom(item?.id, profileDetail?.roleName);
        });
        socketService.match.matchResultDeclared(matchResultDeclared);
        socketService.match.matchResultUnDeclared(matchResultDeclared);
        socketService.match.matchAdded(getMatchListService);
      }}
    } catch (e) {
      console.log(e);
    }
    return () => {
      matchListInplay?.matches?.map((item: any) => {
        socketService.match.leaveMatchRoom(item?.id);
      });
      socketService.match.matchResultDeclaredOff(matchResultDeclared);
      socketService.match.matchResultUnDeclaredOff(matchResultDeclared);
      socketService.match.matchAddedOff(getMatchListService);
    };
  }, [matchListInplay?.matches?.length,success]);



  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        matchListInplay?.matches?.map((item: any) => {
          if (item?.id) {
            dispatch(getMatchDetail(item?.id));
            dispatch(getPlacedBets(item?.id));
          }
        });
       
      } else if (document.visibilityState === "hidden") {
        matchListInplay?.matches?.map((item: any) => {
        socketService.match.leaveMatchRoom(item?.id);
        socketService.match.getMatchRatesOff(
          item?.id,
          updateMatchDetailToRedux
        );
      });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);



  return (
    <>
      {matchListInplay && matchListInplay?.matches?.length > 0 ? (
        matchListInplay?.matches?.map((match: any) => {
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
              // handleUpdateMatch={handleUpdateMatch}
            />
          );
        })
      ) : !loading &&(
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
