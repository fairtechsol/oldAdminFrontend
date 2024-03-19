import { Box, useMediaQuery, Button } from "@mui/material";
import { useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import AccountListRow from "./AccountListRow";
import ListHeader from "./ListHeader";
import { useSelector } from "react-redux";
import Pagination from "../Common/Pagination";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";
import SearchInput from "../Common/SearchInput";
import { Constants } from "../../utils/Constants";
import {
  getTotalBalance,
  handleModelActions,
} from "../../store/actions/user/userAction";
import { useDispatch } from "react-redux";

const AccountListTable = ({ endpoint }: any) => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch: AppDispatch = useDispatch();
  // console.log(domain, "title", title, id);
  const { userModalList } = useSelector(
    (state: RootState) => state.user.userList
  );
  const { totalBalance, userElement } = useSelector(
    (state: RootState) => state.user.userList
  );
  const handleModal = () => {
    dispatch(getTotalBalance());
    dispatch(
      handleModelActions({
        url: "",
        userId: "",
        roleName: "",
        domain: "",
        openModal: false,
      })
    );
  };
  return (
    <>
      <Box
        sx={[
          {
            marginX: "0.5%",
            width: { xs: "96%", lg: "90%", md: "96%" },
            minHeight: "200px",
            borderRadius: "10px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            overflow: "hidden",
            overflowY: "auto",
            border: "2px solid white",
            background: "#F8C851",
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "50px",
          }}
        >
          <ListHeader
            id={userElement?.id}
            title={userElement?.title}
            searchFor={"userList"}
            downloadPdfExcel={true}
            // getListOfUser={getListOfUser}
            // setPageCount={setPageCount}
            // matchesMobile={matchesMobile}
            // handleExport={handleExport}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // height: "50px",
            }}
          >
            <SearchInput
              placeholder={"Search User..."}
              show={true}
              searchFor={"userModalList"}
              endpoint={endpoint}
              userId={userElement?.id}
              roleName={userElement?.roleName}
              setCurrentPage={setCurrentPage}
            />
            <Button
              sx={{ color: "", fontSize: "30px" }}
              onClick={() => {
                handleModal();
              }}
            >
              &times;
            </Button>
          </Box>
        </Box>

        <Box sx={{ overflowX: "auto", maxHeight: "60vh" }}>
          <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
            <ListHeaderRow />
            <SubHeaderListRow data={totalBalance} />
            {userModalList?.list?.map((element: any, i: any) => {
              if (i % 2 === 0) {
                return (
                  <AccountListRow
                    key={i}
                    callProfile={false}
                    showCReport={true}
                    showUserDetails={false}
                    showOptions={true}
                    containerStyle={{ background: "#FFE094" }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    element={element}
                    // currentPage={currentPage}
                  />
                );
              } else {
                return (
                  <AccountListRow
                    key={i}
                    callProfile={false}
                    showUserDetails={false}
                    showOptions={true}
                    showCReport={true}
                    // showChildModal={true}
                    containerStyle={{ background: "#ECECEC" }}
                    profit={element.profit_loss >= 0}
                    fContainerStyle={{ background: "#F8C851" }}
                    fTextStyle={{ color: "#0B4F26" }}
                    element={element}
                    // getListOfUser={getListOfUser}
                    // currentPage={currentPage}
                  />
                );
              }
            })}
          </Box>
        </Box>
        <Pagination
          currentPage={currentPage}
          pages={Math.ceil(
            parseInt(userModalList?.count ? userModalList?.count : 1) /
              Constants.pageLimit
          )}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </>
  );
};

export default AccountListTable;
