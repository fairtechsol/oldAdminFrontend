import { Box, Typography } from "@mui/material";
import { memo } from "react";

const AdminEventComponent = ({ data }: { data: any }) => {
  return (
    <Box
      className="eventTab"
      sx={{
        width: "60px",
        minHeight: 80,
        minWidth: 80,
        height: "60px",
        marginX: ".5vw",
        borderRadius: ".6vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { lg: "center", xs: "center" },
        background: "white",
        cursor: "pointer",
        border: "2px solid white",
      }}
    >
      <img
        src={data.image}
        alt="image"
        style={{ width: "40px", height: "40px", alignSelf: "center" }}
      />
      <Typography
        noWrap
        sx={{
          marginTop: { xs: "5px", lg: ".8vh" },
          textTransform: "uppercase",
          fontSize: { lg: "10px", xs: "10px" },
          fontWeight: { xs: "500", md: "500" },
          color: "#000",
        }}
      >
        {data.title}
      </Typography>
    </Box>
  );
};

export default memo(AdminEventComponent);
