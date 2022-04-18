import React, { useContext } from "react";
import { Typography, Button, Paper, Stack, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { motion } from "framer-motion";
import styles from "../../styles/CategoryPanel.module.scss";
import { GlobalStateContext } from "../../context/GlobalStateProvider";
import { baseURL } from "../../libs/axiosClient";
import Image from "next/image";
import { useRouter } from "next/router";
import { convertToSlug } from "../utility/slug";

const CustomButton = ({ children, StartIcon, to, ...props }) => {
  const router = useRouter();
  return (
    <Button
      component={motion.button}
      whileHover={{ scale: 1.1 }}
      {...props}
      sx={{
        color: "GrayText",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2,
        ":hover": { color: "primary.main" },
      }}
      onClick={() => {
        router.push(to);
      }}
    >
      <Image
        src={`${baseURL}/${StartIcon}`}
        width={20}
        height={20}
        alt={"" + children}
      />
      <Typography
        variant="body2"
        sx={{
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

export default function CategorySelection() {
  const { categories } = useContext(GlobalStateContext);
  return (
    <div className={styles.category_selection}>
      <Paper elevation={6} sx={{ mb: 2, p: 2 }}>
        <Typography variant="subtitle1" sx={{ my: 2 }} color="GrayText">
          Categories
        </Typography>
        <Stack spacing={1}>
          {categories.map((category, ind) => {
            return (
              <CustomButton
                key={`category_btn_${ind}`}
                StartIcon={category.logo}
                to={"/category/" + convertToSlug(category.name)}
              >
                {category.name}
              </CustomButton>
            );
          })}
        </Stack>
      </Paper>
      <Box sx={{ width: "250px" }}>
        <Typography variant="h6" variantMapping={{ h6: "h1" }}>
          Keep in touch
        </Typography>
        <div className={styles.category_panel_links}>
          <GoogleIcon />
          <FacebookIcon />
          <TwitterIcon />
        </div>
      </Box>
    </div>
  );
}
