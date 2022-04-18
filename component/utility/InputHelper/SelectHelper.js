import React, { useEffect, useRef, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectHelper = ({ inputName, index, previousData, options }) => {
  const selectDefault = previousData(inputName);
  const autofocus = options?.autofocus;
  const changed = useRef(false);
  const [nameprops, setNameProps] = useState({});
  const { select_title, select_options } = options;
  const [selected, setSelect] = useState(selectDefault ? selectDefault : "");
  useEffect(() => {
    setSelect(selectDefault ? selectDefault : "");
  }, [selectDefault]);
  return (
    <FormControl size="small" fullWidth>
      <InputLabel id={`demo-simple-select-label-${index}`}>
        {select_title}
      </InputLabel>
      <Select
        labelId={`demo-simple-select-label-${index}`}
        id={`demo-simple-select-${index}`}
        value={selected}
        label={select_title}
        size="small"
        autoFocus={!!autofocus}
        {...nameprops}
        onChange={(e) => {
          if (!changed.current) {
            changed.current = true;
            setNameProps({ name: inputName });
          }
          setSelect(e.target.value);
        }}
      >
        {select_options.map((opt, ind) => (
          <MenuItem value={opt.value} key={`select-option-${ind}`}>
            {opt.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectHelper;
