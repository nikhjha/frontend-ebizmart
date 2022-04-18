import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import ProductList from "../ProductList";

function CategoryPublicPage({products}) {
  const router = useRouter();
  const [q, setQ] = useState(router?.query.q);
  useEffect(() => {
    setQ(router.query.q);
  }, [router.query]);

  return (
    <Box sx={{ p: 2, px: 3, overflowX: "hidden" }}>
      {products && products.length > 0 && (
        <>
          <Typography variant="h3" color={grey["800"]}>
            Total results for &quot; {router.query.id} {" "}
            &quot; {q ? " with search of " + q : ""} is {products.length}
          </Typography>
          <ProductList products={products} />
        </>
      )}
      {products && products.length === 0 && (
        <Box>
          <Typography variant="h3" color={grey["800"]}>
            Sorry, we couldn&apos;t find any products for &quot;
            {q ? q : router.query.id}
            &quot;
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default CategoryPublicPage;
