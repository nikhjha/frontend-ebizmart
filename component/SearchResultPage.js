import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import ProductList from "./ProductList";
import getFetch from "../libs/axiosClient";
import { UtilityContext } from "../context/UtilityProvider";

function SearchResultPage() {
  const router = useRouter();
  const [products, setProducts] = useState();
  const [q, setQ] = useState(router?.query.q);
  const { openLoading, closeLoading } = useContext(UtilityContext);
  useEffect(() => {
    const getProducts = async () => {
      openLoading();
      try {
        const fetch = getFetch();
        const productsRes = await fetch.get(`/products`);
        const products = [];
        const productsList = productsRes.data.data.products
          .filter((product) => !!product.product.vendorId)
          .slice(0, 15);
        for (let productObj of productsList) {
          const product = productObj.product;
          try {
            if (!product.vendorId) {
              continue;
            }
            console.log(product);
            const vendorRes = await fetch.get(`/vendors/${product.vendorId}`);
            products.push({ ...product, vendor: vendorRes.data.vendor });
          } catch (e) {
            console.log(e);
          }
        }
        console.log(products);
        setProducts(products);
      } catch (e) {
        console.log(e);
      }
      closeLoading();
    };
    setQ(router.query.q);
    getProducts();
  }, [router.query, openLoading, closeLoading]);

  return (
    <Box sx={{ p: 2, px: 3, overflowX: "hidden" }}>
      {products && products.length > 0 && (
        <>
          <Typography variant="h3" color={grey["800"]}>
            Total results for &quot;{q ? q : ""}&quot; is {products.length}
          </Typography>
          <ProductList products={products} />
        </>
      )}
      {products && products.length === 0 && (
        <Box>
          <Typography variant="h3" color={grey["800"]}>
            Sorry, we couldn&apos;t find any results for &quot;{q ? q : ""}
            &quot;
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default SearchResultPage;
