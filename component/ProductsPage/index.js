import { useState, useEffect, useContext } from "react";
// material
import { Box, Button, Container, Stack, Typography } from "@mui/material";
// components
import ProductSort from "./ProductSort";
import ProductList from "./ProductList";
import ProductFilterSidebar from "./ProductFilterSidebar";
//
import { useRouter } from "next/router";
import getFetch from "../../libs/axiosClient";
import { AuthContext } from "../../context/AuthProvider";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { user as userConst } from "../../constant/constant";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const verified = useProtectedRoute(userConst.vendor);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientFetch = getFetch();
        const res = await clientFetch.get(`/products/vendor/${user.id}`);
        const newProducts = res.data.data.products.map(
          ({ product, request }) => {
            return { ...product, request };
          }
        );
        console.log(newProducts);
        setProducts(newProducts);
      } catch (e) {
        console.log(e, e?.response);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);
  const router = useRouter();
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {};

  return (
    <Box>
      {verified && (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Products
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Button
              sx={{ mr: "auto" }}
              variant="contained"
              onClick={() => {
                router.push("/vendor/product");
              }}
            >
              Add Product
            </Button>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ProductFilterSidebar
                isOpenFilter={openFilter}
                onResetFilter={handleResetFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
              />
              <ProductSort products={products} setProducts={setProducts} />
            </Stack>
          </Stack>

          <ProductList products={products} />
        </Container>
      )}
    </Box>
  );
}
