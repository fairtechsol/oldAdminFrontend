import SeperateBox from "../MatchOdds/SeperateBox";
import { Box, Typography } from "@mui/material";
import Divider from "../../Inplay/Divider";
import { handleNumber } from "../../../helper";

const UserProfitLossListComp = (props: any) => {
  const { element, showTeamC, color } = props;
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
              value2={handleNumber(parseFloat(element?.teamRateA || 0), color) ?? "N/A"}
              value={handleNumber(parseFloat(element?.percentTeamRateA || 0), color) ?? "N/A"}
              color={"#ffffff"}
              width={10}
            />
            <Box
              sx={{ width: "3px", display: "flex", background: "#ffffff" }}
            ></Box>
            <SeperateBox
               value2={handleNumber(parseFloat(element?.teamRateB || 0),color) ?? "N/A"}
               value={handleNumber(parseFloat(element?.percentTeamRateB || 0),color) ?? "N/A"}
              color={"#ffffff"}
              width={10}
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
                     value2={handleNumber(parseFloat(element?.teamRateC || 0),color) ?? "N/A"}
                     value={handleNumber(parseFloat(element?.percentTeamRateC || 0),color) ?? "N/A"}
                  color={"#ffffff"}
                  width={10}
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
