import { useState, useEffect, useContext } from "react";
// material
import { Box, Button, Container, Stack, Typography } from "@mui/material";
// components
// import ProductSort from "./ProductSort";
// import ProductList from "./ProductList";
// import ProductFilterSidebar from "./ProductFilterSidebar";
import AllVendorCards from "./AllVendorCards";
import FilterVendor from "./FilterVendor";
import VendorSort from "./VendorSort";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthProvider";
import getFetch from "../../libs/axiosClient";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { user as userConst } from "../../constant/constant";

export default function ProductsPage() {
  const [vendors, setVendors] = useState([]);
  const router = useRouter();
  const verified = useProtectedRoute(userConst.admin);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getFetch().get("/vendors");
      console.log(res);
      // console.log([...res.data.data.vendors.map(({vendor}) => vendor)])
      setVendors([...res.data.data.vendors.map(({ vendor }) => vendor)]);
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  const isOpenFilter = () => {};
  const onResetFilter = () => {};
  const onOpenFilter = () => {};
  const onCloseFilter = () => {};

  return (
    <Box>
      {verified && (
        <Container>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Vendors
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap-reverse"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 5 }}
          >
            <Button
              sx={{ mr: "auto", my: "1.3rem" }}
              variant="contained"
              onClick={() => {
                router.push("/admin/vendor");
              }}
            >
              Add Vendor
            </Button>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 0 }}>
              <FilterVendor
              // isOpenFilter={openFilter}
              // onResetFilter={handleResetFilter}
              // onOpenFilter={handleOpenFilter}
              // onCloseFilter={handleCloseFilter}
              />
              <VendorSort vendors={vendors} setVendors={setVendors} />
            </Stack>
          </Stack>
          <AllVendorCards vendors={vendors} />
        </Container>
      )}
    </Box>
  );
}
