import { Box, Typography, useMediaQuery } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountListDataInterface } from "../../../interface/listOfClients";
import { getUserList } from "../../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../../store/store";
import { ApiConstants, Constants } from "../../../utils/Constants";
import Pagination from "../../Common/Pagination";
import Loader from "../../Loader";
import AccountListExpertRow from "./AccountListExpertRow";
import HeaderRow from "../HeaderRow";
import ListHeaderExpertRow from "./ListHeaderExpertRow";

const AccountListExpert = (endpoint: any) => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { userList, loading } = useSelector(
    (state: RootState) => state.user.userList
  );

  useEffect(() => {
    dispatch(getUserList({ currentPage: currentPage, url: endpoint }));
  }, [currentPage]);

  return (
    <>
      {loading ? (
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
      ) : (
        <>
          <Box
            sx={[
              {
                minHeight: "200px",
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
            <HeaderRow
              endpoint={ApiConstants.USER.EXPERTLIST}
              searchFor={"userList"}
              downloadPdfExcel={false}
            />
            <Box sx={{ overflowX: "auto" }}>
              <Box
                sx={{
                  display: matchesBreakPoint ? "inline-block" : "block",
                  position: { xs: "relative", lg: "static" },
                }}
              >
                <Box>
                  <ListHeaderExpertRow />
                  {userList?.list?.length === 0 && (
                    <Box>
                      <Typography
                        sx={{
                          color: "#000",
                          textAlign: "center",
                          fontSize: { lg: "16px", xs: "10px" },
                          fontWeight: "600",
                          margin: "1rem",
                        }}
                      >
                        No Matching Records Found
                      </Typography>
                    </Box>
                  )}
                  {userList?.list?.length > 0 &&
                    userList?.list?.map(
                      (element: AccountListDataInterface, i: any) => {
                        if (i % 2 === 0) {
                          return (
                            <AccountListExpertRow
                              key={element?.id}
                              callProfile={true}
                              showOptions={true}
                              showUserDetails={true}
                              showCReport={true}
                              containerStyle={{ background: "#FFE094" }}
                              profit={+element.profit_loss >= 0}
                              fContainerStyle={{ background: "#0B4F26" }}
                              fTextStyle={{ color: "white" }}
                              element={element}
                            />
                          );
                        } else {
                          return (
                            <AccountListExpertRow
                              key={element?.id}
                              showCReport={true}
                              callProfile={true}
                              showUserDetails={true}
                              showOptions={true}
                              containerStyle={{ background: "#ECECEC" }}
                              profit={+element.profit_loss >= 0}
                              fContainerStyle={{ background: "#F8C851" }}
                              fTextStyle={{ color: "#0B4F26" }}
                              element={element}
                            />
                          );
                        }
                      }
                    )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Pagination
            currentPage={currentPage}
            pages={Math.ceil(
              parseInt(userList?.count ? userList?.count : 1) /
                Constants.pageLimit
            )}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default memo(AccountListExpert);
