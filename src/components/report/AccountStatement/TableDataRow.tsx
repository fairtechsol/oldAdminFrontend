import { Box, Typography } from "@mui/material";
import moment from "moment";

const TableDataRow = (props: any) => {
  const {
    containerStyle,
    fContainerStyle,
    fTextStyle,
    index,
    date,
    closing,
    description,
    touserName,
    fromuserName,
    trans_type,
    amount,
  } = props;

  // const dateString = date;
  // const dateObj = new Date(dateString);
  // const formattedDate = dateObj.toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          width: { xs: "222vw", md: "100%", lg: "100%" },
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
            width: { xs: "14%", lg: "11%", md: "11%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          fContainerStyle,
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
              fontWeight: "600",
            },
            fTextStyle,
          ]}
        >
          {moment(date).format("DD-MM-YYYY HH:mm")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "16%", lg: "14%", md: "14%" },
          display: "flex",
          paddingLeft: "10px",
          background: "#27AC1E",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {amount > 0 ? amount : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "16%", lg: "14%", md: "14%" },
          display: "flex",
          paddingLeft: { lg: "10px", xs: "5px" },
          background: "#E32A2A",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
        }}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "white" }}
        >
          {amount < 0 ? amount : ""}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "14%", lg: "11%", md: "11%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {closing}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "36%", lg: "36%", md: "36%" },
          display: "flex",
          paddingLeft: "10px",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: trans_type === "credit_refer" ? "#F8C851" : "#FFE094",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "18%", lg: "11%", md: "18%" },
          display: "flex",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          justifyContent: "center",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "10px", lg: "12px", md: "10px" },
            fontWeight: "700",
          }}
        >
          {fromuserName}
        </Typography>
      </Box>
      <Box
        sx={{
          width: { xs: "18%", lg: "11%", md: "18%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "45px",
          borderRight: "2px solid white",
          background: index % 2 != 0 ? "#FFE094" : "#ECECEC",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "10px", lg: "12px", md: "10px" },
            fontWeight: "700",
          }}
        >
          {touserName}
        </Typography>
      </Box>
    </Box>
  );
};

export default TableDataRow;
