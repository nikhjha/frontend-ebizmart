import React, { useState } from "react";
import VendorCard from "./VendorCard";
import { Grid } from "@mui/material";

const AllVendorCards = ({ vendors }) => {
  return (
    <Grid container spacing={4}>
      {vendors.map((e) => (
        <Grid key={e._id} item xs={12} sm={6} md={4}>
          <VendorCard {...e} to={`/admin/vendor/${e._id}`} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllVendorCards;
