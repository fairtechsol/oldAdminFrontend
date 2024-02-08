import { Box, Button, Typography } from "@mui/material";

const ListHeader = ({ title, setShow, userName }: any) => {
  return (
    <Box
      display={"flex"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        px: "10px",
        height: "100%",
      }}
    >
      <Box display={"flex"} alignItems="center">
        <Typography
          sx={{
            fontSize: { xs: "14px", lg: "18px", md: "18px" },
            fontWeight: "500",
            color: "#000",
            textTransform: "capitalize",
            marginRight: { xs: "10px", lg: "20px", md: "20px" },
          }}
        >
          {userName ? `${userName} -` : ""} ({title}){" "}
        </Typography>
      </Box>

      <Button
        sx={{ color: "", fontSize: "30px" }}
        onClick={() => {
          setShow({ value: false, id: "", title: "" });
        }}
      >
        &times;
      </Button>
    </Box>
  );
};

export default ListHeader;
