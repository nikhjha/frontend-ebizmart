import React from "react";
import { useRouter } from "next/router";

import { Box, Card, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { LocationCity } from "@mui/icons-material";
import { baseURL } from "../../libs/axiosClient";

const VendorCard = ({
  id,
  firstName,
  city,
  logo,
  lastName,
  companyName,
  to,
}) => {
  // const { id, VendorName, Profilepic, VendorCategory } = e;

  // console.log(e);
  const router = useRouter();

  return (
    <Card
      sx={{
        cursor: "pointer",
        position: "relative",
        width: "100%",
        height: "100%",
        ":hover": {
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "0.5rem solid pink",
          },
        },
      }}
      onClick={() => {
        router.push(to);
      }}
    >
      <Box
        sx={{
          pt: 3,
          pb: 3,
          borderRadius: 30,
        }}
      >
        <Avatar
          alt={`${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`}
          src={`${baseURL}/${logo}`}
          sx={{
            width: 66,
            height: 66,
            mx: 2,
          }}
        />

        <Typography variant="h5" sx={{ mx: 2, my: 1 }}>
          {companyName}
        </Typography>
        <Typography variant="body1" sx={{ mx: 2, my: 1 }}>
          {firstName} {lastName}
        </Typography>
        <Typography variant="body1" sx={{ mx: 2, my: 1 }}>
          {city}
        </Typography>
      </Box>
    </Card>
  );
};

export default VendorCard;
