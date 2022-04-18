import React, { useRef } from "react";
import { Box, Grid, Stack, Typography, Container } from "@mui/material";
import ShopProductCard from "./ProductCard";
import VendorMainBox from "./VendorMainBox";
import StyledPaper from "./StyledPaper";
import VendorDetails from "./VendorDetails";
import VendorProfile from "./VendorProfile";
import VendorImagesReviews from "./VendorImagesReviews";

const CardContainer = ({ sx, cardContent, title, emptyText, id }) => {
  const scrollbarRef = useRef();
  return (
    <StyledPaper sx={{ ...sx }} component="section" elevation={6} id={id}>
      <Typography sx={{ mb: 2 }} variant="h4">
        {title}
      </Typography>
      {cardContent.length !== 0 && (
        <Stack
          direction="row"
          spacing={2}
          ref={scrollbarRef}
          sx={{
            p: 4,
            px: 2,
            width: "100%",
            overflow: "hidden",
            overflowX: "scroll",
            backgroundImage: "url('/images/background-textures.webp')",
            borderRadius: "1.2rem",
            "::-webkit-scrollbar": {
              height: "1rem",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              border: "2px solid white",
              borderRadius: "0.5rem",
            },
            perspective : "200px"
          }}
        >
          {cardContent.map((content, index) => (
            <Box width={240} key={`popular_products_${index}`}>
              <ShopProductCard
                product={content}
                to={`/product/${content._id}`}
                scrollbarRef={scrollbarRef}
              />
            </Box>
          ))}
        </Stack>
      )}
      {cardContent.length === 0 && (
        <Typography variant="subtitle2" color="GrayText">
          {emptyText}
        </Typography>
      )}
    </StyledPaper>
  );
};

const VendorPublicPage = ({ vendor }) => {
  const { products, popularProducts } = vendor;

  return (
    <Box
      sx={{
        position: "relative",
        p: 2,
        ":before": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          content: "''",
          backgroundImage: "url('/images/background-textures.webp')",
          zIndex: "-200",
        },
        ":after": {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          content: "''",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.25) 20%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.5))",
          backgroundSize: "768px 512px",
          zIndex: "-100",
        },
      }}
    >
      <VendorMainBox vendor={vendor} />
      {/* Change here to lg or xl */}
      <Container maxWidth="lg" sx={{ position: "relative", pb: 4 }}>
        <Grid container sx={{ my: 1, pb: 4 }} spacing={4}>
          <Grid item md={4} xs={12}>
            <VendorDetails vendor={vendor} />
          </Grid>
          <Grid item md={8} xs={12}>
            <CardContainer
              sx={{ p: 2 }}
              cardContent={popularProducts}
              title={"Popular Products"}
              emptyText={"No popular product is present!"}
              id="popular_products"
            />
            <CardContainer
              sx={{ my: 2, mt: 4, p: 2 }}
              cardContent={products}
              title={"All Products"}
              emptyText={"No product is present!"}
              id="all_products"
            />
          </Grid>
        </Grid>
        <VendorProfile vendor={vendor} />
        <VendorImagesReviews vendor={vendor} />
      </Container>
    </Box>
  );
};

export default VendorPublicPage;
