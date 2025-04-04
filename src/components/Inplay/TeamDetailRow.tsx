import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SeparateBox from "./SeparateBox";

const TeamDetailRow = (props: any) => {
  const { teamName, runnerNumber, match } = props;
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "40px",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: "40%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "10px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {teamName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "40px",
            width: { lg: "60%", xs: "80%" },
            justifyContent: { xs: "flex-end", lg: "flex-end" },
            alignItems: "center",
          }}
        >
          <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
          <SeparateBox
            value={
              (runnerNumber == 0
                ? match?.back1 || match?.section?.[0]?.odds?.[0]?.odds || 0
                : runnerNumber == 1
                ? match?.back11 || match?.section?.[1]?.odds?.[0]?.odds || 0
                : runnerNumber == 2
                ? match?.back12 || match?.section?.[2]?.odds?.[0]?.odds || 0
                : 0) ?? 0
            }
            value2={""}
            color={matchesMobile ? "#A7DCFF" : "#A7DCFF"}
          />
          <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
          <SeparateBox
            value={
              (runnerNumber == 0
                ? match?.lay1 || match?.section?.[0]?.odds?.[1]?.odds || 0
                : runnerNumber == 1
                ? match?.lay11 || match?.section?.[1]?.odds?.[1]?.odds || 0
                : runnerNumber == 2
                ? match?.lay12 || match?.section?.[2]?.odds?.[1]?.odds || 0
                : 0) ?? 0
            }
            value2={""}
            color={matchesMobile ? "#FFB5B5" : "#FFB5B5"}
          />
          <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
        </Box>
      </Box>
    </>
  );
};

export default TeamDetailRow;
