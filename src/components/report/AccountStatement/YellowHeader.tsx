import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Calendar from "../../Common/Calendar";
import CustomButtonAdmin from "../../Common/CustomButtonAdmin";

const YellowHeader = (props: any) => {
  const { getAccountStatement, fromDate, toDate, setFromDate, setToDate } =
    props;

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
              sx={{ width: "50%" }}
              title={"From"}
              startDate={fromDate}
              setStartDate={setFromDate}
            />
            <Box sx={{ width: "10px" }}></Box>

            <Calendar
              sx={{ width: "50%" }}
              title={"To"}
              startDate={toDate}
              setStartDate={setToDate}
              limit={fromDate}
            />
          </Box>

          <Box sx={{ width: "10px" }}></Box>
          {!matchesMobile && (
            <CustomButtonAdmin
              btnStyle={{
                height: "40px",
                borderRadius: "5px",
                width: "20%",
                marginRight: "0px",
                marginTop: matchesMobile ? "25px" : 0,
                marginLeft: matchesMobile ? "10px" : "20px",
                // marginBottom: matchesMobile ? "15px" : tab ? "28px" : "15px",
              }}
              onClick={() => {
                getAccountStatement();
              }}
              getAccountStatement={getAccountStatement}
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
                // toast.warn("Please select From and To date");
                return false;
              } else {
                getAccountStatement(fromDate, toDate);
              }
            }}
            getAccountStatement={getAccountStatement}
          />
        )}
      </Box>
    </Box>
  );
};

export default YellowHeader;
