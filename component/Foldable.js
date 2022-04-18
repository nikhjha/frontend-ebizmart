import React from "react";
import { ExpandMore } from "@mui/icons-material";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const Foldable = ({ children, label }) => {
  return (
    <Accordion sx={{ width: "100%" }}>
      <AccordionSummary expandIcon={<ExpandMore color="primary" />}>
        <Typography variant="subtitle1" sx={{ my: 2, color: "primary.main" }}>
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Foldable;
