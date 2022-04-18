import React from "react";
import { inputTypes } from "../../constant/constant";
import Helper from "../utility/InputHelper";

export default function Stepper4({ previousData }) {
  const inputs = [
    {
      inputName: "logo",
      title: "Company Logo",
      type: inputTypes.picturefeild,
      options: {
        label: "Add Logo",
        autofocus: true,
        deleteRoute: "/vendors/image",
      },
    },
    {
      inputName: "images",
      title: "Company Pictures",
      type: inputTypes.picturefeild,
      options: {
        label: "Add Photos",
        autofocus: true,
        multiple: true,
        deleteRoute: "/vendors/image",
      },
    },
  ];
  return (
    <>
      {inputs.map((inp, ind) => (
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
