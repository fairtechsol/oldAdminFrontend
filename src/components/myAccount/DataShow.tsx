import { Box, Typography } from "@mui/material";
import { handleNumber } from "../../helper";
import { DataShowInterface } from "../../interface/myAccount";

const DataShow = ({
  title,
  value,
  valueProfitLoss,
  valuePercentage,
  containerStyle,
  valueContainerStyle,
}: DataShowInterface) => {
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "38px",
          backgroundColor: "white",
          alignItems: "center",
          border: "2px solid white",
        },
        containerStyle,
      ]}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          paddingLeft: "10px",
        }}
      >
        <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
          {title}
        </Typography>
      </Box>
      <Box
        sx={[
          {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "35px",
            background: "#0B4F26",
          },
          valueContainerStyle,
        ]}
      >
        <Box sx={{ alignItems: "center", justifyContent: "space-around" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "white",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {handleNumber(parseFloat(value), "white")}
            {valuePercentage
              ? `(${valuePercentage}%)`
              : valuePercentage === 0
              ? "(0%)"
              : null}
          </Typography>
          {valueProfitLoss ? (
            <Typography
              sx={{
                fontSize: { lg: "11px", xs: "10px" },
                marginTop: -0.4,
                color: "white",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {handleNumber(parseFloat(valueProfitLoss), "white")}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default DataShow;
