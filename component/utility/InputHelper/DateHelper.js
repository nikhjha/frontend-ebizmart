import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import enIN from "date-fns/locale/en-IN/index.js";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const DateHelper = ({ type, inputName, options, previousData }) => {
  const prevData = previousData(inputName);
  const changed = useRef(false);
  const [nameprops, setNameProps] = useState({});
  const [value, setValue] = useState(null);
  const { placeholder } = options;
  useEffect(() => {
    setValue(prevData ? prevData : null);
  }, [prevData]);
  return (
    <>
      <input {...nameprops} value={value ? value : ""} type="hidden" />
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enIN}>
        <DatePicker
          minDate={new Date()}
          label={placeholder ? placeholder : ""}
          value={value}
          onChange={(newValue) => {
            if (!changed.current) {
              setNameProps({ name: inputName });
              changed.current = true;
            }
            setValue(newValue);
          }}
          renderInput={(params) => {
            return <TextField {...params} autoComplete={""} />;
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateHelper;
