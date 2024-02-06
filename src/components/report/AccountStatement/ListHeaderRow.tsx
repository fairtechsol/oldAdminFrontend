import { Box } from "@mui/material";
import SearchInput from "../../Common/SearchInput";
import NumberDropDown from "../../Common/DropDown/ReportDropdown/NumberDropDown";
import { ApiConstants } from "../../../utils/Constants";

const ListHeaderRow = (props: any) => {
  const {
    getLimitEntries,
    getAccountStatement,
    searchFor,
    pageLimit,
    setPageLimit,
    setCurrentPage,
    fromDate,
    toDate,
  } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "row",
          lg: "row",
          md: "row",
        },
        justifyContent: "space-between",
        px: "10px",
        gap: 1,
        py: "6px",
      }}
    >
      <NumberDropDown
        getLimitEntries={getLimitEntries}
        setPageLimit={setPageLimit}
        pageLimit={pageLimit}
        textColor={"000"}
        setCurrentPage={setCurrentPage}
      />
      <SearchInput
        show={true}
        fromDate={fromDate}
        toDate={toDate}
        searchFor={searchFor}
        endpoint={ApiConstants.USER.LIST}
        getListOfUser={getAccountStatement}
        pageLimit={pageLimit}
        width={"100%"}
        placeholder={"Search..."}
        inputContainerStyle={{
          width: { xs: "50vw", lg: "17vw" },
          marginLeft: "auto",
        }}
      />
    </Box>
  );
};

export default ListHeaderRow;
