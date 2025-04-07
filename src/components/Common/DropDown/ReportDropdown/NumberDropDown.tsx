import { Box, Typography } from "@mui/material";
import SmallDropDown from "../../../report/AccountStatement/SmallDropDown";

interface NumberDropDownProps {
  textColor: string;
  setPageLimit?: (value: number) => void;
  pageLimit: number;
  setCurrentPage?: (value: number) => void;
}

const NumberDropDown = ({
  textColor,
  setPageLimit,
  pageLimit,
  setCurrentPage,
}: NumberDropDownProps) => {
  return (
    <Box display={"flex"} alignItems="center" sx={{ width: "100%" }}>
      <Typography
        sx={{ fontSize: "10px", color: `${textColor}`, fontWeight: "500" }}
      >
        Show
      </Typography>
      <SmallDropDown
        pageLimit={pageLimit}
        setPageLimit={setPageLimit}
        setCurrentPage={setCurrentPage}
      />
      <Typography
        sx={{ fontSize: "10px", color: `${textColor}`, fontWeight: "500" }}
      >
        Entries
      </Typography>
    </Box>
  );
};

export default NumberDropDown;
