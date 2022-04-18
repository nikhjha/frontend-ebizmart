import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { inputTypes, formContentType, user } from "../../constant/constant";
import InputHelper from "../utility/InputHelper";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useForm from "../../hooks/useForm";
const VendorAdd = ({}) => {
  const [value, setValue] = React.useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const router = useRouter();
  const verified = useProtectedRoute(user.admin);
  const inputs = [
    {
      inputName: "email",
      title: "Email",
      type: inputTypes.emailfeild,
    },
    {
      inputName: "phone",
      title: "Phone No",
      type: inputTypes.numberfeild,
    },
    {
      inputName: "password",
      title: "Password",
      type: inputTypes.textfeild,
    },
  ];
  const [info, setInfo] = React.useState({});
  const { handleSubmission, previousData } = useForm({
    postTo: "Vendors/register",
    contentType: formContentType.urlencoded,
    validate: (data) => {
      console.log(data);
      // if (data.name === "") {
      //   setInfo({ msg: "Please enter category name", error: true })
      // }
      return { error: false };
    },
    error: (msg) => {
      console.log(msg);
      //setInfo(msg)
    },
    afterSubmission: (res) => {
      console.log(res);
      //setInfo({ msg: "Category Added!!!" })
      router.push("/admin/settings");
    },
  });

  return (
    <Box>
      {verified && (
        <Container maxWidth="md">
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h4">Add Vendor :</Typography>
              <Paper
                component="form"
                elevation={3}
                onSubmit={handleSubmission}
                noValidate
                sx={{ p: 2, pl: 0 }}
              >
                <Stack spacing={2}>
                  <Typography variant="h4">Add Vendor :</Typography>
                  <Paper
                    component="form"
                    elevation={3}
                    // onSubmit={handleSubmission}
                    noValidate
                    sx={{ p: 2, pl: 0 }}
                  >
                    <Stack spacing={2}>
                      {inputs.map((input, index) => (
                        <InputHelper
                          key={`form-input-${index}`}
                          previousData={previousData}
                          title={input.title}
                          inputName={input.inputName}
                          index={index}
                          type={input.type}
                          options={input.options}
                        />
                      ))}
                    </Stack>
                    <Button
                      variant="contained"
                      sx={{
                        position: "relative",
                        right: "-50%",
                        transform: "translateX(-50%)",
                        px: 8,
                        my: 5,
                      }}
                      type="submit"
                    >
                      Add
                    </Button>
                  </Paper>
                </Stack>
              </Paper>
            </Stack>
          </Box>
        </Container>
      )}
    </Box>
  );
};
export default VendorAdd;
