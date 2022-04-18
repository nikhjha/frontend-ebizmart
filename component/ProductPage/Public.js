import {
  Container,
  Grid,
  Card,
  Button,
  Paper,
  Stack,
  Typography,
  Rating,
  Avatar,
  Box,
  styled,
  CardMedia,
} from "@mui/material";
import { fCurrency } from "../utility/formatNumber";
import React from "react";
import { baseURL } from "../../libs/axiosClient";
import ReviewBoard from "../ReviewBoard";
import Foldable from "../Foldable";
import { Icon } from "@iconify/react";
import roundVerifiedUser from "@iconify/icons-ic/round-verified-user";
import { grey } from "@mui/material/colors";
import { AuthContext } from "../../context/AuthProvider";
import getFetch from "../../libs/axiosClient";
import { useRouter } from "next/router";
import RequestQuote from "../requestQuote";

export default function PublicProductPage({ product, vendor }) {
  const {
    productName,
    images,
    brand,
    discountPrice,
    mrp,
    rating,
    numberOfRating = 0,
    howToUse,
    nutritionalFacts,
    description,
    otherProductInfo,
    quantity,
  } = product;

  const router = useRouter();

  const isValidated = true;
  const webprofileLink = `/${
    vendor.uniqueName ? vendor.uniqueName : "vendor/profile/" + vendor._id
  }`;

  const [reviews, setReviews] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  React.useEffect(() => {
    const fetch = async () => {
      const res = await getFetch().get(`/reviews/receiver/${product._id}`);

      setReviews(
        res.data.review.map((review) => {
          return {
            ...review,
            firstName: "U",
            lastName: "R",
          };
        })
      );
    };
    if (user) {
      fetch();
    }
  }, [user, product]);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Paper elevation={5} sx={{ p: 2, width: "100%" }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item lg={3} md={6} sm={12}>
            <Box
              sx={{
                px: 4,
                height: "100%",
                py: 2,
                boxShadow: 6,
                borderRadius: "1.2rem",
              }}
            >
              <Stack
                spacing={1}
                sx={{
                  minHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 1,
                }}
              >
                <Avatar
                  src={`${baseURL}/${vendor.logo}`}
                  alt={vendor.companyName[0]}
                  sx={{ alignSelf: "center", width: 75, height: 75 }}
                >
                  {vendor.companyName[0]}
                </Avatar>

                <Typography variant="h5">{vendor.companyName}</Typography>
                <Typography sx={{ color: grey["700"] }}>
                  {vendor.city.toUpperCase()}
                </Typography>
                {isValidated && (
                  <Typography
                    sx={{
                      color: grey["700"],
                      display: "flex",
                      alignItems: "center",
                      "& svg": {
                        color: "primary.main",
                      },
                    }}
                  >
                    <Icon icon={roundVerifiedUser} />
                    &nbsp; Ebizmart verified
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  style={{ marginTop: "auto" }}
                  onClick={() => router.push(webprofileLink)}
                >
                  Web Profile
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            sm={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card sx={{ position: "relative", width: 250 }}>
              {/* <ProductImgStyle>
                <Box
                  sx={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <Image
                    alt={productName}
                    src={`${baseURL}/${images[0]}`}
                    layout="responsive"
                    width={250}
                    height={350}
                  />
                </Box>
              </ProductImgStyle> */}
              <CardMedia
                alt={productName}
                image={`${baseURL}/${images[0]}`}
                component="img"
              />
            </Card>
          </Grid>
          <Grid item lg={5} md={12} sm={12} sx={{ minHeight: 350 }}>
            <Stack
              spacing={1}
              sx={{
                pt: 2,
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                {brand}
              </Typography>
              <Typography variant="h4">{productName}</Typography>
              <Typography variant="subtitle1" color="primary">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: "text.disabled",
                    textDecoration: "line-through",
                  }}
                >
                  {mrp && fCurrency(mrp)}
                </Typography>
                &nbsp;
                {fCurrency(discountPrice)}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Rating
                  value={rating}
                  precision={0.5}
                  readOnly
                  sx={{ color: "primary.main" }}
                />
                &nbsp;
                {rating} &nbsp;
                <Typography
                  variant="body1"
                  variantMapping={{ body1: "span" }}
                  color="text.secondary"
                >{`(${numberOfRating} ratings)`}</Typography>
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Only {quantity} is available
              </Typography>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ py: 2 }}
                style={{ marginTop: "auto" }}
              >
                <RequestQuote />
              </Stack>
            </Stack>
          </Grid>
          <Grid item lg={3} md={12} sm={12}>
            <Box>
              {description && (
                <Foldable label={"Description"}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    {description}
                  </Typography>
                </Foldable>
              )}
              {howToUse && (
                <Foldable label={`How to use ${productName}`}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    {howToUse}
                  </Typography>
                </Foldable>
              )}
              {nutritionalFacts && (
                <Foldable label={`Nutritional Facts `}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    {nutritionalFacts}
                  </Typography>
                </Foldable>
              )}
              {otherProductInfo && (
                <Foldable label={`Other Informations`}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    Best Before
                    <Typography
                      color="text.secondary"
                      variantMapping={{ body1: "span" }}
                    >
                      &nbsp; {otherProductInfo.bestBefore?.split("T")[0]}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    Country of Origin
                    <Typography
                      color="text.secondary"
                      variantMapping={{ body1: "span" }}
                    >
                      &nbsp; {otherProductInfo.countryOfOrigin}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    Flavour
                    <Typography
                      color="text.secondary"
                      variantMapping={{ body1: "span" }}
                    >
                      &nbsp; {otherProductInfo.flavour}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    Manufacturer
                    <Typography
                      color="text.secondary"
                      variantMapping={{ body1: "span" }}
                    >
                      &nbsp; {otherProductInfo.manufacturer}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    Size
                    <Typography
                      color="text.secondary"
                      variantMapping={{ body1: "span" }}
                    >
                      &nbsp; {otherProductInfo.size}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ py: 1 }}
                  >
                    Weight
                    <Typography
                      color="text.secondary"
                      variantMapping={{ body1: "span" }}
                    >
                      &nbsp; {otherProductInfo.weight}
                    </Typography>
                  </Typography>
                </Foldable>
              )}
            </Box>
          </Grid>
          <Grid item lg={9} md={12} sm={12} sx={{ width: "100%" }}>
            <Box
              sx={{
                boxShadow: 4,
                minHeight: "100%",
                borderRadius: "1.2rem",
                width: "100%",
              }}
            >
              <ReviewBoard
                reviews={reviews}
                sx={{ p: 2 }}
                of={{ name: "PRODUCT", id: product._id }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
