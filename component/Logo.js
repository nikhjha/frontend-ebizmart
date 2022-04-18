import PropTypes from "prop-types";
// material
import { Box } from "@mui/material";
import Image from "next/image";
// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <Box sx={{ width: 125, height: 50, ...sx }}>
      <Image src="/logo.jpeg" alt="logo" width="125" height="50" />
    </Box>
  );
}
