import React from "react";
import { inputTypes } from "../../constant/constant";
import Helper from "../utility/InputHelper";

export default function Stepper2({ previousData }) {
  const inputs = [
    {
      inputName: "firstName",
      title: "First Name",
      type: inputTypes.textfeild,
      options: {
        autofocus: true,
        required: true,
      },
    },
    {
      inputName: "lastName",
      title: "Last Name",
      type: inputTypes.textfeild,
    },
    {
      inputName: "email",
      title: "Email",
      type: inputTypes.textfeild,
    },
    {
      inputName: "phone",
      title: "Phone No.",
      type: inputTypes.textfeild,
    },
    {
      inputName: "website",
      title: "Website",
      type: inputTypes.urlfeild,
    },
    {
      inputName: "socialMedia",
      nestedOption: [
        {
          inputName: "facebook",
          title: "Facebook",
          type: inputTypes.urlfeild,
        },
        {
          inputName: "twitter",
          title: "Twitter",
          type: inputTypes.urlfeild,
        },
        {
          inputName: "instagram",
          title: "Instagram",
          type: inputTypes.urlfeild,
        },
      ],
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
          nestedOption={inp.nestedOption}
        />
      ))}
    </>
  );
}
