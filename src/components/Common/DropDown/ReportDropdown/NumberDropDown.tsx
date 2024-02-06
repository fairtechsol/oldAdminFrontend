import { Box, Typography } from "@mui/material";
import SmallDropDown from "../../../report/AccountStatement/SmallDropDown";

const NumberDropDown = ({ getLimitEntries, textColor, setPageLimit, pageLimit, setCurrentPage }: any) => {
  return (
    <Box display={"flex"} alignItems="center" sx={{ width: "100%" }}>
      <Typography
        sx={{ fontSize: "10px", color: `${textColor}`, fontWeight: "500" }}
      >
        Show
      </Typography>
      <SmallDropDown getLimitEntries={getLimitEntries} pageLimit={pageLimit} setPageLimit={setPageLimit} setCurrentPage={setCurrentPage}/>
      <Typography
        sx={{ fontSize: "10px", color: `${textColor}`, fontWeight: "500" }}
      >
        Entries
      </Typography>
    </Box>
  );
};

export default NumberDropDown;
