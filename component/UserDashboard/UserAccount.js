import React, { useContext } from "react";
import {
  Paper,
  Stack,
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Alert,
} from "@mui/material";

import {
  inputTypes,
  formContentType,
  requestType,
} from "../../constant/constant";
import InputHelper from "../utility/InputHelper";
import useForm from "../../hooks/useForm";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import getFetch from "../../libs/axiosClient";
import { AuthContext } from "../../context/AuthProvider";
import { user as userConst } from "../../constant/constant";

export default function UserAccount() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = React.useState({});
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await getFetch().get(`/users/${user.id}`);
      console.log(res);
      setProfile(res.data.user);
    };
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const verified = useProtectedRoute(userConst.users);
  const inputs = [
    {
      inputName: "profilePic",
      title: "Profile",
      type: inputTypes.picturefeild,
      options: {
        label: "Profile",
        autofocus: true,
        avatar : true,
        deleteRoute : "/users/image"
      },
    },
    {
      inputName: "firstName",
      title: "First Name",
      type: inputTypes.textfeild,
      options: {
        autofocus: true,
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
      inputName: "location",
      title: "Location",
      type: inputTypes.textfeild,
    },
    {
      inputName: "fullAddress",
      title: "Full Address",
      type: inputTypes.textfeild,
    },
  ];

  const [info, setInfo] = React.useState({});
  const { handleSubmission, previousData } = useForm({
    initialValues: profile,
    postTo: `/users/${user?.id}`,
    type: requestType.patch,
    contentType: formContentType.formdata,
    validate: (data) => {
      console.log(data);
      // if (data.name === "") {
      //   setInfo({ msg: "Please enter user name", error: true })
      // }
      return { error: false };
    },
    error: (msg) => {
      console.log(msg);
      //setInfo(msg)
    },
    afterSubmission: (res) => {
      console.log(res);
      setInfo({ msg: "User info updated!!!" });
    },
  });

  return (
    <Box>
      {verified && (
        <Container maxWidth="md">
          <Box sx={{ p: 2 }}>
            <Stack spacing={3}>
              <Typography variant="h4">Profile </Typography>
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
                <Stack spacing={3} alignItems="center">
                </Stack>
                <Stack spacing={2} mt={2}>
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
                  Edit
                </Button>
              </Paper>
            </Stack>
          </Box>
        </Container>
      )}
    </Box>
  );
}
