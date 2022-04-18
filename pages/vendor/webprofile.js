import {
  Box,
  Paper,
  Alert,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  Stack,
} from "@mui/material";
import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import { user as userConst } from "../../constant/constant";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useInfos from "../../hooks/useInfos";
import getFetch, { frontUrl } from "../../libs/axiosClient";
import { useContext } from "react";
import { UserDataContext } from "../../context/UserDataProvider";
import { useRouter } from "next/router";
import useSuggestion from "../../hooks/useSuggestion";
import { UtilityContext } from "../../context/UtilityProvider";

const WebProfile = () => {
  useProtectedRoute();
  const [infos, addInfo, _, handleCloseInfo] = useInfos([]);
  const [errors, addError, __, handleCloseError] = useInfos([]);
  const router = useRouter();
  const { data, reloadData } = useContext(UserDataContext);
  const [newlink, setNewlink, suggestion] = useSuggestion("");
  const { openLoading, closeLoading } = useContext(UtilityContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      openLoading();
      const res = await getFetch().post("/vendors/uniqueName", {
        uniqueName: newlink,
      });
      console.log(res);
      addInfo(res.data.message);
      reloadData();
      setNewlink("");
      closeLoading();
    } catch (e) {
      addError(e?.response?.data.message);
    }
  };
  return (
    <Container maxWidth="md">
      <Box>
        {infos.map((info, index) => (
          <Alert
            key={`config-info-${index}`}
            severity="info"
            sx={{ my: 1 }}
            onClose={() => {
              handleCloseInfo(index);
            }}
          >
            {info}
          </Alert>
        ))}
        {errors.map((error, index) => (
          <Alert
            key={`config-error-${index}`}
            severity="error"
            sx={{ my: 1 }}
            onClose={() => {
              handleCloseError(index);
            }}
          >
            {error}
          </Alert>
        ))}
      </Box>
      <Paper
        elevation={6}
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 2, pt: 4 }}
      >
        {data?._id && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="h6">Default Profile Link</Typography>
              </Grid>
              <Grid item xs={9} sx={{ px: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: "100%",
                    textDecoration: "none",
                    display: "block",
                  }}
                  variantMapping={{ body1: "a" }}
                  href={`${frontUrl}/vendor/profile/${data._id}`}
                >{`${frontUrl}/vendor/profile/${data._id}`}</Typography>
                <Button
                  variant="contained"
                  sx={{ my: 2 }}
                  onClick={() => {
                    router.push(`${frontUrl}/vendor/profile/${data._id}`);
                  }}
                >
                  Preview
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              {data?.uniqueName && (
                <>
                  <Grid item xs={3}>
                    <Typography variant="h6">Unique Link</Typography>
                  </Grid>
                  <Grid item xs={9} sx={{ px: 2 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        maxWidth: "100%",
                        textDecoration: "none",
                        display: "block",
                      }}
                      variantMapping={{ body1: "a" }}
                      href={`${frontUrl}/${data.uniqueName}`}
                    >{`${frontUrl}/${data.uniqueName}`}</Typography>
                    <Button
                      variant="contained"
                      sx={{ my: 2 }}
                      onClick={() => {
                        router.push(`${frontUrl}/${data.uniqueName}`);
                      }}
                    >
                      Preview
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item xs={3}>
                <Typography variant="h6">Create New Link</Typography>
              </Grid>
              <Grid item xs={9} sx={{ px: 2 }}>
                <Stack spacing={2} sx={{ width: 440, maxWidth: "100%" }}>
                  {suggestion?.msg && !suggestion.error && (
                    <Alert severity="success">{suggestion.msg}</Alert>
                  )}
                  {suggestion?.msg && suggestion.error && (
                    <Alert severity="error">{suggestion.msg}</Alert>
                  )}
                  <TextField
                    value={newlink}
                    onChange={(e) => {
                      setNewlink(e.target.value);
                    }}
                  />
                  <Box
                    component="ul"
                    sx={{ px: "14px" }}
                    style={{ listStylePosition: "inside", color: "grey" }}
                  >
                    <Typography variantMapping={{ body1: "li" }}>
                      Be between 5 and 16 characters long
                    </Typography>
                    <Typography variantMapping={{ body1: "li" }}>
                      Should not contain any space
                    </Typography>
                    <Typography variantMapping={{ body1: "li" }}>
                      Can contain digit
                    </Typography>
                    <Typography variantMapping={{ body1: "li" }}>
                      Should not contain these special character expect - or _ or @
                    </Typography>
                  </Box>
                  <Button variant="contained" type="submit">
                    Create Link
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default function webprofile() {
  return (
    <div>
      <Head>
        <title>EbizMart - Vendor Webprofile</title>
      </Head>
      <DashboardLayout user={userConst.vendor}>
        <WebProfile />
      </DashboardLayout>
    </div>
  );
}
