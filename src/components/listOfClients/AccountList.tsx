import { Box, Typography, useMediaQuery } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AccountListDataInterface } from "../../interface/listOfClients";
import {
  getTotalBalance,
  getUserList,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { ApiConstants, Constants } from "../../utils/Constants";
import Pagination from "../Common/Pagination";
import AccountListRow from "./AccountListRow";
import HeaderRow from "./HeaderRow";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";

interface AccountListProps {
  endpoint: string;
}

const AccountList = (endpoint: AccountListProps) => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { userList } = useSelector((state: RootState) => state.user.userList);
  const { totalBalance } = useSelector(
    (state: RootState) => state.user.userList
  );

  useEffect(() => {
    dispatch(getUserList({ currentPage: currentPage, url: endpoint }));
    dispatch(getTotalBalance({}));
  }, [currentPage]);

  return (
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
          endpoint={ApiConstants.USER.LIST}
          searchFor="userList"
          downloadPdfExcel={true}
          setCurrentPage={setCurrentPage}
        />
        <Box sx={{ overflowX: "auto" }}>
          <Box
            sx={{
              display: matchesBreakPoint ? "inline-block" : "block",
              position: { xs: "relative", lg: "static" },
            }}
          >
            <ListHeaderRow />
            <SubHeaderListRow data={totalBalance && totalBalance} />
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
                (element: AccountListDataInterface, i: number) => (
                  <AccountListRow
                    key={element?.id}
                    containerStyle={{
                      background: i % 2 === 0 ? "#FFE094" : "#ECECEC",
                    }}
                    profit={(+element?.userBal?.profitLoss || 0) >= 0}
                    fContainerStyle={{
                      background: i % 2 === 0 ? "#0B4F26" : "#F8C851",
                    }}
                    fTextStyle={{ color: i % 2 === 0 ? "white" : "#0B4F26" }}
                    element={element}
                    currentPage={currentPage}
                  />
                )
              )}
          </Box>
        </Box>
      </Box>
      <Pagination
        currentPage={currentPage}
        pages={Math.ceil(
          parseInt(userList?.count ? userList?.count : 1) / Constants.pageLimit
        )}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default memo(AccountList);
