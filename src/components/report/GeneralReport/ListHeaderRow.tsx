import { Box } from "@mui/material";
import { ApiConstants } from "../../../utils/Constants";
import NumberDropDown from "../../Common/DropDown/ReportDropdown/NumberDropDown";
import SearchInput from "../../Common/SearchInput";

const ListHeaderRow = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column-reverse",
          lg: "row",
          md: "row",
        },
        justifyContent: "space-between",
        px: "10px",
        gap: 1,
        py: "6px",
      }}
    >
      <NumberDropDown pageLimit={15} textColor="white" />
      <SearchInput
        show={true}
        width="100%"
        placeholder="Search..."
        endpoint={ApiConstants.USER.LIST}
      />
    </Box>
  );
};

export default ListHeaderRow;
