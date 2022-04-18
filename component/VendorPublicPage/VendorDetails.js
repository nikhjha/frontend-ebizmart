import React, { useEffect, useRef } from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import StyledPaper from "./StyledPaper";

const WorkingHourText = ({ children, closed, from, to }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        variant="body1"
        color="GrayText"
        variantMapping={{ body1: "span" }}
        sx={{ width: "10ch", py: 1 }}
      >
        {children}
      </Typography>
      &nbsp;
      <Divider orientation="vertical" flexItem variant="fullWidth" />
      {!closed && (
        <Typography
          variant="body1"
          color="GrayText"
          variantMapping={{ body1: "span" }}
          sx={{ margin: "0 auto", py: 1 }}
        >
          {`${from} - ${to}`} &nbsp;
        </Typography>
      )}
      {closed && (
        <Typography
          variant="body1"
          color={"primary.main"}
          variantMapping={{ body1: "span" }}
          sx={{ margin: "0 auto", py: 1 }}
        >
          closed
        </Typography>
      )}
    </Box>
  );
};

const MyCustomMap = ({ center, zoom }) => {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });
  return <div ref={ref} style={{ width: "100%", height: "360px" }}></div>;
};

function VendorDetails({ vendor }) {
  console.log(vendor)
  const {
    location,
    street,city,area,state,
    workingHours,
    acceptedPaymentModes,
    yearOfEstablishment,
    address,
  } = vendor;
  return (
    <StyledPaper
      elevation={6}
      sx={{ p: 2, height: "100%" }}
      component="section"
      id="details"
    >
      <Stack spacing={1} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Location</Typography>
        <MyCustomMap center={location} zoom={8} />
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ my: 1 }} variant="subtitle1">
          Working Hours
        </Typography>
        <WorkingHourText
          closed={workingHours["Sunday"].closed}
          from={workingHours["Sunday"].opening}
          to={workingHours["Sunday"].closing}
        >
          Sunday
        </WorkingHourText>
        <Divider />
        <WorkingHourText
          closed={workingHours["Monday"].closed}
          from={workingHours["Monday"].opening}
          to={workingHours["Monday"].closing}
        >
          Monday
        </WorkingHourText>
        <Divider />
        <WorkingHourText
          closed={workingHours["Tuesday"].closed}
          from={workingHours["Tuesday"].opening}
          to={workingHours["Tuesday"].closing}
        >
          Tuesday
        </WorkingHourText>
        <Divider />
        <WorkingHourText
          closed={workingHours["Wednesday"].closed}
          from={workingHours["Wednesday"].opening}
          to={workingHours["Wednesday"].closing}
        >
          Wednesday
        </WorkingHourText>
        <Divider />
        <WorkingHourText
          closed={workingHours["Thursday"].closed}
          from={workingHours["Thursday"].opening}
          to={workingHours["Thursday"].closing}
        >
          Thursday
        </WorkingHourText>
        <Divider />
        <WorkingHourText
          closed={workingHours["Friday"].closed}
          from={workingHours["Friday"].opening}
          to={workingHours["Friday"].closing}
        >
          Friday
        </WorkingHourText>
        <Divider />
        <WorkingHourText
          closed={workingHours["Saturday"].closed}
          from={workingHours["Saturday"].opening}
          to={workingHours["Saturday"].closing}
        >
          Saturday
        </WorkingHourText>
      </Box>
      <Stack spacing={1}>
        <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
          Address
        </Typography>
        <Typography variant="body1" color="GrayText">
          {city ?`${street},${area}, ${city},    
          ${state}` : "NA"}
        </Typography>
        <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
          Modes of Payment
        </Typography>
        {acceptedPaymentModes ? (
          acceptedPaymentModes.map((payment, index) => (
            <Typography
              key={`payment_mode_${index}`}
              variant="body1"
              color="GrayText"
            >
              {payment}
            </Typography>
          ))
        ) : (
          <Typography variant="body1" color="GrayText">
          NA
          </Typography>
        )}
        <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
          Year Established
        </Typography>
        <Typography variant="body1" color="GrayText">
          {yearOfEstablishment ? yearOfEstablishment : "NA"}
        </Typography>
      </Stack>
    </StyledPaper>
  );
}

export default VendorDetails;
