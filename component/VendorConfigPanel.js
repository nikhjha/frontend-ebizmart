import {
  Alert,
  Box,
  Paper,
  Stack,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper1 from "./VendorConfigSteppers/Stepper1";
import Stepper2 from "./VendorConfigSteppers/Stepper2";
import Stepper3 from "./VendorConfigSteppers/Stepper3";
import Stepper4 from "./VendorConfigSteppers/Stepper4";
import useInfos from "../hooks/useInfos";
import useForm from "../hooks/useForm";
import { MHidden } from "./@material-extend";
import { formContentType, requestType } from "../constant/constant";
import useProtectedRoute from "../hooks/useProtectedRoute";
import { AuthContext } from "../context/AuthProvider";
import { useRouter } from "next/router";
import { UserDataContext } from "../context/UserDataProvider";
import { user as userConst } from "../constant/constant";

export default function VendorConfigPanel({ isPatch = false }) {
  const verified = useProtectedRoute(userConst.vendor);
  const [infos, addInfo, _, handleCloseInfo] = useInfos([
    "Please provide all the details to proceed to dashboard",
  ]);
  const [errors, addError, __, handleCloseError] = useInfos([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState([]);
  const steps = [
    "Location Information",
    "Contact Information",
    "Other Information",
    "Upload Photo/Logo/Videos",
  ];
  const { data, dataLoading, reloadData } = useContext(UserDataContext);
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!isPatch && data && data.activationStatus !== null) {
      router.push("/vendor/dashboard");
      return;
    }
    if (isPatch || (data && data.activationStatus === null)) {
      setShow(true);
    }
  }, [isPatch, data, router]);
  const { previousData, handleSave, handleSubmission } = useForm({
    postTo: `/vendors/${user?.id}`,
    type: requestType.patch,
    initialValues: data ? data : {},
    contentType: formContentType.formdata,
    validate: (data) => {
      console.log(data);
      return { error: false, message: "Error happened" };
    },
    error: (msg) => {
      addError(msg);
    },
    afterSave: () => {
      setCompleted((completed) => [
        ...completed.filter((item) => item !== currentStep),
        currentStep,
      ]);
      setCurrentStep(currentStep + 1);
    },
    afterSubmission: async (res) => {
      addInfo(res.data.message);
      await reloadData();
    },
  });
  const handleSubmit = (e) => {
    if (currentStep === steps.length - 1) {
      handleSubmission(e);
    } else {
      handleSave(e);
    }
  };
  return (
    <Box
      sx={{ width: "100%", p: 2, minHeight: "100vh", bgcolor: "blank.main" }}
    >
      {!dataLoading && show && verified && (
        <>
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
          <Box sx={{ my: 4 }}>
            <MHidden width="mdDown">
              <Stepper activeStep={currentStep} alternativeLabel nonLinear>
                {steps.map((label, index) => (
                  <Step
                    key={`${label}-${index}`}
                    completed={completed.includes(index)}
                    onClick={() => {
                      setCurrentStep(index);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </MHidden>
            <MHidden width="mdUp">
              <Typography variant="h4">{`${steps[currentStep]} :`}</Typography>
            </MHidden>
          </Box>
          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={2}
            sx={{ p: 2, mb: 5 }}
          >
            <Box>
              <Stack spacing={2}>
                {currentStep === 0 && <Stepper1 previousData={previousData} />}
                {currentStep === 1 && <Stepper2 previousData={previousData} />}
                {currentStep === 2 && <Stepper3 previousData={previousData} />}
                {currentStep === 3 && <Stepper4 previousData={previousData} />}
              </Stack>
            </Box>
            <Box
              sx={{
                p: 2,
                mt: 4,
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  md={4}
                  sx={{ display: "flex" }}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  {currentStep !== 0 && (
                    <Button
                      onClick={() => {
                        setCurrentStep(currentStep - 1);
                      }}
                    >
                      Prev
                    </Button>
                  )}
                </Grid>
                <MHidden width="mdUp">
                  <Grid
                    item
                    xs={6}
                    md={4}
                    sx={{ display: "flex" }}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    {currentStep !== steps.length - 1 && (
                      <Button
                        onClick={() => {
                          setCurrentStep(currentStep + 1);
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Grid>
                </MHidden>
                {currentStep !== steps.length - 1 && (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{ display: "flex" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button variant="contained" type="submit">
                      Save and Continue
                    </Button>
                  </Grid>
                )}
                {currentStep === steps.length - 1 && (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{ display: "flex" }}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button variant="contained" type="submit">
                      Save and Submit
                    </Button>
                  </Grid>
                )}
                <MHidden width="mdDown">
                  <Grid
                    item
                    xs={6}
                    md={4}
                    sx={{ display: "flex" }}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    {currentStep !== steps.length - 1 && (
                      <Button
                        onClick={() => {
                          setCurrentStep(currentStep + 1);
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Grid>
                </MHidden>
              </Grid>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
}
