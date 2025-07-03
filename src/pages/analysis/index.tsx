import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomBox from "../../components/analysis/CustomBox";
import MatchListComponent from "../../components/analysis/MatchListComponent";
import Loader from "../../components/Loader";
import { socket, socketService } from "../../socketManager";
import { getAnalysisList } from "../../store/actions/match/multipleMatchAction";
import { AppDispatch, RootState } from "../../store/store";
import { Constants } from "../../utils/Constants";
import "./index.css";

const Analysis = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [mode, setMode] = useState("0");
  const [max, setMax] = useState("2");
  const [selected, setSelected] = useState<any>([]);
  const [matchIds, setMatchIds] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMatchType, setSelectedMatchType] = useState<string>("");
  const useStyles = makeStyles({
    whiteTextPagination: {
      "& .MuiPaginationItem-root": {
        color: "white",
      },
    },
  });
  const classes = useStyles();
  const { loading, analysisList, success } = useSelector(
    (state: RootState) => state.match.analysisList
  );

  const handleClick = (value: string) => {
    setMax(value);
    setMode("1");
  };

  const changeSelected = (match: any) => {
    if (mode === "0" || !match?.id) return false;

    const matchId = match.id;
    const isAlreadySelected = selected.includes(matchId);
    const isSameMatchType =
      !selectedMatchType || selectedMatchType === match.matchType;

    if (!isSameMatchType) {
      toast.error("Please Select Match Of Same Category");
      return false;
    }

    if (isAlreadySelected) {
      const updatedSelected = selected.filter((id: any) => id !== matchId);
      setSelected(updatedSelected);
      setMatchIds(updatedSelected);
      if (!updatedSelected.length) setSelectedMatchType("");
    } else {
      if (selected.length >= +max) {
        toast.warn(`Only ${max} allowed`);
        return false;
      }
      setSelected([...selected, matchId]);
      setMatchIds([...selected, matchId]);
      if (!selectedMatchType) setSelectedMatchType(match.matchType);
    }
  };

  const handleSubmit = () => {
    if (max == "2") {
      if (selected.length != 2) {
        toast.error("Select 2 matches");
        return;
      }
    } else if (max == "3") {
      if (selected.length != 3) {
        toast.error("Select 3 matches");
        return;
      }
    } else if (max == "4") {
      if (selected.length != 4) {
        toast.error("Select 4 matches");
        return;
      }
    }
    if (selected) {
      setMode("0");
      setSelected([]);
      setMatchIds([]);
    }
    if (max == "3") {
      navigate(`${Constants.oldAdmin}market_analysis/multiple_Match`, {
        state: {
          match: Number(max),
          matchIds: matchIds,
        },
      });
    } else {
      navigate(`${Constants.oldAdmin}market_analysis/multiple_Match`, {
        state: {
          match: Number(max),
          matchIds: matchIds,
        },
      });
    }
  };

  const getMatchListService = () => {
    dispatch(getAnalysisList({ currentPage: currentPage }));
  };

  useEffect(() => {
    dispatch(getAnalysisList({ currentPage: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    try {
      if (success && socket) {
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
    } catch (error) {
      console.log(error);
    }
  }, [success, socket]);

  useEffect(() => {
    return () => {
      socketService.match.matchResultDeclaredOff();
      socketService.match.matchResultUnDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.unDeclaredMatchResultAllUserOff();
      socketService.match.matchAddedOff();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        margin: "0.5%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginX: ".5%",
            padding: { xs: "5px", lg: "0px 8px" },
            flexDirection: { xs: "column", md: "row", lg: "row" },
            width: "100%",
            marginY: { xs: "1%", md: "1%", lg: "0" },
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              width: "100%",
              fontWeight: "700",
              marginY: "0.5%",
              marginLeft: "5px",
              alignSelf: "start",
            }}
          >
            MARKET ANALYSIS
          </Typography>
          {mode == "0" && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: {
                  xs: "center",
                  md: "flex-end",
                  lg: "flex-end",
                  marginRight: "0.5%",
                },
              }}
            >
              {["2", "3", "4"].map((value: string, index: number) => (
                <Fragment key={value}>
                  <CustomBox
                    onClick={() => handleClick(value)}
                    title={`${value} Match Screen`}
                  />
                  {index !== 2 && <Box sx={{ width: "10px" }} />}
                </Fragment>
              ))}
            </Box>
          )}
          {mode == "1" && (
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <CustomBox
                bg="#E32A2A"
                onClick={() => {
                  setMode("0");
                  setSelected([]);
                  setMatchIds([]);
                }}
                title="Cancel"
              />
              <CustomBox onClick={handleSubmit} title="Submit" />
              <Box sx={{ width: "10px" }} />
            </Box>
          )}
        </Box>
      </Box>
      {loading ? (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      ) : analysisList?.matches?.length > 0 ? (
        <>
          {analysisList?.matches?.map((match: any) => {
            return (
              <MatchListComponent
                key={match?.id}
                data={match}
                setSelected={() => changeSelected(match)}
                mode={mode}
                selected={!selected.includes(match.id as never)}
                team={match?.teamA}
                team2={match?.teamB}
                title={match?.title}
              />
            );
          })}
          <Pagination
            page={currentPage}
            className={`${classes.whiteTextPagination} d-flex justify-content-center`}
            count={Math.ceil(
              parseInt(analysisList?.count ? analysisList?.count : 1) /
                Constants.pageLimit
            )}
            color="primary"
            onChange={(_, value: number) => {
              setCurrentPage(value);
            }}
          />
        </>
      ) : (
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
    </Box>
  );
};

export default memo(Analysis);
