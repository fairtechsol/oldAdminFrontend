import { Box, Typography } from "@mui/material";

const headerItems = [
  { label: "Date", width: { xs: "14%", md: "11%", lg: "11%" } },
  { label: "Credit", width: { xs: "16%", md: "14%", lg: "14%" } },
  { label: "Debit", width: { xs: "16%", md: "14%", lg: "14%" } },
  { label: "Closing", width: { xs: "14%", md: "11%", lg: "11%" } },
  { label: "Description", width: { xs: "36%", md: "36%", lg: "36%" } },
  { label: "From", width: { xs: "18%", md: "18%", lg: "11%" } },
  { label: "To", width: { xs: "18%", md: "18%", lg: "11%" } },
];

const TableHeaderList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "35px",
        background: "#262626",
        alignItems: "center",
        width: { xs: "222vw", md: "100%", lg: "100%" },
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {headerItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            width: item.width,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "10px",
            height: "35px",
            borderRight:
              index < headerItems.length - 1 ? "2px solid white" : "none",
          }}
        >
          <Typography
            sx={{ color: "white", fontSize: "12px", textAlign: "center" }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TableHeaderList;
