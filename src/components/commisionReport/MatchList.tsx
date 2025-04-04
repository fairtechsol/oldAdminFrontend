import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDown } from "../../assets";
import { formatToINR } from "../../helper";
import { getCommissionBetPlaced } from "../../store/actions/reports";
import { AppDispatch, RootState } from "../../store/store";
import AccountListRow from "./AccountListRow";
import HeaderRowCommissionReport from "./HeadeRowCommissionReport";
import StyledImage from "./StyledImage";

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
                fontSize: { lg: "10px", xs: "10px" },
                color: "white",
                marginLeft: "5px",
                fontWeight: "500",
              }}
            >
              ({moment(element?.matchStartDate).format("DD-MM-YYYY")})
            </Typography>
          </Box>
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              marginTop: { xs: "5px", lg: "0" },
              gap: 2,
            }}
          >
            {element?.amount && (
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
                Total: {formatToINR(element?.amount)}
              </Typography>
            )}
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
      </Box>
      {showCommisionReport && selectedId?.matchId == element?.matchId && (
        <>
          <Box
            sx={{
              width: { xs: "100%", lg: "96%" },
              marginTop: { xs: ".25vh" },
              marginLeft: { lg: "4%" },
              display: "flex",
              overflowX: "auto",
              flexDirection: { lg: "column", xs: "column" },
            }}
          >
            <HeaderRowCommissionReport />
            <Box
              sx={{
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
                      filter: element?.settled && "grayscale(0.5)",
                      background: ["BACK", "YES"].includes(element?.betType)
                        ? "#B3E0FF"
                        : ["LAY", "NO"].includes(element?.betType)
                        ? "#FF9292"
                        : "#FFE094 ",
                    }}
                    profit={element.profitLoss >= 0}
                    fContainerStyle={{
                      filter: element?.settled && "grayscale(0.5)",
                      background:
                        element?.commissionType === "session"
                          ? "#319E5B"
                          : "#F1C550",
                    }}
                    fTextStyle={{
                      filter: element?.settled && "grayscale(0.5)",
                    }}
                    element={element}
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
