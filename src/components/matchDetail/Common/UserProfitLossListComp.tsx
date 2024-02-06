import SeperateBox from "../MatchOdds/SeperateBox";
import { Box, Typography } from "@mui/material";
import Divider from "../../Inplay/Divider";

const UserProfitLossListComp = (props: any) => {
  const { element, showTeamC } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "38px",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "38px",
            width: "40%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
            }}
          >
            {element?.userName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            background: "white",
            height: "38px",
            width: { lg: "60%", xs: "80%" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <>
            <SeperateBox
              value2={element?.teamA_rate ?? "N/A"}
              value={element?.teamA_partnership ?? "N/A"}
              color={"#ffffff"}
              widthh={10}
            />
            <Box
              sx={{ width: "3px", display: "flex", background: "#ffffff" }}
            ></Box>
            <SeperateBox
              value2={element?.teamB_rate ?? "N/A"}
              value={element?.teamB_partnership ?? "N/A"}
              color={"#ffffff"}
              widthh={10}
            />
            {showTeamC && (
              <>
                <Box
                  sx={{
                    width: "3px",
                    display: "flex",
                    background: "#ffffff",
                  }}
                ></Box>
                <SeperateBox
                  value2={element?.teamC_rate ?? "N/A"}
                  value={element?.teamC_partnership ?? "N/A"}
                  color={"#ffffff"}
                  widthh={10}
                />
              </>
            )}
          </>
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default UserProfitLossListComp;
