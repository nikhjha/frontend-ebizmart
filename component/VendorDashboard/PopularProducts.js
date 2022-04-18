import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, CardHeader, Box, Button, Divider, Stack } from "@mui/material";
import ProductsCard from "./ProductsCard";
import Iconify from "../Iconify";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";
import getFetch from "../../libs/axiosClient";

export default function PopularProducts() {
  const router = useRouter();
  const scrollbarRef = useRef();
  const { user } = useContext(AuthContext);
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await getFetch().get(`/products/trending/vendor/${user.id}`);
      console.log(res);
      setPopularProducts(res.data.data.products.map(({ product }) => product));
    };
    if (user) {
      fetch();
    }
  }, [user]);
  return (
    <Card>
      <CardHeader title='Popular Products' />
      <Box sx={{ px: 3, py: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          ref={scrollbarRef}
          sx={{
            p: 4,
            px: 2,
            width: "100%",
            overflow: "hidden",
            overflowX: "scroll",
            borderRadius: "1.2rem",
            "::-webkit-scrollbar": {
              height: "1rem",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              border: "2px solid white",
              borderRadius: "0.5rem",
            },
            perspective: "200px",
          }}
        >
          {popularProducts.map((content, index) => (
            <Box width={240} key={`popular_products_${index}`}>
              <ProductsCard
                product={content}
                to={`/product/${content._id}`}
                scrollbarRef={scrollbarRef}
              />
            </Box>
          ))}
        </Stack>
      </Box>
      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          onClick={() => {
            router.push("/vendor/products");
          }}
          size='small'
          color='inherit'
          endIcon={<Iconify icon='eva:arrow-ios-forward-fill' />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
