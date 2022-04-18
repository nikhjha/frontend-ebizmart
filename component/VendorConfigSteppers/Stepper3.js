import {
  Divider,
  Grid,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import React, { useEffect, useState, useMemo } from "react";
import { inputTypes } from "../../constant/constant";
import Helper from "../utility/InputHelper";

const DayWiseSchedule = ({ title, inputValue, inputName, setInputValue }) => {
  const formateDay = () => {
    let newDate;
    let fromInput;
    let toInput;
    if (inputValue[inputName].opening) {
      const formatedFrom = inputValue[inputName].opening.split(":");
      newDate = new Date(
        `August 19, 1975 ${formatedFrom[0]}:${formatedFrom[1]}:30`
      );
      fromInput = inputValue[inputName].opening === "" ? null : newDate;
    } else {
      fromInput = null;
    }
    if (inputValue[inputName].closing) {
      const formatedTo = inputValue[inputName].closing.split(":");
      newDate = new Date(
        `August 19, 1975 ${formatedTo[0]}:${formatedTo[1]}:30`
      );
      toInput = inputValue[inputName].closing === "" ? null : newDate;
    } else {
      toInput = null;
    }
    return { fromInput, toInput };
  };
  const { fromInput, toInput } = formateDay();
  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="From"
            value={fromInput}
            onChange={(newValue) => {
              setInputValue(newValue, "opening", inputName);
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="To"
            value={toInput}
            onChange={(newValue) => {
              setInputValue(newValue, "closing", inputName);
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item md={3} xs={12}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={inputValue[inputName].closed}
                onChange={(e) => {
                  setInputValue(e.target.checked, "closed", inputName);
                }}
              />
            }
            label={"Closed"}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

const WeeklyTimeSelection = ({ previousData }) => {
  const prevData = previousData("workingHours");
  const timeFormat = useMemo(() => {
    return {
      Monday: {
        closed: false,
        opening: "",
        closing: "",
      },
      Tuesday: {
        closed: false,
        opening: "",
        closing: "",
      },
      Wednesday: {
        closed: false,
        opening: "",
        closing: "",
      },
      Thursday: {
        closed: false,
        opening: "",
        closing: "",
      },
      Friday: {
        closed: false,
        opening: "",
        closing: "",
      },
      Saturday: {
        closed: false,
        opening: "",
        closing: "",
      },
      Sunday: {
        closed: false,
        opening: "",
        closing: "",
      },
    };
  }, []);
  const [inputValue, setInputValue] = useState(
    prevData
      ? typeof prevData === "string"
        ? JSON.parse(prevData)
        : prevData
      : timeFormat
  );
  useEffect(() => {
    setInputValue(
      prevData
        ? typeof prevData === "string"
          ? JSON.parse(prevData)
          : prevData
        : timeFormat
    );
  }, [prevData, timeFormat]);
  const setTime = (data, key, inputName) => {
    let newInput;
    if (typeof data === "boolean") {
      newInput = {
        ...inputValue,
        ...{
          [inputName]: {
            ...inputValue[inputName],
            closed: data,
          },
        },
      };
    } else {
      const fromdate = new Date(data);
      const hours = fromdate.getHours();
      const mins = fromdate.getMinutes();

      newInput = {
        ...inputValue,
        ...{
          [inputName]: {
            ...inputValue[inputName],
            [key]: `${hours}:${mins}`,
          },
        },
      };
    }
    setInputValue(newInput);
  };
  const weekSchedule = [
    {
      title: "Monday",
      inputName: "Monday",
    },
    {
      title: "Tuesday",
      inputName: "Tuesday",
    },
    {
      title: "Wednesday",
      inputName: "Wednesday",
    },
    {
      title: "Thursday",
      inputName: "Thursday",
    },
    {
      title: "Friday",
      inputName: "Friday",
    },
    {
      title: "Saturday",
      inputName: "Saturday",
    },
    {
      title: "Sunday",
      inputName: "Sunday",
    },
  ];
  return (
    <>
      <input
        type="hidden"
        name="workingHours"
        value={JSON.stringify(inputValue)}
      />
      {weekSchedule.map((day, ind) => (
        <DayWiseSchedule
          key={`${day.inputName}-${ind}`}
          title={day.title}
          inputName={day.inputName}
          inputValue={inputValue}
          setInputValue={setTime}
        />
      ))}
    </>
  );
};

export default function Stepper3({ previousData }) {
  const paymentModes = [
    "Cash",
    "Master Card",
    "Visa Card",
    "Debit Card",
    "Credit Card",
    "G Pay",
    "UPI",
  ];
  const paymentInput = {
    inputName: "acceptedPaymentModes",
    title: "Payment Mode Accepted By You",
    type: inputTypes.radioselect,
    options: {
      values: paymentModes,
    },
  };
  const companyInputs = [
    {
      inputName: "yearOfEstablishment",
      title: "Year of Establishment",
      type: inputTypes.numberfeild,
    },
    {
      inputName: "annualTurnOver",
      title: "Annual Turnover",
      type: inputTypes.numberfeild,
    },
    {
      inputName: "gstNumber",
      title: "GST Number",
      type: inputTypes.textfeild,
    },
    {
      inputName: "numberOfEmployees",
      title: "No Of Employees",
      type: inputTypes.numberfeild,
    },
    {
      inputName: "professionalAssociations",
      title: "Professional Associations",
      type: inputTypes.textfeild,
    },
    {
      inputName: "certifications",
      title: "Certifications",
      type: inputTypes.textfeild,
    },
    {
      inputName: "natureOfBusiness",
      title: "Nature of Business",
      type: inputTypes.textfeild,
    },
    {
      inputName: "legalStatusOfFirm",
      title: "Legal Status of Firm",
      type: inputTypes.textfeild,
    },
    {
      inputName: "cinNumber",
      title: "CIN Number",
      type: inputTypes.textfeild,
    },
    {
      inputName: "importExportCode",
      title: "Import Export Code",
      type: inputTypes.textfeild,
    },
    {
      inputName: "activationStatus",
      title: "Activation Status",
      type: inputTypes.textfeild,
      options: {
        disabled: true,
        placeholder: "null",
      },
    },
    {
      inputName: "plan",
      title: "Plan",
      type: inputTypes.textfeild,
      options: {
        disabled: true,
        placeholder: "null",
      },
    },
    {
      inputName: "expiryDate",
      title: "Expiry Date",
      type: inputTypes.textfeild,
      options: {
        disabled: true,
        placeholder: "null",
      },
    },
  ];
  return (
    <>
      <Typography variant="h5">Hours Of Operations </Typography>
      <WeeklyTimeSelection previousData={previousData} />
      <Divider />
      <Helper
        previousData={previousData}
        title={paymentInput.title}
        index={20}
        type={paymentInput.type}
        inputName={paymentInput.inputName}
        options={paymentInput.options}
      />
      <Divider />
      <Typography variant="h5">Company Information</Typography>
      {companyInputs.map((inp, ind) => (
        <Helper
          key={`form-input-${ind}`}
          previousData={previousData}
          title={inp.title}
          inputName={inp.inputName}
          index={ind}
          type={inp.type}
          options={inp.options}
        />
      ))}
    </>
  );
}
