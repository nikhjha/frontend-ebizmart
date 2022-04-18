import React from "react";
import { inputTypes } from "../../constant/constant";
import Helper from "../utility/InputHelper";

export default function Stepper1({ previousData }) {
	const inputs = [
		{
			inputName: "companyName",
			title: "Company Name",
			type: inputTypes.textfeild,
			options: {
				autofocus: true,
				required: true,
			},
		},
		{
			inputName: "building",
			title: "Building",
			type: inputTypes.textfeild,
		},
		{
			inputName: "street",
			title: "Street",
			type: inputTypes.textfeild,
		},
		{
			inputName: "landmark",
			title: "Landmark",
			type: inputTypes.textfeild,
		},
		{
			inputName: "area",
			title: "Area",
			type: inputTypes.textfeild,
		},
		{
			inputName: "city",
			title: "City",
			type: inputTypes.textfeild,
		},
		{
			inputName: "location",
			title: "Location",
			type: inputTypes.textfeild,
		},
		{
			inputName: "pincode",
			title: "Pin Code",
			type: inputTypes.textfeild,
		},
		{
			inputName: "state",
			title: "State",
			type: inputTypes.textfeild,
		},
		{
			inputName: "country",
			title: "Country",
			type: inputTypes.textfeild,
		},
	];
	return (
		<>
			{inputs.map((inp, ind) => (
				<Helper key={`form-input-${ind}`} previousData={previousData} title={inp.title} inputName={inp.inputName} index={ind} type={inp.type} options={inp.options} />
			))}
		</>
	);
}
