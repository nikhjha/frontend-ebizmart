import React from "react";
import { Paper, Stack, Container, Box, Button, Card } from "@mui/material";
import {
  inputTypes,
  formContentType,
  requestType,
} from "../../constant/constant";
import InputHelper from "../utility/InputHelper";
import useForm from "../../hooks/useForm";
export default function RequestForm() {
  const inputs = [
    {
      inputName: "userId",
      title: "User Id",
      type: inputTypes.textfeild,
    },
    {
      inputName: "productId",
      title: "Product Id",
      type: inputTypes.textfeild,
    },
    {
      inputName: "amount",
      title: "Amount",
      type: inputTypes.textfeild,
    },
    {
      inputName: "address",
      title: "Address",
      type: inputTypes.textfeild,
    },
    {
      inputName: "contactInfo",
      title: "Contact Info",
      type: inputTypes.textfeild,
    },
    {
      inputName: "pincode",
      title: "Pincode",
      type: inputTypes.textfeild,
    },
    {
      inputName: "message",
      title: "Message",
      type: inputTypes.textfeild,
    },
  ];

  const { handleSubmission, previousData } = useForm({
    initialValues: "",
    postTo: `/`,
    type: requestType.patch,
    contentType: formContentType.urlencoded,
    validate: (data) => {
      console.log(data);

      return { error: false };
    },
    error: (msg) => {
      console.log(msg);
    },
    afterSubmission: (res) => {
      console.log(res);
    },
  });

  return (
    <Container maxWidth='md'>
      <Box>
        <Stack>
          <Card
            component='form'
            elevation={3}
            onSubmit={handleSubmission}
            noValidate
          >
            <Stack spacing={1}>
              {inputs.map((inp, ind) => (
                <InputHelper
                  key={`form-input-${ind}`}
                  previousData={previousData}
                  title={inp.title}
                  inputName={inp.inputName}
                  index={ind}
                  type={inp.type}
                  options={inp.options}
                />
              ))}
            </Stack>
            <Button
              variant='contained'
              sx={{
                position: "relative",
                right: "-50%",
                transform: "translateX(-50%)",
                px: 8,
                my: 5,
              }}
              type='submit'
            >
              Submit
            </Button>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}
