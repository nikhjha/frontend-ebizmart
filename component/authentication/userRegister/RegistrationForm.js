import { useState } from "react";
import { useRouter } from "next/router";
import useForm from "../../../hooks/useForm";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {
  validatefirstName,
  validatelastName,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../validations";
// material
import {
  Box,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { formContentType } from "../../../constant/constant";

// ----------------------------------------------------------------------

export default function RegisterForm(user) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [validationError, setVelidationError] = useState({});
  const { handleSubmission, loading } = useForm({
    contentType : formContentType.urlencoded,
    postTo: "/users/register",
    validate: (data) => {
      console.log("test")
      var isFirstNameValidated = validatefirstName(
        data.firstName,
        (msg) => {
          setVelidationError({ ...validationError, firstName: msg });
        }
      );
      if (isFirstNameValidated) {
          delete error["firstName"];
          return { ...error };
      };
      var isLastNameValidated = validatelastName(data.lastName, (msg) => {
        setVelidationError({ ...validationError, lastName: msg });
      });
      console.log(isLastNameValidated)
      if (isLastNameValidated)
        setVelidationError((error) => {
          delete error["lastName"];
          return { ...error };
        });
      var isPhoneValidated = validatePhoneNumber(data.phone, (msg) => {
        setVelidationError({ ...validationError, phone: msg });
      });
      if (isPhoneValidated)
        setVelidationError((error) => {
          delete error["phone"];
          return { ...error };
        });
      var isPasswordValidated = validatePassword(data.password, (msg) => {
        setVelidationError({ ...validationError, password: msg });
      });
      if (isPasswordValidated)
        setVelidationError((error) => {
          delete error["password"];
          return { ...error };
        });
      var isEmailValidated = validateEmail(data.email, (msg) => {
        setVelidationError({ ...validationError, email: msg });
      });
      if (isEmailValidated)
        setVelidationError((error) => {
          delete error["email"];
          return { ...error };
        });
      if (!isEmailValidated || !isPasswordValidated || !isPhoneValidated || !isFirstNameValidated || !isLastNameValidated) {
        return { error: true };
      } else {
        return { error: false };
      }
    },
    afterSubmission: (res) => {
      console.log(res);
      router.push("/user/login");
    },
    error: (msg) => {
      setError(msg);
    },
  });

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmission}
    >
      <Stack spacing={3}>
        {error !== "" && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          autoComplete="username"
          type="string"
          label="First Name"
          name="firstName"
          error={!!validationError["firstName"]}
          helperText={validationError["firstName"]}
        />
        <TextField
          fullWidth
          autoComplete="username"
          type="string"
          label="Last Name"
          name="lastName"
          error={!!validationError["lastName"]}
          helperText={validationError["lastName"]}
        />
        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email address"
          name="email"
          error={!!validationError["email"]}
          helperText={validationError["email"]}
        />
        <TextField
          fullWidth
          autoComplete="username"
          type="tel"
          label="Phone Number"
          name="phone"
          error={!!validationError["phone"]}
          helperText={validationError["phone"]}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          name="password"
          error={!!validationError["password"]}
          helperText={validationError["password"]}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography sx={{ px: "14px" }} color="primary">Password Must:</Typography>
        <Box
          component="ul"
          sx={{ px: "14px" }}
          style={{ listStylePosition: "inside", color: "grey" }}
        >
          <Typography variantMapping={{ body1: "li" }}>
            Be between 8 and 16 characters long
          </Typography>
          <Typography variantMapping={{ body1: "li" }}>
            Contain at least 1 capital letter
          </Typography>
          <Typography variantMapping={{ body1: "li" }}>
            Contain at least 1 digit
          </Typography>
          <Typography variantMapping={{ body1: "li" }}>
            Contain at least 1 special character
          </Typography>
        </Box>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          Register
        </LoadingButton>
      </Stack>
    </Box>
  );
}
