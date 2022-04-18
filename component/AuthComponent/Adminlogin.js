import { useState } from "react";
import RouterLink from "next/link";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Stack,
  Link,
  Container,
  Typography,
  Alert,
} from "@mui/material";
//Auth layout
import AuthLayout from "./AuthLayout";
// components
import { MHidden } from "../@material-extend";
import { AdminLoginForm } from "../authentication/login";
// import AuthSocial from "../authentication/AuthSocial";
import Image from "next/image";
import { user } from "../../constant/constant";

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function AdminLogin() {
  const [error, setError] = useState("");
  return (
    <RootStyle>
      <AuthLayout></AuthLayout>

      <MHidden width='mdDown'>
        <SectionStyle>
          <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back Admin
          </Typography>
          <Image
            src='/illustrations/illustration_components.png'
            alt='login'
            width='300'
            height='450'
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth='sm'>
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant='h4' gutterBottom>
              Sign in to EbizMart
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Enter your details below.
            </Typography>

            {error !== "" && (
              <Alert sx={{ mt: 2 }} severity='error'>
                {error}
              </Alert>
            )}
          </Stack>

          <AdminLoginForm user={user.admin} />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
