import React, { useState } from "react";
import { 
  Box, 
  Link, 
  Typography, 
  TextField,
  IconButton,
  InputAdornment,
  Alert 
} from "@mui/material";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { LoadingButton } from "@mui/lab";
import useForm from "../../hooks/useForm";
import { formContentType } from "../../constant/constant";
import { useRouter } from "next/router";

function ResetPassword({ user }) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState({});
  const [shownew,setShowNew] = useState(false)
  const [showconfirm,setShowConfirm] = useState(false)
 
  
  const handleNewPassword = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setError({ newPassowrd: "" });
    setNewPassword(value);
    let regex = new RegExp(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%^?&])(?=\\S+$).{8,}$"
    ).test(value);

    if (!regex) {
      setError({ newPassowrd: "Invalid format" });
    }
  };
  const handleConfirmPassword = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setError({ confirmPassword: "" });
    setConfirmPassword(value);
    let regex = new RegExp(
      "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%^?&])(?=\\S+$).{8,}$"
    ).test(value);

    if (!regex) {
      setError({ confirmPassword: "Invalid format" });
    }
  };

  const { id, email, resetToken } = user;

  const { handleSubmission, loading } = useForm({
    postTo: `vendors/reset-password/${id}/${email}/${resetToken}`,
    contentType: formContentType.urlencoded,
    validate: ({ newPassword, confirmPassword }) => {
      if (newPassword !== confirmPassword) {
        setInfo({ msg: "Password don't match", error: true });
        return { error: true };
      } else if (newPassword === "" && confirmPassword === "") {
        setInfo({ msg: "Fields are empty", error: true });
        return { error: true };
      }
      return { error: false };
    },
    afterSubmission : (res) => {
      console.log(res);
      setInfo({msg : "Reset Successful !!!"});
      setTimeout(()=>{router.push("/vendor/login")},5000);
    },
    error : (msg) => {
      console.log(msg);
      setInfo({ msg: "Invalid Link", error: true })
    }
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
        pr : 6
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 3,ml: 6}}>
        Reset Password
      </Typography>

      {info?.msg && (
        <Alert severity={info.error ? "error" : "success"} sx={{ ml: 6 }}>{info.msg}</Alert>
      )}

      <Box component="form" onSubmit={handleSubmission} noValidate sx={{ mt: 1 }}>
        <TextField
          sx={{ ml: 3}}
          fullWidth
          margin="normal"
          required
          name="newPassword"
          label="New password"
          type={shownew ? "text" : "password"}
          id="new password"
          autoComplete="off"
          variant="outlined"
          value={newPassword}
          onChange={handleNewPassword}
          error={Boolean(error.newPassword)}
          helperText={error.newPassword}
          
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowNew(prevState => !prevState)}
                >
                  <Icon icon={shownew ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          sx={{ ml: 3}}
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm password"
          type={showconfirm ? "text" : "password"}
          id="confirm password"
          autoComplete="off"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          error={Boolean(error.confirmPassword)}
          helperText={error.confirmPassword}
          
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowConfirm(prevState => !prevState)}
                >
                  <Icon icon={showconfirm ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography sx={{ px: "14px", mt: 3, ml: 3 }} color="primary">Password Must:</Typography>
        <Box
          component="ul"
          sx={{ px: "14px",mt:3,ml:3}}
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
          variant="contained"
          color="primary"
          sx={{
            ml: 3,
            mt: 3,
            fontSize: 17,
            textTransform: "capitalize",
          }}
          fullWidth
          type="submit"
          loading={loading}
        >
          Reset Password
        </LoadingButton>
      </Box>

      <Link
        sx={{ my: 3, ml: 6, cursor : "pointer" }}
        variant="body2"
        onClick={() => {
          router.push("/vendor/login");
        }}
      >
        Back to Login
      </Link>
    </Box>
  );
}

export default ResetPassword;