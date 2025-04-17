import { Box, Button, useMediaQuery } from "@mui/material";
import { memo, useEffect, useState } from "react";
import service from "../../service";
import { ApiConstants, Constants } from "../../utils/Constants";
import Pagination from "../Common/Pagination";
import SearchInput from "../Common/SearchInput";
import AccountListRow from "./AccountListRow";
import ListHeader from "./ListHeader";
import ListHeaderRow from "./ListHeaderRow";
import SubHeaderListRow from "./SubHeaderListRow";

interface AccountListTableProps {
  endpoint: string;
  id: string;
  setShow: any;
  title: string;
  element: any;
}

const AccountListTable = ({
  endpoint,
  id,
  setShow,
  title,
  element,
}: AccountListTableProps) => {
  const matchesBreakPoint = useMediaQuery("(max-width:1137px)");
  const [newData, setNewData] = useState([]);
  const [itemCount, setItemCount] = useState<any>(0);
  const [newTotalBalance, setNewTotalBalance] = useState(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const getUserList = async ({
    userName,
    currentPage,
    userId,
    roleName,
    searchBy,
  }: any) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.LIST}?userId=${userId}&searchBy=${searchBy}&keyword=${userName}&roleName=${roleName}&page=${currentPage}&limit=${Constants.pageLimit}&sort=user.betBlock:ASC,user.userBlock:ASC,user.userName:ASC`
      );
      if (resp) {
        setNewData(resp?.data?.list);
        setItemCount(resp?.data?.count);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const getTotalBalance = async ({ userId, roleName }: any) => {
    try {
      const resp = await service.get(
        `${ApiConstants.USER.TOTAL_BALANCE}?userId=${userId}&roleName=${roleName}`
      );
      if (resp) {
        setNewTotalBalance(resp?.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalBalance({
      userId: id,
      roleName: element?.roleName,
    });
    getUserList({
      userId: element?.id,
      searchBy: "",
      roleName: element?.roleName,
      userName: "",
      currentPage: currentPage,
    });
  }, [id, currentPage]);

  return (
    <Box
      sx={{
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "50px",
        }}
      >
        <ListHeader
          id={id}
          title={title}
          downloadPdfExcel={true}
          endpoint={ApiConstants.USER.LIST}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchInput
            placeholder="Search User..."
            show={true}
            searchFor="userModalList"
            endpoint={endpoint}
            userId={id}
            roleName={element?.roleName}
            setCurrentPage={setCurrentPage}
            getUserListModal={getUserList}
          />
          <Button
            sx={{ color: "", fontSize: "30px" }}
            onClick={() => {
              setShow({ value: false, id: "", title: "" });
            }}
          >
            &times;
          </Button>
        </Box>
      </Box>

      <Box sx={{ overflowX: "auto", maxHeight: "60vh" }}>
        <Box sx={{ display: matchesBreakPoint ? "inline-block" : "block" }}>
          <ListHeaderRow />
          <SubHeaderListRow data={newTotalBalance} />
          {newData?.map((element: any, i: any) => (
            <AccountListRow
              key={i}
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
          ))}
        </Box>
      </Box>
      <Pagination
        currentPage={currentPage}
        pages={Math.ceil(
          parseInt(itemCount ? itemCount : 1) / Constants.pageLimit
        )}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default memo(AccountListTable);
