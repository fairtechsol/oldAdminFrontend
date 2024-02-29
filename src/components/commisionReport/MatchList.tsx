import { Box, Typography } from "@mui/material";
import moment from "moment";
import StyledImage from "./StyledImage";
import { ArrowDown } from "../../assets";
import AccountListRow from "./AccountListRow";
import HeaderRowCommissionReport from "./HeadeRowCommissionReport";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { getCommissionBetPlaced } from "../../store/actions/reports";
import { useSelector } from "react-redux";

const MatchList = ({
  element,
  index,
  showCommisionReport,
  setShowCommisionReport,
  selectedId,
  setSelectedId,
  id,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const { commissionBetPlacedList } = useSelector(
    (state: RootState) => state.report.reportList
  );
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        onClick={() => {
          if (
            showCommisionReport &&
            selectedId?.matchId == element?.matchId &&
            selectedId?.userId == id
          ) {
            setShowCommisionReport(false);
            setSelectedId({
              matchId: "",
              userId: "",
            });
          } else {
            if (
              selectedId?.matchId == element?.matchId &&
              selectedId?.userId == id
            ) {
            } else {
              setSelectedId({
                matchId: element?.matchId,
                userId: id,
              });
              setShowCommisionReport(true);
              dispatch(
                getCommissionBetPlaced({
                  userId: id,
                  matchId: element?.matchId,
                })
              );
            }
          }
        }}
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
            {1 + index}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "90%", lg: "100%" },
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
              {element?.matchName}
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "10px", xs: "0" },
                color: "white",
                marginLeft: "5px",
                fontWeight: "500",
              }}
            >
              ({moment(element?.matchStartDate).format("DD-MM-YYYY")})
            </Typography>
          </Box>
          <StyledImage
            src={ArrowDown}
            sx={{
              width: { lg: "20px", xs: "10px" },
              height: { lg: "10px", xs: "6px" },
              transform:
                showCommisionReport && selectedId?.matchId == element?.matchId
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
            }}
          />
        </Box>
      </Box>
      {showCommisionReport && selectedId?.matchId == element?.matchId && (
        <>
          <Box
            sx={{
              width: { xs: "100%", lg: "96%" },
              marginTop: { xs: ".25vh" },
              marginLeft: { lg: "4%" },
              display: "flex",
              // flexDirection: { lg: "row", xs: "column" },
              flexDirection: { lg: "column", xs: "column" },
            }}
          >
            <HeaderRowCommissionReport />
            <Box
              sx={{
                // display: matchesBreakPoint ? "inline-block" : "block",
                width: "100%",
                position: "relative",
              }}
            >
              {commissionBetPlacedList?.length > 0 &&
                commissionBetPlacedList.map((element: any, i: number) => (
                  <AccountListRow
                    key={i}
                    showOptions={false}
                    showChildModal={true}
                    containerStyle={{
                      background:
                        element?.commissionType === "commission setteled"
                          ? "#135a2e"
                          : ["BACK", "YES"].includes(element?.betType)
                          ? "#B3E0FF"
                          : ["LAY", "NO"].includes(element?.betType)
                          ? "#FF9292"
                          : "#FFE094 ",
                    }}
                    profit={element.profitLoss >= 0}
                    fContainerStyle={{
                      background:
                        element?.commissionType === "session"
                          ? "#319E5B"
                          : element?.commissionType === "commission setteled"
                          ? "#135a2e"
                          : "#F1C550",
                    }}
                    fTextStyle={{
                      color:
                        ["commission setteled"].includes(
                          element?.commissionType
                        ) && "white",
                    }}
                    element={element}
                    // getListOfUser={getListOfUser}
                    // currentPage={currentPage}
                  />
                ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MatchList;
