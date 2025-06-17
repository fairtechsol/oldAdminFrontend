import { Box, Typography } from "@mui/material";
import CommissionDot from "../../Common/CommissionDot";

interface SingleBoxProps {
  data: any;
  header: boolean;
  color: any;
  up?: boolean;
  first?: boolean;
  time?: any;
  boxWidth: string;
  isCommissionActive?: boolean;
}

const SingleBox = ({
  data,
  header,
  color,
  up,
  first,
  time,
  boxWidth,
  isCommissionActive,
}: SingleBoxProps) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: boxWidth,
          height: "40px",
          background: "#F1C550",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isCommissionActive && <CommissionDot />}
        {data === "Bookmaker" ? (
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "8px", md: "10px", lg: "12px" },
              color: "black",
              textAlign: "center",
            }}
          >
            {data}
          </Typography>
        ) : (
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "8px", md: "10px", lg: "12px" },
              color: "black",
              textAlign: "center",
              maxHeight: "2em",
              overflow: "hidden",
              lineHeight: 1,
            }}
          >
            {data}
          </Typography>
        )}
      </Box>
    ) : up ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { lg: "11px", md: "9px", xs: "9px" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: { lg: "12px", md: "10px", xs: "10px" },
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            maxHeight: "1em",
            overflow: "hidden",
            lineHeight: 1,
          }}
        >
          {data.teamName}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          width: boxWidth,
          height: "40px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: {
              xs: "10px",
              md: "10px",
              lg: "12px",
              textTransform: "capitalize",
            },
            color: "black",
          }}
        >
          {data}
        </Typography>
      </Box>
    )
  ) : (
    header && (
      <Box
        sx={{
          width: boxWidth,
          height: "25px",
          background: "#319E5B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: { lg: ".7vw", xs: "10px" },
            color: "white",
            flexWrap: "wrap",
          }}
        >
          {data}
        </Typography>
      </Box>
    )
  );
};

export default SingleBox;
