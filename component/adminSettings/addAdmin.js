import React, { useState } from "react";
import {
  Box,
  Stack,
  Container,
  Paper,
  Button,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

import { useRouter } from "next/router";
import { inputTypes, formContentType } from "../../constant/constant";
import InputHelper from "../utility/InputHelper";
import useForm from "../../hooks/useForm";
import useProtectedRoute from "../../hooks/useProtectedRoute";

const AdminAdd = ({}) => {
  const [value, setValue] = useState("one");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  useProtectedRoute();
  const inputs = [
    {
      inputName: "first_name",
      title: "First Name",
      type: inputTypes.textfeild,
      options: {
        required: true,
      },
    },
    {
      inputName: "last_name",
      title: "Last Name",
      type: inputTypes.textfeild,
    },
    {
      inputName: "email",
      title: "Email",
      type: inputTypes.textfeild,
      options: {},
    },
    {
      inputName: "phone",
      title: "Phone",
      type: inputTypes.textfeild,
    },
  ];

  const [info, setInfo] = React.useState({});
  const { handleSubmission, previousData } = useForm({
    postTo: "/admin/register",
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
      //router.push("/admin/settings")
    },
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Container sx={{ pb: "4rem" }}>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            {info?.msg && (
              <Alert severity={info.error ? "error" : "success"}>
                {info.msg}
              </Alert>
            )}

            <Paper
              component='form'
              elevation={3}
              onSubmit={handleSubmission}
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
                    nestedOption={input.nestedOption}
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
                onClick={handleClickOpen}
              >
                Submit
              </Button>
              <Dialog
                sx={{ backdropFilter: "blur(3px)" }}
                open={open}
                onClose={handleClose}
              >
                <DialogTitle id='alert-dialog-title'>
                  {"Adding Admin"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    Admin is added successfully!!
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </Paper>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
export default AdminAdd;
