import { Container, Grid } from "@mui/material";
import React from "react";
import { MHidden } from "../@material-extend";
import CategoryCart from "./CategoryCart";
import CategorySelection from "./CategorySelection";

export default function CategoryPanel() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <MHidden width="mdDown">
          <Grid item xs={3}>
            <CategorySelection />
          </Grid>
        </MHidden>
        <Grid item md={9} xs={12}>
          <CategoryCart />
        </Grid>
      </Grid>
    </Container>
  );
}
