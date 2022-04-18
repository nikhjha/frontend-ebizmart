import RouterLink from "next/link";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "./AuthLayout";
// components
import { MHidden } from "../@material-extend";
import { RegisterForm } from "../authentication/register";
import AuthSocial from "../authentication/AuthSocial";
import Image from "next/image";
import { vendorRegistration } from "../../constant/constant";
import { useState } from "react";
import { Alert } from "@mui/material";
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

export default function Register() {
  const [error, setError] = useState("");
  return (
    <RootStyle title="Register | Minimal-UI">
      <AuthLayout>
        Already have an account? &nbsp;
        <RouterLink href="/vendor/login">
          <Link underline="none" variant="subtitle2" sx={{ cursor: "pointer" }}>
            Login
          </Link>
        </RouterLink>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 0, mb: 5 }}>
            Manage your ecommerce job more effectively with EbizMart
          </Typography>
          <Image
            alt="register"
            src="/illustrations/illustration_register.png"
            width="480"
            height="360"
          />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Let&apos;s Get Started .
            </Typography>
            <Typography
              sx={{ cursor: "pointer", color: "text.secondary" }}
            >
              No need for ecommerce builders.
            </Typography>
            {error !== "" && (
              <Alert sx={{ mt: 2 }} severity="error">
                {error}
              </Alert>
            )}
          </Box>

          <AuthSocial action={vendorRegistration} setError={setError} />

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to EbizMart&nbsp;
            <Link underline="always" sx={{ color: "text.primary", cursor:"pointer" }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: "text.primary", cursor:"pointer"}}>
              Privacy Policy
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?&nbsp;
              <RouterLink href="/vendor/login" sx={{ cursor: "pointer" }}>
                <Link to="/login">Login</Link>
              </RouterLink>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
