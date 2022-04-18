import React from "react";
import StyledPaper from "./StyledPaper";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

function VendorProfile({ vendor }) {
  const {
    yearOfEstablishment,
    natureOfBusiness,
    numberOfEmployees,
    legalStatusOfFirm,
    annualTurnOver,
    gstNumber,
    importExportCode,
    cinNumber,
  } = vendor;

  return (
    <StyledPaper
      elevation={6}
      sx={{ my: 1, mb: 5, p: 2, height: "100%" }}
      component="section"
      id="profile"
    >
      <Typography variant="h4">Profile</Typography>
      <Typography variant="subtitle2" color="GrayText" sx={{ my: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        nec odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Integer nec odio.Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Integer nec odio.
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/business.svg"
                    width="50"
                    height="50"
                    alt="business"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="GrayText" gutterBottom>
                Nature of Business
              </Typography>
              <Typography variant="body1">{natureOfBusiness ? natureOfBusiness : "NA"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/team.svg"
                    width="50"
                    height="50"
                    alt="total number of employees"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="GrayText" gutterBottom>
                Total Number Of Employees
              </Typography>
              <Typography variant="body1">{numberOfEmployees ? numberOfEmployees : "NA"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/business-and-trade.svg"
                    width="50"
                    height="50"
                    alt="year of establishment"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="GrayText" gutterBottom>
                Year of Eastablishment
              </Typography>
              <Typography variant="body1">{yearOfEstablishment ? yearOfEstablishment : "NA"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/legal-document.svg"
                    width="50"
                    height="50"
                    alt="legal status of firm"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="GrayText" gutterBottom>
                Legal Status of Firm
              </Typography>
              <Typography variant="body1">{legalStatusOfFirm ? legalStatusOfFirm : "NA"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/stats.svg"
                    width="50"
                    height="50"
                    alt="annual turn over"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="GrayText" gutterBottom>
                Annual Turn Over
              </Typography>
              <Typography variant="body1">{annualTurnOver ? annualTurnOver : "NA"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/export.svg"
                    width="50"
                    height="50"
                    alt="import export code"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="GrayText" gutterBottom>
                Import Export Code (IEC)
              </Typography>
              <Typography variant="body1">{importExportCode ? importExportCode : "NA"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/document.svg"
                    width="50"
                    height="50"
                    alt="gstNumber no."
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="GrayText" gutterBottom>
                gstNumber No.
              </Typography>
              <Typography variant="body1">{gstNumber ? gstNumber : "NA"}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container>
            <Grid item xs={6}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Image
                    src="/document.svg"
                    width="50"
                    height="50"
                    alt="cin no."
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="GrayText" gutterBottom>
                CIN No.
              </Typography>
              <Typography variant="body1">{cinNumber ? cinNumber : "NA"}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}

export default VendorProfile;
