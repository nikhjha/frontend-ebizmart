import React, { useState } from "react";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const IsActive = () => {
  const [checked, setChecked] = useState(true);
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label=""
        />
      </FormGroup>
    </>
  );
};

export default IsActive;
