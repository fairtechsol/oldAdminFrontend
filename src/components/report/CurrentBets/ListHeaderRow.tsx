import { Box } from "@mui/material";
import NumberDropDown from "../../Common/DropDown/ReportDropdown/NumberDropDown";
import SearchInput from "../../Common/SearchInput";

const ListHeaderRow = ({ setPageLimit, pageLimit, setCurrentPage }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "row",
          md: "row",
          background: "#F8C851",
          borderRadius: "10px 10px 0 0",
        },
        justifyContent: "space-between",
        px: "10px",
        gap: 1,
        py: "6px",
      }}
    >
      <NumberDropDown
        textColor="#000"
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        setCurrentPage={setCurrentPage}
      />
      <SearchInput
        show={true}
        width="100%"
        searchFor="currentBets"
        placeholder="Search..."
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default ListHeaderRow;
