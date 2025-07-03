import { Box, Typography } from "@mui/material";

const columns = [
  { label: "No", width: "5%", minWidth: "70px" },
  { label: "Event Type", width: "10%", minWidth: "100px" },
  { label: "Event Name", width: "10%", minWidth: "100px" },
  { label: "User name", width: "10%", minWidth: "100px", fontSize: "11px" },
  { label: "Team", width: "10%", minWidth: "100px" },
  { label: "Bet Type", width: "10%", minWidth: "100px" },
  { label: "User Rate", width: "7%", minWidth: "100px" },
  {
    label: ["Back/Lay", "Yes/No"],
    width: "8%",
    minWidth: "100px",
    multiline: true,
  },
  {
    label: "Amount",
    width: "8%",
    minWidth: "100px",
    fontSize: { xs: "8px", md: "9px", lg: "12px" },
  },
  { label: "Place Date", width: "11%", minWidth: "100px" },
  { label: "Match Date", width: "11%", minWidth: "100px" },
];

const TableHeaderList = () => {
  const commonBoxStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "35px",
    borderRight: "2px solid white",
    paddingLeft: "10px",
  };

  const defaultFontSize = { xs: "10px", md: "12px", lg: "12px" };

  return (
    <Box
      sx={{
        display: "flex",
        width: { xs: "1070px", md: "100%", lg: "100%" },
        height: "35px",
        background: "#262626",
        alignItems: "center",
        borderTop: "2px solid white",
        borderBottom: "2px solid white",
      }}
    >
      {columns.map((col, idx) => (
        <Box
          key={idx}
          sx={{
            ...commonBoxStyles,
            width: col.width,
            minWidth: col.minWidth,
            flexDirection: col.multiline ? "column" : "row",
          }}
        >
          {Array.isArray(col.label) ? (
            col.label.map((line, i) => (
              <Typography
                key={i}
                sx={{
                  color: "white",
                  fontSize: col.fontSize || defaultFontSize,
                  lineHeight: "0.9",
                }}
              >
                {line}
              </Typography>
            ))
          ) : (
            <Typography
              sx={{
                color: "white",
                fontSize: col.fontSize || defaultFontSize,
                lineHeight: "0.9",
              }}
            >
              {col.label}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TableHeaderList;
