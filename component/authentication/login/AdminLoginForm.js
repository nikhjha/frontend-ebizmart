import { useContext, useState } from "react";
import RouterLink from "next/link";
import { useRouter } from "next/router";
import useForm from "../../../hooks/useForm";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../validations";
// material
import {
  Box,
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  formContentType,
  user as userConstant,
} from "../../../constant/constant";
import { AuthContext } from "../../../context/AuthProvider";

// ----------------------------------------------------------------------

export default function AdminLoginForm({ user }) {
  const { addUser, addToken } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const router = useRouter();
  const [error, setError] = useState("");
  const [validationError, setVelidationError] = useState({});
  const { handleSubmission, loading } = useForm({
    contentType: formContentType.urlencoded,
    postTo:
      user === userConstant.admin
        ? "/admin/login"
        : user === userConstant.users
        ? "/users/login"
        : "/vendor/login",
    validate: (data) => {
      var isPhoneValidated = validatePhoneNumber(data.username, (msg) => {});
      var isEmailValidated = validateEmail(data.username, (msg) => {});
      if (isPhoneValidated || isEmailValidated)
        setVelidationError((error) => {
          delete error["username"];
          return { ...error };
        });
      else
        setVelidationError({
          ...validationError,
          username: "Invalid Username!",
        });
      var isPasswordValidated = validatePassword(data.password, (msg) => {
        setVelidationError({ ...validationError, password: msg });
      });
      if (isPasswordValidated)
        setVelidationError((error) => {
          delete error["password"];
          return { ...error };
        });
      if ((isEmailValidated || isPhoneValidated) && isPasswordValidated) {
        return { error: false };
      } else {
        return { error: true };
      }
    },
    afterSubmission: (res) => {
      console.log(res);
      addToken(res.data.token);
      addUser({ id: res.data.id, role: user });
      router.push(
        user === userConstant.vendor
          ? "/vendor/details"
          : user === userConstant.admin
          ? "/admin/dashboard"
          : "/"
      );
    },
    error: (msg) => {
      setError(msg);
    },
  });
  return (
    <Box
      component='form'
      autoComplete='off'
      noValidate
      onSubmit={handleSubmission}
    >
      <Stack spacing={3}>
        {error !== "" && <Alert severity='error'>{error}</Alert>}
        <TextField
          fullWidth
          autoComplete='username'
          type='text'
          label='Username'
          name='username'
          error={!!validationError["username"]}
          helperText={validationError["username"]}
        />

        <TextField
          fullWidth
          autoComplete='current-password'
          type={showPassword ? "text" : "password"}
          label='Password'
          name='password'
          error={!!validationError["password"]}
          helperText={validationError["password"]}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleShowPassword} edge='end'>
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ my: 2 }}
      >
        <FormControlLabel control={<Checkbox />} label='Remember me' />

        <RouterLink href='/admin/forgot_password'>
          <Link variant='subtitle2' sx={{ cursor: "pointer" }}>
            Forgot password?
          </Link>
        </RouterLink>
      </Stack>

      <LoadingButton
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={loading}
      >
        Login
      </LoadingButton>
    </Box>
  );
}
