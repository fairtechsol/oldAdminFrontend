import { Button, Typography } from "@mui/material";

const DeleteBetButton = (props: any) => {
  const { btnStyle, type, title } = props;

  return (
    <Button
      type={type}
      sx={[
        {
          width: "200px",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          borderRadius: "4px",
          height: "35px",
          background: "#0B4F26",
          alignSelf: "end",
          marginRight: "10px",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#0B4F26" },
        },
        btnStyle,
      ]}
    >
      <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "600" }}>
        {title}
      </Typography>
    </Button>
  );
};

export default DeleteBetButton;
