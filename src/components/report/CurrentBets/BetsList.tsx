import { Box } from "@mui/material";
import { useState } from "react";
import Pagination from "../../Common/Pagination";
import EmptyRow from "./EmptyRow";
import ListHeaderRow from "./ListHeaderRow";
import TableDataRow from "./TableDataRow";
import TableHeaderList from "./TableHeaderList";

const BetsList = ({ betHistory }: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(15);

  function paginate(array: any, pageNumber: number, pageSize: number) {
    try {
      --pageNumber;
      if (array.length > 0) {
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        return array?.slice(startIndex, endIndex);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const currentPageData = paginate(betHistory, currentPage, pageLimit);

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

        {currentPageData &&
          currentPageData?.map((item: any, index: any) => {
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
        {(!betHistory || betHistory?.length === 0) && (
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
            parseInt(betHistory?.length ? betHistory?.length : 1) / pageLimit
          )}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default BetsList;
