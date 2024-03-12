import { Box, Typography } from "@mui/material";
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

  const getMenuPlacement = (id:any) => {
    if (id === 'sessionCommission') {
      return 'top';
    } else {
      return 'bottom';
    }
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
      color: "white", // Set the text color to white for the selected option
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

      {/* <InputLabel sx={[{}, titleStyle]} htmlFor={props.name}>
        {label}
      </Label> */}
      <Select {...props} styles={customStyles} menuPlacement={getMenuPlacement(id)}/>
      {touched && error ? <div style={{ color: "red" }}>{error}</div> : null}
    </Box>
  );
};

export default SelectField;
