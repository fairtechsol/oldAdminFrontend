import { useState } from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CalendarImage } from "../../assets";

const Calendar = (props: any) => {
  const {
    title,
    containerStyle,
    DatePickerProps,
    pickerStyles,
    startDate,
    setStartDate,
  } = props;

  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={[
        {
          zIndex: 100,
          width: { lg: "50%", xs: "50%" },
          position: "relative",
          height: "35px",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={{ fontSize: "12px", fontWeight: "600", marginBottom: ".3vh" }}
      >
        {title}
      </Typography>
      <Box sx={[{ position: "absolute", height: "35px" }, pickerStyles]}>
        <DatePicker
          onClickOutside={() => setOpen(false)}
          open={open}
          placeholderText="select"
          selected={startDate}
          onSelect={() => setOpen(false)}
          onChange={(date: any) => {
            setStartDate(date);
          }}
          {...DatePickerProps}
          customInput={<Box sx={[{ width: "10vw" }]}></Box>}
        />
      </Box>
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
            position: "absolute",
          },
          pickerStyles,
        ]}
      >
        <Typography sx={{ fontSize: "11px", fontWeight: "500" }}>
          {startDate ? moment(startDate).format("YYYY-DD-MM") : "select date"}
        </Typography>
        <img src={CalendarImage} style={{ width: "12px", height: "13px" }} />
      </Box>
    </Box>
  );
};

export default Calendar;
