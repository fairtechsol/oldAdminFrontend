import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Calendar from "../../Common/Calendar";
import CustomButtonAdmin from "../../Common/CustomButtonAdmin";

interface YellowHeaderProps {
  getAccountStatement: () => void;
  fromDate: string;
  toDate: string;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
}

const YellowHeader = ({
  getAccountStatement,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: YellowHeaderProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const tab = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "1vh",
      }}
    >
      <Typography
        sx={{
          fontSize: "18px",
          color: "white",
          marginLeft: "10px",
          fontWeight: "600",
          marginY: "2vh",

          alignSelf: "start",
        }}
      >
        Account Statement
      </Typography>
      <Box
        sx={{
          borderRadius: "5px",
          width: "100%",
          p: "10px",
          minHeight: { xs: "0", lg: "80px" },
          background: "#F8C851",
          display: "flex",
          height: "80px",
          flexDirection: {
            xs: "row",
            lg: "row",
            md: "row",
            alignItems: { xs: "center", lg: "flex-end" },
          },
        }}
      >
        <Box
          sx={{
            width: { xs: "67%", lg: "50%" },
            gap: 1,
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: { lg: "70%", xs: "100%", md: "70%" },
            }}
          >
            <Calendar
              title="From"
              startDate={fromDate}
              setStartDate={setFromDate}
            />
            <Box sx={{ width: "10px" }} />
            <Calendar
              title="To"
              startDate={toDate}
              setStartDate={setToDate}
              limit={fromDate}
            />
          </Box>
          <Box sx={{ width: "10px" }} />
          {!matchesMobile && (
            <CustomButtonAdmin
              btnStyle={{
                height: "40px",
                borderRadius: "5px",
                width: "20%",
                marginRight: "0px",
                marginTop: matchesMobile ? "25px" : 0,
                marginLeft: matchesMobile ? "10px" : "20px",
              }}
              onClick={() => {
                getAccountStatement();
              }}
            />
          )}
        </Box>
        {matchesMobile && (
          <CustomButtonAdmin
            btnStyle={{
              height: "40px",
              borderRadius: "5px",
              width: "30%",
              marginRight: "0px",
              marginTop: matchesMobile ? "0" : 0,
              marginLeft: matchesMobile ? "10px" : "20px",
              marginBottom: matchesMobile ? "0" : tab ? "0" : "0",
            }}
            onClick={() => {
              if (fromDate === "" && toDate === "") {
                return false;
              } else {
                getAccountStatement();
              }
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default YellowHeader;
