import { Box } from "@mui/material";
import Pagination from "../../Common/Pagination";
import EmptyRow from "./EmptyRow";
import TableHeaderList from "./TableHeaderList";
import TableDataRow from "./TableDataRow";
import ListHeaderRow from "./ListHeaderRow";
import { useState } from "react";

const BetsList = (props: any) => {
  const { getLimitEntries, betHistory } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(15);

  function paginate(array: any, pageNumber: number, pageSize: number) {
    --pageNumber;
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
  }

  const currentPageData = paginate(betHistory, currentPage, pageLimit);

  return (
    <Box
      sx={[
        {
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
        },
        (theme: any) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <ListHeaderRow
        getLimitEntries={getLimitEntries}
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />

      <Box sx={{ overflowX: "scroll" }}>
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
              />
            );
          })}
        {(!betHistory || betHistory.length === 0) && (
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
          pages={+(betHistory.length / pageLimit).toFixed()}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default BetsList;
