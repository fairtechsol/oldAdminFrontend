import { Box, Typography } from "@mui/material";
import { memo } from "react";
import Select from "react-select";

const SelectField = ({
  id,
  label,
  containerStyle,
  titleStyle,
  touched,
  error,
  ...props
}: any) => {
  const getMenuPlacement = (id: any) => {
    const topIds = [
      "sessionCommission",
      "matchCommission",
      "matchCommissionType",
    ];
    return topIds.includes(id) ? "top" : "bottom";
  };

  const customStyles = {
    control: (base: any, state: { isFocused: any }) => ({
      ...base,
      backgroundColor: "#004A25",
      borderColor: state.isFocused ? "#004A25" : "#004A25",
      "&:hover": {
        backgroundColor: "#004A25",
      },
      color: "white",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "white",
    }),
    option: (base: any, { isFocused }: any) => {
      return {
        ...base,
        backgroundColor: isFocused ? "#004A25" : "#004A25",
        color: "white",
      };
    },
  };
  return (
    <Box sx={[{}, containerStyle]}>
      <Typography
        sx={[
          {
            marginLeft: "10px",
            fontSize: { lg: "10px", xs: "12px" },
            fontWeight: "500",
          },
          titleStyle,
        ]}
      >
        {label}
      </Typography>
      <Select
        isSearchable={false}
        {...props}
        styles={customStyles}
        menuPlacement={getMenuPlacement(id)}
      />
      {touched && error ? <Box style={{ color: "red" }}>{error}</Box> : null}
    </Box>
  );
};

export default memo(SelectField);
