import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import { inputTypes, formContentType } from "../../constant/constant";
import InputHelper from "../utility/InputHelper";
import useForm from "../../hooks/useForm";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { user as userConst } from "../../constant/constant";

export default function CategoryPage() {
  const router = useRouter();
  const verified = useProtectedRoute(userConst.admin);
  const inputs = [
    {
      inputName: "name",
      title: "Category Name",
      type: inputTypes.textfeild,
      options: {
        required: true,
      },
    },
    {
      inputName: "isActive",
      title: "Is Active",
      type: inputTypes.isActive,
    },
    {
      inputName: "logo",
      title: "Category Logo",
      type: inputTypes.picturefeild,
      options: {
        label: "Add Logo",
        autofocus: true,
      },
    },
  ];

  const [info, setInfo] = React.useState({});
  const { handleSubmission, previousData } = useForm({
    postTo: "/categories",
    contentType: formContentType.formdata,
    validate: (data) => {
      console.log(data);
      if (data.name === "") {
        setInfo({ msg: "Please enter category name", error: true });
      }
      return { error: false };
    },
    error: (msg) => {
      console.log(msg);
      //setInfo(msg)
    },
    afterSubmission: (res) => {
      console.log(res);
      setInfo({ msg: "Category Added!!!" });
      router.push("/admin/categories");
    },
  });
  return (
    <Box>
      {verified && (
        <Container maxWidth="md">
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h4">Add Category :</Typography>

              {info?.msg && (
                <Alert severity={info.error ? "error" : "success"}>
                  {info.msg}
                </Alert>
              )}

              <Paper
                component="form"
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
          </Box>
        </Container>
      )}
    </Box>
  );
}
