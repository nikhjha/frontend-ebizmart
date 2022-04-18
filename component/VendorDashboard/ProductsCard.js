import PropTypes from "prop-types";
// material
import { Box, Card, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../utility/formatNumber";
//
import Label from "../Label";
import Image from "next/image";
import { useRouter } from "next/router";
import { baseURL } from "../../libs/axiosClient";
import { motion } from "framer-motion";
import { serverFetch } from "../../libs/axiosClient";

// ----------------------------------------------------------------------

const ProductImgStyle = styled(Box)({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ProductsCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductsCard({ product, to, scrollbarRef }) {
  const { productName, images, mrp, status, discountPrice } = product;
  const router = useRouter();
  return (
    <Card
      sx={{
        cursor: "pointer",
        position: "relative",
        transformOrigin: "0% 50%",
        width: 200,
        height: 300,
      }}
      onClick={() => {
        router.push(to);
      }}
      component={motion.div}
      initial={{ scale: 1.2, rotateY: -45 }}
      whileInView={{ scale: 1, rotateY: 0 }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "pink",
        zIndex: "50",
        boxShadow: "0rem 0rem 1rem 0rem pink",
      }}
      viewport={{ root: scrollbarRef, margin: "-50px" }}
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
        <Typography variant='subtitle2' noWrap>
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
      </Stack>
    </Card>
  );
}
