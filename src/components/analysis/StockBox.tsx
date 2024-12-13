import { Box, Typography } from "@mui/material";
import StyledImage from "../Common/StyledImages";
import { handleNumber } from "../../helper";

const StockBox = (props: any) => {
  const { team, value, up, mode, color, showFixed } = props;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: { xs: mode == "1" ? "2px" : 0, lg: "10px" },

        padding: { xs: "3px", md: "5px", lg: "5px" },
        paddingTop: { xs: "1px", md: "5px", lg: "5px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: { xs: "0", md: "0", lg: "10px" },
          minHeight: "24px",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "9px", md: "12px", lg: "14px" },
            fontWeight: "700",

            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {team}
        </Typography>
        {(up == true || up == false) && (
          <StyledImage
            src={
              up
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            sx={{
              height: { xs: "17px", lg: "25px" },
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: { xs: "17px", lg: "25px" },
            }}
          />
        )}
      </Box>
      <Typography
        sx={{
          color: "white",
          fontSize: { xs: "13px", lg: "16px" },
          marginRight: { xs: "0", lg: "5px" },
          fontWeight: "700",
          display: "inline",
          textAlign: { xs: "center", lg: "center" },
        }}
      >
        {showFixed ? value : handleNumber(parseFloat(value), color)}
      </Typography>

      {/* {!team && <img style={{ width: "20px", height: "12px" }} src={ARROWUP} />} */}
    </Box>
  );
};

export default StockBox;
