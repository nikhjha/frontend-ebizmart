import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/CategoryPanel.module.scss";
import { fCurrency } from "../utility/formatNumber";
import getFetch, { baseURL } from "../../libs/axiosClient";
import { useRouter } from "next/router";

const ProductCard = ({
  name,
  img,
  price,
  discountPrice,
  id,
  quantity,
  rating,
}) => {
  const router = useRouter();
  return (
    <Card>
      <div className={styles.category_cart_card_content}>
        <CardMedia
          component="img"
          src={typeof img === "string" ? `${baseURL}/${img}` : ""}
          height={250}
        />
        <div style={{ flexGrow: "1" }}></div>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.2,
            alignItems: "center",
            p: 0,
            px: 2,
          }}
        >
          <Typography align="center" variant="h4">
            {name}
          </Typography>
          <Typography align="center" variant="h6">
            {fCurrency(discountPrice ? discountPrice : 0)}
            &nbsp;
            <Typography variantMapping={{ body2: "del" }} variant="body2">
              {fCurrency(price ? price : 0)}
            </Typography>
          </Typography>
          <Typography align="center" variant="body1">
            {`Only ${quantity ? quantity : 0} available`}
          </Typography>
          <Rating
            value={rating ? rating : 0}
            precision={0.5}
            readOnly
            sx={{ color: "primary.main" }}
          />
          <Button
            variant="contained"
            className={styles.category_cart_btn}
            onClick={() => {
              router.push(`/product/${id}`);
            }}
          >
            See More
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

export default function CategoryCart() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getFetch().get("/products");
      setProducts(
        res.data.data.products
          .filter(
            ({ product }) =>
              !!product.images[0] &&
              !!product.productName &&
              product.productName !== ""
          )
          .slice(0, 12)
          .map(({ product }) => product)
      );
    };
    fetch();
  }, []);
  console.log(products);
  return (
    <div className={styles.category_cart}>
      <Grid container spacing={2}>
        {products.slice(0, 6).map((product, index) => (
          <Grid key={`category_cart_card_${index}`} item xs={12} md={6} lg={4}>
            <div className={styles.category_cart_card}>
              <ProductCard
                name={product.productName}
                img={product.images[0]}
                price={product.mrp}
                discountPrice={product.discountPrice}
                id={product._id}
                quantity={product.quantity}
                rating={product.rating}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <div className={styles.category_cart_promotion}>
        <Image alt="" layout="fill" src="/images/offer.png" />
      </div>
      <Grid container spacing={2}>
        {products.slice(6, 12).map((product, index) => (
          <Grid
            key={`category_cart_card_trending_${index}`}
            item
            xs={12}
            md={6}
            lg={4}
          >
            <div className={styles.category_cart_card}>
              <ProductCard
                name={product.productName}
                img={product.images[0]}
                price={product.mrp}
                discountPrice={product.discountPrice}
                id={product._id}
                quantity={product.quantity}
                rating={product.rating}
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <div className={styles.category_cart_promotion}>
        <Image alt="" layout="fill" quality={100} src="/images/offer.png" />
      </div>
    </div>
  );
}
