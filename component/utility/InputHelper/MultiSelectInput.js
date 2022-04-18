import React, { useEffect, useRef, useState } from "react";
import { Grid, FormControlLabel, FormGroup, Checkbox } from "@mui/material";

const MultiSelectInput = ({ selectModes, previousData, inputName }) => {
  const prevData = previousData(inputName);
  const changed = useRef(false);
  const [nameprops, setNameProps] = useState({});
  const [selected, setSelected] = useState(
    prevData ? (Array.isArray(prevData) ? prevData : JSON.parse(prevData)) : []
  );
  useEffect(() => {
    setSelected(
      prevData
        ? Array.isArray(prevData)
          ? prevData
          : JSON.parse(prevData)
        : []
    );
  }, [prevData]);
  return (
    <>
      <input value={JSON.stringify(selected)} {...nameprops} type="hidden" />
      {selectModes.map((mode, ind) => (
        <Grid key={`${inputName}-${ind}`} item xs={6} sm={4} md={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.includes(mode)}
                  onChange={(e) => {
                    if (!changed.current) {
                      changed.current = true;
                      setNameProps({ name: inputName });
                    }
                    if (e.target.checked) {
                      setSelected([...selected, mode]);
                    } else {
                      setSelected([...selected.filter((i) => i !== mode)]);
                    }
                  }}
                />
              }
              label={mode}
            />
          </FormGroup>
        </Grid>
      ))}
    </>
  );
};

export default MultiSelectInput;