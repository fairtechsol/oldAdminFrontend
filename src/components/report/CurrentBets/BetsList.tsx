import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentBets } from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";
import Pagination from "../../Common/Pagination";
import EmptyRow from "./EmptyRow";
import ListHeaderRow from "./ListHeaderRow";
import TableDataRow from "./TableDataRow";
import TableHeaderList from "./TableHeaderList";

const BetsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(15);

  const { currentBetsList } = useSelector(
    (state: RootState) => state.user.reportList
  );

  useEffect(() => {
    dispatch(
      getCurrentBets({
        page: currentPage,
        limit: pageLimit,
      })
    );
  }, [currentPage, pageLimit]);

  return (
    <Box
      sx={{
        marginX: "0.5%",
        minHeight: "200px",
        borderTopRightRadius: {
          xs: "10px",
          lg: "0px",
          md: "10px",
        },
        position: "relative",
        borderRadius: {
          xs: "10px 10px 0 0",
          lg: "10px 10px 0 0",
          md: "10px 10px 0 0",
        },
        border: "2px solid white",
        backgroundColor: "white",
      }}
    >
      <ListHeaderRow
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />

      <Box sx={{ overflowX: "auto" }}>
        <TableHeaderList />

        {currentBetsList &&
          currentBetsList?.rows?.map((item: any, index: any) => {
            return (
              <TableDataRow
                key={item?.id}
                data={item}
                index={index}
                containerStyle={{ background: "#FFE094" }}
                profit={true}
                fContainerStyle={{ background: "#0B4F26" }}
                fTextStyle={{ color: "white" }}
                currentPage={currentPage}
                pageLimit={pageLimit}
              />
            );
          })}
        {(!currentBetsList || currentBetsList?.count === 0) && (
          <EmptyRow containerStyle={{ background: "#FFE094" }} />
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          position: "absolute",
        }}
      >
        <Pagination
          currentPage={currentPage}
          pages={Math.ceil(
            parseInt(currentBetsList?.count ? currentBetsList?.count : 1) /
              pageLimit
          )}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default BetsList;
