import { Box, Typography } from "@mui/material";

const TableDataRow = (props: any) => {
  const { style } = props;
  return (
    <Box
      sx={[
        {
          display: "flex",
          height: "45px",
          alignItems: "center",
          overflow: "hidden",
          borderBottom: "2px solid white",
          background: "#FFE094"
        },
      ]}
    >
      <Box
        sx={[
          {
            width: "8%",
            display: "flex",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            justifyContent: "center",
            background: "#0B4F26",
          },
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: "12px",
              fontWeight: "600",
              textAlign: "center",
              color: "#fff",
            },
          ]}
        >
          01
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "23%",
            display: "flex",
            paddingLeft: "10px",
            background: "#FFE094",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          style,
        ]}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}
        >
          John Doe
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "23%",
            display: "flex",
            paddingLeft: "10px",
            background: "#FFE094",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          style,
        ]}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}
        >
          100,000,000
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "8%",
            display: "flex",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            justifyContent: "center",
            background: "#0B4F26",
          },
        ]}
      >
        <Typography
          sx={[
            {
              fontSize: "12px",
              fontWeight: "600",
              textAlign: "center",
              color: "#fff",
            },
          ]}
        >
          01
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "23%",
            display: "flex",
            paddingLeft: "10px",
            background: "#FFE094",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          style,
        ]}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}
        >
          John Doe
        </Typography>
      </Box>
      <Box
        sx={[
          {
            width: "23%",
            display: "flex",
            paddingLeft: "10px",
            background: "#FFE094",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          },
          style,
        ]}
      >
        <Typography
          sx={{ fontSize: "12px", fontWeight: "600", color: "black" }}
        >
          100,000,000
        </Typography>
      </Box>
    </Box>
  );
};

export default TableDataRow;
