import React, { useState } from "react";
import { Typography, Stack, Container, Button, Box } from "@mui/material";
//components
import AllCategories from "./AllCategories";
import CategoryFilter from "./CategoryFilter";
import CategorySort from "./CategorySort";
//
import { useRouter } from "next/router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { user as userConst } from "../../constant/constant";

export default function CategoriesPage({ categories }) {
  const [categoriess, setCategoriess] = useState([...categories]);
  const verified = useProtectedRoute(userConst.admin);
  const router = useRouter();
  return (
    <Box>
      {verified && (
        <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Categories
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
                router.push("/admin/category");
              }}
            >
              Add Category
            </Button>
            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <CategoryFilter />
              <CategorySort
                categoriess={categoriess}
                setCategoriess={setCategoriess}
              />
            </Stack>
          </Stack>
          <AllCategories rows={categoriess} setRows={setCategoriess} />
        </Container>
      )}
    </Box>
  );
}
