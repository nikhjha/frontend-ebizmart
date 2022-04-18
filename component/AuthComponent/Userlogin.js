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
import { UserLoginForm } from "../authentication/login";
import AuthSocial from "../authentication/AuthSocial";
import Image from "next/image";
import { userLogin, user } from "../../constant/constant";

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

export default function UserLogin() {
  const [error, setError] = useState("");
  return (
    <RootStyle>
      <AuthLayout>
        Don’t have an account? &nbsp;
        <RouterLink href='/user/registration'>
          <Link underline='none' variant='subtitle2' sx={{ cursor: "pointer" }}>
            Get started
          </Link>
        </RouterLink>
      </AuthLayout>

      <MHidden width='mdDown'>
        <SectionStyle>
          <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back User
          </Typography>
          <Image
            src='/illustrations/illustration_user.png'
            alt='login'
            width='300'
            height='500'
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
          <AuthSocial action={userLogin} setError={setError} />

          <UserLoginForm user={user.users} />

          <MHidden width='smUp'>
            <Typography
              variant='body2'
              align='center'
              sx={{ mt: 3, cursor: "pointer" }}
            >
              Don’t have an account?&nbsp;
              <RouterLink href='/user/registration'>
                <Link
                  variant='subtitle2'
                  to='register'
                  sx={{ cursor: "pointer" }}
                >
                  Get started
                </Link>
              </RouterLink>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
