import React, { useEffect, useRef, useState } from "react";
import { inputTypes } from "../../../constant/constant";
import { TextField, Stack, Button, InputAdornment } from "@mui/material";

const FeildHelper = ({ inputName, type, previousData, options }) => {
  const add_more_title = options?.add_more_title;
  const adornment = options?.adornment;
  const autofocus = options?.autofocus;
  const required = options?.required;
  const disabled = options?.disabled;
  const placeholder = options?.placeholder ? options.placeholder : "";
  const multiline =
    type === inputTypes.textBox ? { multiline: true, rows: 5 } : {};
  const changed = useRef(false);
  const [nameprops, setNameProps] = useState({});
  const isMultiple = !!add_more_title;
  const prevData = previousData(inputName);
  const startAdornment = !!adornment
    ? {
        startAdornment: (
          <InputAdornment position="start">{adornment}</InputAdornment>
        ),
      }
    : {};

  const inputMode =
    type === inputTypes.numberfeild
      ? {
          inputMode: "numeric",
          pattern: "[0-9]*",
        }
      : {};

  const [inputs, setInputs] = useState(
    !isMultiple
      ? [prevData ? prevData : ""]
      : JSON.parse(prevData ? prevData : `[""]`)
  );
  useEffect(() => {
    setInputs(
      !isMultiple
        ? [prevData ? prevData : ""]
        : JSON.parse(prevData ? prevData : `[""]`)
    );
  }, [prevData, isMultiple]);
  return (
    <>
      <input
        type="hidden"
        {...nameprops}
        value={!isMultiple ? inputs[0] : JSON.stringify(inputs)}
      />
      <Stack spacing={1} sx={{ width: "100%" }}>
        {inputs.map((inp, ind) => (
          <TextField
            key={`${inputName}-${ind}`}
            size="small"
            fullWidth
            value={inp}
            {...multiline}
            placeholder={placeholder}
            autoFocus={!!autofocus}
            required={required}
            disabled={disabled}
            onChange={(e) => {
              if (!changed.current) {
                changed.current = true;
                setNameProps({ name: inputName });
              }
              setInputs([
                ...inputs.map((i, d) => {
                  return d === ind ? e.target.value : i;
                }),
              ]);
            }}
            InputProps={{ ...startAdornment, ...inputMode }}
            type={
              type === inputTypes.textfeild
                ? "text"
                : type === inputTypes.emailfeild
                ? "email"
                : type === inputTypes.urlfeild
                ? "url"
                : type === inputTypes.numberfeild
                ? "text"
                : "tel"
            }
          />
        ))}
        {isMultiple && (
          <Button
            onClick={() => {
              setInputs([...inputs, ""]);
            }}
          >
            {add_more_title}
          </Button>
        )}
      </Stack>
    </>
  );
};

export default FeildHelper;
