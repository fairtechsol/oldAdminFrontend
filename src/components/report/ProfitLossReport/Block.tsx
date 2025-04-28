import { Typography } from "@mui/material";

const Block = ({ i, setSearch, setOpen }: any) => {
  return (
    <Typography
      onClick={() => {
        setSearch(i);
        setOpen(false);
      }}
      sx={{
        paddingY: "5px",
        paddingLeft: "10px",
        fontSize: "10px",
        fontWeight: "500",
        color: "black",
        "&:hover": {
          cursor: "pointer",
          background: "#3498ff33",
        },
      }}
    >
      {i?.userName}
    </Typography>
  );
};
export default Block;
