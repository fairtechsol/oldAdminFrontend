import { Box, Typography } from "@mui/material";
import { memo } from "react";
import type { TeamDetailRowProps } from "../../interface/inplay";
import SeparateBox from "./SeparateBox";

const TeamDetailRow = ({
  teamName,
  runnerNumber,
  match,
}: TeamDetailRowProps) => {
  return (
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
          color="#A7DCFF"
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
          color="#FFB5B5"
        />
        <Box sx={{ width: ".25%", display: "flex", background: "pink" }} />
      </Box>
    </Box>
  );
};

export default memo(TeamDetailRow);
