import React, { useState } from "react";
import Iconify from "../Iconify";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "../../styles/CategoryPanel.module.scss";

import { baseURL, serverFetch } from "../../libs/axiosClient";

import {
  Card,
  CardHeader,
  Divider,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

const CustomButton = ({ children, StartIcon, ...props }) => {
  return (
    <Button
      component={motion.button}
      whileHover={{ scale: 1.03 }}
      {...props}
      sx={{
        color: "Black",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2,
        ":hover": { color: "primary.main" },
      }}
    >
      <Image
        src={`${baseURL}/${StartIcon}`}
        width={30}
        height={30}
        alt={"" + children}
      />
      <Typography
        variant='body2'
        sx={{
          fontSize: "13px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default function PopularCategories() {
  const [categories] = useState([
    { name: "Fruits", logo: "uploads/categories/1643869258461-fruits-100.png" },
    {
      name: "Vegetable",
      logo: "uploads/categories/1643869452230-vegetables-100.png",
    },
    { name: "Health", logo: "uploads/categories/1643871599230-health-100.png" },
    {
      name: "Stationary",
      logo: "uploads/categories/1643874015210-book-100.png",
    },
    {
      name: "Personal Care",
      logo: "uploads/categories/1643900250274-person-100.png",
    },
  ]);
  const router = useRouter();
  return (
    <Card>
      <CardHeader title='Popular Categories' />
      <div className={styles.category_selection}>
        <Box>
          <Stack sx={{ px: 4, py: 2 }} spacing={1.5}>
            {categories.map((category, ind) => {
              return (
                <CustomButton
                  key={`category_btn_${ind}`}
                  StartIcon={category.logo}
                >
                  {category.name}
                </CustomButton>
              );
            })}
          </Stack>
        </Box>
      </div>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          onClick={() => {
            router.push("/admin/categories");
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

export const getStaticProps = async () => {
  const res = await serverFetch().get("/categories/getActiveCategories");
  return {
    props: {
      categories: res.data.data.categories,
    },
  };
};
