import RouterLink from "next/link";
// material
import { styled } from "@mui/material/styles";
import { Box, Card, Link, Container, Typography } from "@mui/material";
// layouts
import AuthLayout from "./AuthLayout";
// components
import { MHidden } from "../@material-extend";
import Image from "next/image";
import ResetPassword from "../authentication/ResetPassword";
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

export default function ResetPage({ user }) {
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
          <Typography variant="h4" sx={{ px: 5, mt: 0, mb: 5 }}>
            Reset the password, without worry.
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
              Reset Password 
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Dont worry, we got you!
            </Typography>
          </Box>
          <ResetPassword user={user} />
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
