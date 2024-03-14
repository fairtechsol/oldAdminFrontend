import { Box, Typography } from "@mui/material";
import { ARROWDROPDOWN } from "../../assets";

const MainBox = (props: any) => {
  const { title, width, color, under, selected, sub } = props;
  return (
    <Box
      sx={{
        display: "flex",
        width: width + "%",
        height: "6vh",
        paddingX: "3%",
        background: color,
        justifyContent: "space-between",
        borderRadius: "3px",
        alignItems: "center",
        marginTop: "1px",
        alignSelf: "flex-end",
        marginBottom: ".5vh",
        marginRight: "3px",
        opacity: selected?.value && under ? 1 : 0.8,
        "&:hover": {
          cursor: "pointer",
          background: color,
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",

          width: "100%",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flex: 0.1 }}></Box>
        <Typography
          sx={{
            fontSize: "12px",
            color: "black",
            fontWeight: "600",
            marginLeft: "3%",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "8px",
            color: "black",
            fontWeight: "400",
            marginLeft: "2%",
          }}
        >
          {sub}
        </Typography>
      </Box>
      {under && (
        <Box
          sx={{
            display: "flex",
            flex: 0.3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "15px",
              height: "8px",
              transform:
                selected?.value && under ? "rotate(0deg)" : "rotate(180deg)",
            }}
            src={ARROWDROPDOWN}
          />
        </Box>
      )}
    </Box>
  );
};

export default MainBox;
