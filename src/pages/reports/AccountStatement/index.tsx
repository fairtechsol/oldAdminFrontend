import { Box } from "@mui/material";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Common/Pagination";
import YellowHeader from "../../../components/report/AccountStatement/YellowHeader";
import ListHeaderRow from "../../../components/report/AccountStatement/ListHeaderRow";
import TableHeaderList from "../../../components/report/AccountStatement/TableHeaderList";
import TableDataRow from "../../../components/report/AccountStatement/TableDataRow";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAccountStatement } from "../../../store/actions/reports";
import { useSelector } from "react-redux";
import moment from "moment";

const AccountStatement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(15);
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { accountStatement, loading } = useSelector(
    (state: RootState) => state.user.reportList
  );

  useEffect(() => {
    if (profileDetail) {
      let filter = "";
      if (fromDate && toDate) {
        filter += `&createdAt=between${moment(fromDate)?.format(
          "YYYY-MM-DD"
        )}|${moment(toDate.setDate(toDate.getDate() + 1))?.format(
          "YYYY-MM-DD"
        )}`;
      } else if (fromDate) {
        filter += `&createdAt=gte${moment(fromDate)?.format("YYYY-MM-DD")}`;
      } else if (toDate) {
        filter += `&createdAt=lte${moment(toDate)?.format("YYYY-MM-DD")}`;
      }
      dispatch(
        getAccountStatement({
          id: profileDetail?.id,
          page: currentPage,
          pageLimit: pageLimit,
          filter,
        })
      );
    }
  }, [profileDetail, currentPage, pageLimit]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ marginX: { xs: "2vw", lg: "1vw" } }}>
          <YellowHeader
            fromDate={fromDate}
            toDate={toDate}
            getAccountStatement={() => {
              let filter = "";
              if (fromDate && toDate) {
                filter += `&createdAt=between${moment(fromDate)?.format(
                  "YYYY-MM-DD"
                )}|${moment(toDate.setDate(toDate.getDate() + 1))?.format(
                  "YYYY-MM-DD"
                )}`;
              } else if (fromDate) {
                filter += `&createdAt=gte${moment(fromDate)?.format(
                  "YYYY-MM-DD"
                )}`;
              } else if (toDate) {
                filter += `&createdAt=lte${moment(toDate)?.format(
                  "YYYY-MM-DD"
                )}`;
              }
              dispatch(
                getAccountStatement({
                  id: profileDetail?.id,
                  page: currentPage,
                  filter: filter,
                })
              );
            }}
            setToDate={setToDate}
            setFromDate={setFromDate}
          />
        </Box>

        <Box
          sx={[
            {
              marginX: { xs: "2vw", lg: "1vw" },
              minHeight: "100px",
              borderRadius: "2px",
              border: "2px solid white",
              width: "97.5%",
              borderTopRightRadius: {
                xs: "10px",
                lg: "0px",
                md: "10px",
              },
              borderTopLeftRadius: {
                xs: "10px",
                lg: "0px",
                md: "10px",
              },
              background: "#F8C851",
            },
          ]}
        >
          <ListHeaderRow
            searchFor={"accountStatement"}
            pageLimit={pageLimit}
            setPageLimit={setPageLimit}
            setCurrentPage={setCurrentPage}
            fromDate={fromDate}
            toDate={toDate}
          />

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
              <Box sx={{ overflowX: "scroll", width: "100%" }}>
                <TableHeaderList />
                {accountStatement?.transactions?.map((item: any) => (
                  <TableDataRow
                    key={item?.id}
                    index={item?.id}
                    containerStyle={{ background: "#FFE094" }}
                    profit={true}
                    fContainerStyle={{ background: "#0B4F26" }}
                    fTextStyle={{ color: "white" }}
                    date={moment(item?.createdAt)}
                    description={item?.description}
                    closing={item?.closingBalance}
                    trans_type={item?.transType}
                    amount={item?.amount}
                    fromuserName={item?.actionByUser?.userName}
                    touserName={item?.user?.userName}
                  />
                ))}
              </Box>
              <Pagination
                currentPage={currentPage}
                pages={Math.ceil(
                  parseInt(
                    accountStatement?.count ? accountStatement?.count : 1
                  ) / pageLimit
                )}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AccountStatement;
