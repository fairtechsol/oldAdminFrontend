import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { ARROWDROPDOWN } from "../../../assets";

const SearchInputWallet = (props: any) => {
  const {
    title,
    data,
    containerStyle,
    inputContainerStyle,
    setSearch,
    search,
  } = props;

  const [open, setOpen] = useState(false);

  const Block = ({ i }: any) => {
    return (
      <>
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
      </>
    );
  };

  return (
    <Box
      sx={[
        { width: { lg: "30%", xs: "100%", position: "relative" } },
        containerStyle,
      ]}
    >
      <Typography
        sx={{ fontSize: "12px", fontWeight: "600", marginBottom: ".3vh" }}
      >
        {title}
      </Typography>
      <Box
        onClick={() => {
          setOpen(!open);
        }}
        sx={[
          {
            width: "100%",
            height: "37px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            background: "white",
            borderRadius: "3px",
            border: "2px solid #DEDEDE",
            paddingX: "7px",
          },
          inputContainerStyle,
        ]}
      >
        <TextField
          variant="standard"
          placeholder={"Search"}
          value={search?.userName}
          onChange={(e) => {
            setSearch(e.target?.value);
            setOpen(true);
          }}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: "11px", fontWeight: "500" },
          }}
          sx={{
            textTransform: "lowercase",
            borderColor: "white",
            display: "flex",
            flex: 1,
            fontSize: { lg: "10px", xs: "8px" },
          }}
        />
        <img
          src={ARROWDROPDOWN}
          style={{
            width: "11px",
            height: "6px",
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
          }}
        />
      </Box>
      {search && search.length > 0 && open && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            width: "100%",
            alignSelf: "center",
            marginTop: "2px",
            position: "absolute",
            borderRadius: "3px",
            border: "2px solid #DEDEDE",
            zIndex: 9999,
          }}
        >
          {data
            ?.filter((k: any) =>
              k?.userName?.toLowerCase().includes(search.toLowerCase())
            )
            .map((i: any, idx: any) => {
              return <Block key={idx} i={i} />;
            })}
        </Box>
      )}
    </Box>
  );
};

export default SearchInputWallet;
