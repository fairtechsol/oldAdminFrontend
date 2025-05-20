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
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MatchComponent from "../../components/Inplay/MatchComponent";
import Loader from "../../components/Loader";
import { socket, socketService } from "../../socketManager";
import {
  getMatchListInplay,
  matchListInplaySuccessReset,
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
        color: "white",
      },
    },
  });
  const classes = useStyles();
  const { loading, matchListInplay, success, matchListInplaySuccess } =
    useSelector((state: RootState) => state.match.matchList);

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

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
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMatchListMarket("cricket");
      getMatchListMarket("tennis");
      getMatchListMarket("football");
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (matchListInplaySuccess) {
      getMatchListMarket("cricket");
      getMatchListMarket("tennis");
      getMatchListMarket("football");
      dispatch(matchListInplaySuccessReset());
    }
  }, [matchListInplaySuccess]);

  return (
    <>
      {matchListInplay && matchListInplay?.matches?.length > 0
        ? matchListInplay?.matches?.map((match: any) => (
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
          ))
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

export default memo(Inplay);
