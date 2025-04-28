import { Box, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { ARROWDROPDOWN } from "../../../assets";
import Block from "./Block";

const SearchInputWallet = ({
  title,
  data,
  containerStyle,
  inputContainerStyle,
  setSearch,
  search,
}: any) => {
  const [open, setOpen] = useState(false);

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
          alt="arrow down"
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
              k?.userName?.toLowerCase().includes(search?.toLowerCase())
            )
            .map((i: any, idx: any) => {
              return (
                <Block
                  key={idx}
                  i={i}
                  setSearch={setSearch}
                  setOpen={setOpen}
                />
              );
            })}
        </Box>
      )}
    </Box>
  );
};

export default memo(SearchInputWallet);
