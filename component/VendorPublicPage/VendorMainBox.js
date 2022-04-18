import React from "react";
import { Box, Typography, Stack, Link } from "@mui/material";
import { MHidden } from "../@material-extend";
import { styled } from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ShareIcon from "@mui/icons-material/Share";
import { baseURL } from "../../libs/axiosClient";

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "None",
  fontSize: "1.2rem",
  position: "relative",
  "::before": {
    content: "''",
    position: "absolute",
    bottom: "-0.2rem",
    right: 0,
    width: "0%",
    height: "0.25rem",
    borderRadius: "0.15rem",
    backgroundColor: "rgb(220,50,38)",
    transition: "width 0.5s ease-in",
  },
  ":hover": {
    "::before": {
      width: "80%",
    },
  },
});

const CustomIcon = ({ icon, title }) => {
  return (
    <Box
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        gap: "0.5rem",
      }}
    >
      <Box
        sx={{
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "primary.main",
        }}
      >
        {icon}
      </Box>
      <Typography variant="body1" fontSize="0.8rem">
        {title}
      </Typography>
    </Box>
  );
};

function VendorMainBox({ vendor }) {
  const { companyName, phone, email, city, images } = vendor;
  return (
    <Box sx={{ width: "100%", position: "relative", borderRadius: 1 }}>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundImage: images[0]
            ? `url('${baseURL}/${images[0]}')`
            : "url('/mock-images/covers/cover_3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          borderRadius: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          backgroundImage: "linear-gradient( rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
          borderRadius: 1,
        }}
      />
      <Box sx={{ p: 2, position: "relative" }}>
        <MHidden width="mdDown">
          <Box
            sx={{
              p: 2,
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <StyledLink href="/">Home</StyledLink>
            <StyledLink href="#details">Details</StyledLink>
            <StyledLink href="#popular_products">Products</StyledLink>
            <StyledLink href="#profile">Profile</StyledLink>
            <StyledLink href="#images/reviews">Images/Reviews</StyledLink>
          </Box>
        </MHidden>
        <MHidden width="mdUp">
          <Box
            sx={{
              p: 2,
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <Menu sx={{ color: "rgb(255,255,255)" }} />
          </Box>
        </MHidden>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            my: 2,
            p: 2,
            color: "white",
            ":hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "1rem",
              boxShadow: "0px 0px 0.5rem 0px black",
            },
          }}
        >
          <Stack spacing={2}>
            <Typography
              variant="h4"
              style={{ fontSize: "3rem", lineHeight: "3.5rem" }}
            >
              {companyName}
            </Typography>
            <Typography variant="subtitle1">AN EBIZMART VENDOR</Typography>
          </Stack>
          <Stack spacing={2} sx={{ my: 4 }}>
            <Typography
              variant="body1"
              color="white"
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "uppercase",
              }}
            >
              <LocationOnIcon fontSize="small" /> &nbsp; {city}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <PhoneIcon fontSize="small" /> &nbsp; {`(+91)${phone}`}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <EmailIcon fontSize="small" /> &nbsp; {email}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <CustomIcon
              icon={<LanguageOutlinedIcon fontSize="0.8rem" />}
              title="Website"
            />
            <CustomIcon
              icon={<YouTubeIcon fontSize="0.8rem" />}
              title="Youtube"
            />
            <CustomIcon
              icon={<TwitterIcon fontSize="0.8rem" />}
              title="Twitter"
            />
            <CustomIcon
              icon={<FacebookIcon fontSize="0.8rem" />}
              title="Facebook"
            />
            <CustomIcon icon={<ShareIcon fontSize="0.8rem" />} title="Share" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default VendorMainBox;
