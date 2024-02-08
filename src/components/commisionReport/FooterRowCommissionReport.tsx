import { Box, Typography } from "@mui/material";

const FooterRowCommissionReport = ({ currentPage, pages, callPage }: any) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        width: "100%",
        alignItems: "center",
        px: { xs: "5px", lg: "10px" },
        justifyContent: "space-between",
        background: "#FAFAFA",
        paddingX: "10%",
      }}
    >
      <Typography
        sx={{ fontSize: { xs: "12px", lg: "14px" }, fontWeight: "600" }}
      >
        Showing 1 to {pages}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          margin: "10px",
        }}
      >
        <Box
          sx={{
            height: "35px",
            width: { xs: "80px", lg: "100px" },
            background: "#0B4F26",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            callPage(
              parseInt(currentPage) - 1 === 0 ? 1 : parseInt(currentPage) - 1
            );
          }}
        >
          <Typography
            sx={{
              color: "white",
              paddingLeft: "18px",
              fontSize: { lg: "14px", xs: "12px" },
            }}
          >
            Previous
          </Typography>
        </Box>
        <Box
          sx={{
            height: "35px",
            marginX: { lg: "10px", xs: "5px" },
            width: "40px",
            background: "#262626",
            display: "flex",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px" },
            }}
          >
            {currentPage}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "35px",
            width: { xs: "80px", lg: "100px" },
            background: "#0B4F26",
            display: "flex",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            callPage(
              parseInt(currentPage) === pages
                ? pages
                : parseInt(currentPage) + 1
            );
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px" },
            }}
          >
            Next
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterRowCommissionReport;
