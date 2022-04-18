import PropTypes from "prop-types";
// material
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../utility/formatNumber";
//
import Label from "../Label";
import Image from "next/image";
import { useRouter } from "next/router";
import { baseURL } from "../../libs/axiosClient";

// ----------------------------------------------------------------------

const ProductImgStyle = styled(Box)({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product, to }) {
  const { productName, images, mrp, status, discountPrice, quantity } = product;
  const router = useRouter();
  return (
    <Card
      sx={{ cursor: "pointer", ":hover": { border: "0.5rem solid pink" } }}
      onClick={() => {
        router.push(to);
      }}
    >
      <Box sx={{ pt: "100%", position: "relative" }}>
        {status && (
          <Label
            variant='filled'
            color={(status === "sale" && "error") || "info"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle>
          <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
            {images[0] && (
              <Image
                alt={productName}
                src={`${baseURL}/${images[0]}`}
                layout='fill'
              />
            )}
          </Box>
        </ProductImgStyle>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant='subtitle2' noWrap color='primary.main'>
          {productName}
        </Typography>

        <Stack direction='row' alignItems='center' justifyContent='flex-end'>
          <Typography variant='subtitle1'>
            <Typography
              component='span'
              variant='body1'
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
        </Stack>
        <Typography variant='subtitle1' sx={{ my: 2, textAlign: "end" }}>
          {quantity} in stock
        </Typography>
      </Stack>
    </Card>
  );
}
