import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  FormControlLabel,
  Radio,
  Checkbox,
  Rating,
  Card,
  CardMedia,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { grey } from "@mui/material/colors";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
import roundVerifiedUser from "@iconify/icons-ic/round-verified-user";
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill";
import { GlobalStateContext } from "../context/GlobalStateProvider";
import { fCurrency } from "./utility/formatNumber";
import { motion } from "framer-motion";
import { MHidden } from "./@material-extend";
import Foldable from "./Foldable";
import { useRouter } from "next/router";
import { baseURL } from "../libs/axiosClient";

const SearchesFilter = () => {
  const { categories } = useContext(GlobalStateContext);
  return (
    <Paper elevation={6} sx={{ p: 2, width: "100%" }}>
      <Foldable label={"Rating"}>
        <Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Radio />
            <Rating value={5} readOnly sx={{ color: "primary.main" }} />
            <Typography sx={{ color: grey["700"] }}>5 star</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Radio />
            <Rating value={4} readOnly sx={{ color: "primary.main" }} />
            <Typography sx={{ color: grey["700"] }}>4 star</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Radio />
            <Rating value={3} readOnly sx={{ color: "primary.main" }} />
            <Typography sx={{ color: grey["700"] }}>3 star</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Radio />
            <Rating value={2} readOnly sx={{ color: "primary.main" }} />
            <Typography sx={{ color: grey["700"] }}>2 star</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Radio />
            <Rating value={1} readOnly sx={{ color: "primary.main" }} />
            <Typography sx={{ color: grey["700"] }}>1 star</Typography>
          </Stack>
        </Stack>
      </Foldable>
      <Foldable label={"Category"}>
        <Stack>
          {categories.map((category, index) => (
            <FormControlLabel
              key={`filter_based_on_category_${index}`}
              label={category.name}
              control={<Checkbox />}
              sx={{ color: grey["700"], ":hover": { color: "primary.main" } }}
            />
          ))}
        </Stack>
      </Foldable>
      <Foldable label={"Price"}></Foldable>
      <Foldable label={"Brand"}></Foldable>
    </Paper>
  );
};

const ProductListCard = ({ product }) => {
  const {
    _id,
    images,
    productName,
    brand,
    discountPrice,
    mrp,
    rating,
    numberOfRating,
    vendor,
  } = product;
  const router = useRouter();
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "12rem",
        flexWrap : "wrap"
      }}
      component={motion.div}
      whileHover={{ backgroundColor: "rgba(229,86,64,0.5)" }}
      whileInView={{ x: 0 }}
      initial={{ x: 200 }}
      transition={{ type: "spring", bounce: 0.2 }}
    >
      <CardMedia
        image={`${baseURL}/${images[0]}`}
        alt={productName}
        component="img"
        sx={{ width: 180, cursor : "pointer", mx : "auto" }}
        onClick={() => {
          router.push(`/product/${_id}`);
        }}
      />
      <Box
        sx={{ px: 2, py: 1, flexGrow: 1, cursor : "pointer" }}
        onClick={() => {
          router.push(`/product/${_id}`);
        }}
      >
        <Stack spacing={0.2}>
          <Typography variant="subtitle1" sx={{ color: grey["700"] }}>
            {brand}
          </Typography>
          <Typography
            variant="h5"
            noWrap
            sx={{ textOverflow: "ellipsis", overflow: "hidden", maxWidth: 400 }}
          >
            {productName}
          </Typography>
          <Typography variant="subtitle1">
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
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Rating
              value={rating ? rating : 0}
              readOnly
              size="small"
              sx={{ color: "primary.main" }}
            />
            <Typography sx={{ color: grey["700"], fontSize: "0.8rem" }}>{`${
              rating ? rating : 0
            } (${numberOfRating ? numberOfRating : 0})`}</Typography>
          </Stack>
        </Stack>
      </Box>
      <MHidden width="smDown">
        <Box sx={{ px: 4 }}>
          <Stack
            spacing={0.4}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              py: 1,
            }}
          >
            <Avatar
              src={`${baseURL}/${vendor.logo}`}
              alt={
                vendor.firstName && vendor.lastName
                  ? `${vendor.firstName[0]} ${vendor.lastName[0]}`
                  : "VN"
              }
              sx={{ alignSelf: "center" }}
            >
              {vendor.firstName && vendor.lastName
                ? `${vendor.firstName[0]} ${vendor.lastName[0]}`
                : "VN"}
            </Avatar>
            <Typography variant="subtitle1">{vendor.companyName}</Typography>
            <Typography sx={{ color: grey["700"], fontSize: "0.8rem" }}>
              {vendor.city.toUpperCase()}
            </Typography>
            {vendor.isValidated && (
              <Typography
                sx={{
                  color: grey["700"],
                  fontSize: "0.8rem",
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
              onClick={() => {
                router.push(
                  vendor.uniqueName
                    ? `/${vendor.uniqueName}`
                    : `/vendor/profile/${vendor._id}`
                );
              }}
            >
              Web Profile
            </Button>
          </Stack>
        </Box>
      </MHidden>
    </Card>
  );
};

function ProductList({ products }) {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [filterDrawer, setFilterDrawer] = useState(isMd ? true : false);
  useEffect(() => {
    setFilterDrawer(isMd);
  }, [isMd]);
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <Button
          disableRipple
          sx={{ color: grey["800"] }}
          endIcon={<Icon icon={roundFilterList} />}
          onClick={() => setFilterDrawer(!filterDrawer)}
        >
          Filters&nbsp;
        </Button>
        <Button
          sx={{ color: grey["800"] }}
          disableRipple
          endIcon={<Icon icon={chevronDownFill} />}
        >
          Sort By:&nbsp;
          <Typography
            component="span"
            variant="subtitle2"
            sx={{ color: "text.secondary" }}
          >
            Newest
          </Typography>
        </Button>
      </Stack>
      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <MHidden width="mdDown">
          <Box
            sx={{ width: "30%" }}
            component={motion.div}
            animate={filterDrawer ? { x: 0 } : { x: -500, width: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <SearchesFilter />
          </Box>
        </MHidden>
        <Box
          component={motion.div}
          animate={!isMd && filterDrawer ? { width: "70%" } : { width: "100%" }}
        >
          <Paper elevation={6} sx={{ p: 2, width: "100%", minHeight: "100%" }}>
            <Stack spacing={2} sx={{ width: "100%" }}>
              {products.map((product, index) => (
                <ProductListCard
                  key={`product_list_card_${index}`}
                  product={product}
                />
              ))}
            </Stack>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default ProductList;
