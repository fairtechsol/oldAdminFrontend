import { Box, Typography } from "@mui/material";
import Pagination from "../../Common/Pagination";
import ListHeaderRow from "./ListHeaderRow";
import TableDataRow from "./TableDataRow";
import TableHeaderList from "./TableHeaderList";

const GeneralReportList = () => {
  return (
    <Box
      sx={[
        {
          marginX: "0.5%",
          minHeight: "200px",
          borderRadius: "2px",
          border: "2px solid white",
        },
        (theme: any) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <ListHeaderRow />
      <TableHeaderList />
      <TableDataRow style={{ background: "#FFE094" }} profit={true} />
      <TableDataRow style={{ background: "#ECECEC" }} profit={false} />
      <TableDataRow style={{ background: "#FFE094" }} profit={true} />
      <TableDataRow style={{ background: "#ECECEC" }} profit={false} />
      <TableDataRow style={{ background: "#FFE094" }} profit={true} />
      <TableDataRow style={{ background: "#ECECEC" }} profit={false} />
      <TableDataRow style={{ background: "#FFE094" }} profit={true} />
      <TableDataRow style={{ background: "#ECECEC" }} profit={false} />
      <RowLast />
      <Pagination currentPage={1} pages={10} setCurrentPage={() => {}} />
    </Box>
  );
};

const RowLast = ({ containerStyle, fTextStyle, style }: any) => {
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          background: "#0B4F26",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
        },
        containerStyle,
      ]}
    >
      <Box
        sx={[
          {
            width: "54.45%",
            display: "flex",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            justifyContent: "center",
            background: "#303030",
          },
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: "12px",
              fontWeight: "600",
              textAlign: "center",
              color: "white",
            },
            fTextStyle,
          ]}
        >
          General Total
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "45.65%",
            display: "flex",
            paddingLeft: "10px",
            background: "#303030",
            alignItems: "center",
            justifyContent: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          style,
        ]}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#fff",
          }}
        >
          100,000,000
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "54.45%",
            display: "flex",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            justifyContent: "center",
            background: "#303030",
          },
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: "12px",
              fontWeight: "600",
              textAlign: "center",
              color: "white",
            },
            fTextStyle,
          ]}
        >
          General Total
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "45.65%",
            display: "flex",
            paddingLeft: "10px",
            background: "#303030",
            alignItems: "center",
            justifyContent: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          style,
        ]}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "600",
            color: "#fff",
          }}
        >
          100,000,000
        </Typography>
      </Box>
    </Box>
  );
};
export default GeneralReportList;
