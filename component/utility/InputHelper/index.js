import React from "react";
import { inputTypes } from "../../../constant/constant";
import {
  Grid,
  Typography,
} from "@mui/material";
import DateHelper from "./DateHelper";
import FeildHelper from "./FeildHelper";
import IsActive from "./IsActive";
import MediaHelper from "./MediaHelper";
import MultiSelectInput from "./MultiSelectInput";
import SelectHelper from "./SelectHelper";

const InputHelper = ({
  previousData,
  title,
  inputName,
  nestedOption,
  type,
  index,
  options,
}) => {
  const isNested = !!nestedOption;
  if (isNested) {
    return (
      <>
        {nestedOption.map((opt, ind) => (
          <InputHelper
            key={`Nested-${inputName}-${ind}`}
            previousData={previousData}
            index={index * 100 + ind}
            {...opt}
            inputName={`${inputName}.${opt.inputName}`}
          />
        ))}
      </>
    );
  }
  if (type === inputTypes.radioselect) {
    return (
      <>
        <Typography variant="h6">{title}</Typography>
        <Grid container spacing={2}>
          <MultiSelectInput
            selectModes={options.values}
            previousData={previousData}
            inputName={inputName}
          />
        </Grid>
      </>
    );
  }
  return (
    <Grid container spacing={2} sx={{ mt: 0, width: "100%", ml: 0 }}>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{ display: "flex" }}
        justifyContent="flex-start"
      >
        <Typography variant="h6" sx={{ my: 1 }}>
          {title}
          {options?.required && (
            <Typography
              variant="h6"
              variantMapping={{ h6: "span" }}
              color="primary.main"
            >
              &nbsp;*
            </Typography>
          )}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        sx={{ display: "flex" }}
        alignItems="center"
        justifyContent="center"
      >
        {(type === inputTypes.textfeild ||
          type === inputTypes.emailfeild ||
          type === inputTypes.numberfeild ||
          type === inputTypes.textBox ||
          type === inputTypes.urlfeild ||
          type === inputTypes.telfeild) && (
          <FeildHelper
            inputName={inputName}
            previousData={previousData}
            type={type}
            options={options}
          />
        )}
        {type === inputTypes.select && (
          <SelectHelper
            index={index}
            inputName={inputName}
            previousData={previousData}
            options={options}
          />
        )}
        {(type === inputTypes.picturefeild ||
          type === inputTypes.videofeild) && (
          <MediaHelper
            type={type}
            inputName={inputName}
            previousData={previousData}
            options={options}
          />
        )}
        {type === inputTypes.datefeild && (
          <DateHelper
            type={type}
            inputName={inputName}
            previousData={previousData}
            options={options}
          />
        )}
        {type === inputTypes.isActive && (
          <IsActive
            type={type}
            inputName={inputName}
            previousData={previousData}
            options={options}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default InputHelper;