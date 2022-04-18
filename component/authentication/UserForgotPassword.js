import React, { useState } from "react";
import { Box, Typography, TextField, Alert, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useForm from "../../hooks/useForm";
import { formContentType } from "../../constant/constant";
import { useRouter } from "next/router";

function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [info, setInfo] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setErrors({ email: "" });
    setEmail(value);
    let regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i).test(value);

    if (!regex) {
      setErrors({ email: "Please enter valid email !" });
    }
  };

  const { handleSubmission, loading } = useForm({
    postTo: "/user/forgot-password",
    contentType: formContentType.urlencoded,
    validate: (data) => {
      return { error: false };
    },
    afterSubmission: (res) => {
      console.log(res);
      setInfo({ msg: "Email sent successfully !!!" });
    },
    error: (msg, response) => {
      console.log(msg, response);
      setInfo({ msg: "Email does not exist", error: true });
    },
  });

  return (
    <Box
      sx={{
        boxShadow: 8,
        borderRadius: 3,
        maxWidth: 450,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component='h1' variant='h5' sx={{ mt: 4, mb: 3 }}>
        Forgot Password
      </Typography>

      {info?.msg && (
        <Alert severity={info.error ? "error" : "success"}>{info.msg}</Alert>
      )}

      <Box
        component='form'
        noValidate
        onSubmit={handleSubmission}
        sx={{ mt: 1, pr: 6 }}
      >
        <TextField
          sx={{ ml: 3 }}
          id='email'
          margin='normal'
          name='email'
          label='Email'
          type='email'
          autoComplete='off'
          variant='outlined'
          value={email}
          onChange={handleChange}
          error={Boolean(errors?.email)}
          helperText={errors?.email}
          fullWidth
        />

        <LoadingButton
          variant='contained'
          size='large'
          sx={{
            ml: 3,
            mt: 3,
            fontSize: 17,
            textTransform: "capitalize",
          }}
          color='primary'
          type='submit'
          fullWidth
          loading={loading}
        >
          Send Reset Link
        </LoadingButton>
      </Box>
      <Link
        sx={{ my: 3, cursor: "pointer" }}
        variant='body2'
        onClick={() => {
          router.push("/user/login");
        }}
      >
        Back to Login
      </Link>
    </Box>
  );
}

export default UserForgotPassword;
