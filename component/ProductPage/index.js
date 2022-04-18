import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  inputTypes,
  formContentType,
  requestType,
} from "../../constant/constant";
import InputHelper from "../utility/InputHelper";
import useForm from "../../hooks/useForm";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { AuthContext } from "../../context/AuthProvider";
import getFetch from "../../libs/axiosClient";
import ConfirmModal from "../utility/ConfirmModal";
import { user as userConst } from "../../constant/constant";

export default function ProductPage({ product, categories }) {
  const tmp_categories = !!categories ? categories.map((category) => {
    return { title: category.category.name, value: category.category.name };
  }) : [];
  const router = useRouter();
  const verified = useProtectedRoute(userConst.vendor);
  const inputs = [
    {
      inputName: "images",
      title: "Product Image",
      type: inputTypes.picturefeild,
      options: {
        label: "Add Photos",
        autofocus: true,
        deleteRoute: "/products/image",
      },
    },
    {
      inputName: "productName",
      title: "Product Name",
      type: inputTypes.textfeild,
      options: {
        required: true,
      },
    },
    {
      inputName: "brand",
      title: "Brand Name",
      type: inputTypes.textfeild,
    },
    {
      inputName: "category",
      title: "Category",
      type: inputTypes.select,
      options: {
        select_title: "Select Category",
        select_options: tmp_categories,
      },
    },
    {
      inputName: "mrp",
      title: "Price",
      type: inputTypes.numberfeild,
      options: {
        adornment: "₹",
        required: true,
      },
    },
    {
      inputName: "discountPrice",
      title: "Price after Discount",
      type: inputTypes.numberfeild,
      options: {
        adornment: "₹",
        required: true,
      },
    },
    {
      inputName: "quantity",
      title: "Quantity",
      type: inputTypes.numberfeild,
      options: {
        required: true,
        steps: true,
      },
    },
    {
      inputName: "nutritionalFacts",
      title: "Nutritional Facts",
      type: inputTypes.textBox,
    },
    {
      inputName: "howToUse",
      title: "Usage Instructions",
      type: inputTypes.textBox,
    },
    {
      inputName: "description",
      title: "Description",
      type: inputTypes.textBox,
    },
    {
      inputName: "otherProductInfo",
      nestedOption: [
        {
          inputName: "weight",
          title: "Weight",
          type: inputTypes.urlfeild,
        },
        {
          inputName: "flavour",
          title: "Flavour",
          type: inputTypes.urlfeild,
        },
        {
          inputName: "countryOfOrigin",
          title: "Country Of Origin",
          type: inputTypes.urlfeild,
        },
        {
          inputName: "manufacturer",
          title: "Manufacturer",
          type: inputTypes.urlfeild,
        },
        {
          inputName: "bestBefore",
          title: "Best Before",
          type: inputTypes.datefeild,
          options: {
            placeholder: "Best Before",
          },
        },
      ],
    },
  ];
  const [info, setInfo] = useState({});
  const { handleSubmission, previousData } = useForm({
    postTo: product ? `/products/${product._id}` : "/products",
    type: product ? requestType.patch : requestType.post,
    contentType: formContentType.formdata,
    initialValues: product ? product : {},
    validate: (data) => {
      console.log(data);
      if (
        data.productName === "" ||
        data.mrp === "" ||
        data.discountPrice === "" ||
        data.quantity === ""
      ) {
        setInfo({ msg: "Fields should not be empty!!", error: true });
        return { msg: "Fields should not be empty!!", error: true };
      }
      return { error: false };
    },
    error: (msg) => {
      console.log(msg);
      setInfo({ msg: "Fields should not be empty!!", error: true });
    },
    afterSubmission: (res) => {
      console.log(res);
      setInfo({ msg: "Products added!!", error: false });
      router.push("/vendor/products");
    },
  });
  const { user } = useContext(AuthContext);
  const deleteProduct = async () => {
    if (user) {
      const res = await getFetch().delete(`/products/${product._id}`);
      console.log(res);
      router.push("/vendor/products");
    }
  };
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <Box>
      {verified && (
        <Container maxWidth="md">
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h4">
                {product ? product.productName : "Add product :"}
              </Typography>
              {info?.msg && (
                <Alert severity={info.error ? "error" : "success"}>
                  {info.msg}
                </Alert>
              )}
              {product && (
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    onClick={() => {
                      router.push(`/product/${product._id}`);
                    }}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setConfirmDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                  <ConfirmModal
                    open={confirmDelete}
                    setOpen={setConfirmDelete}
                    title={`Delete ${product.productName}`}
                    content={`You are about to delete ${product.productName}. Are you sure about that ?`}
                    onConfirm={deleteProduct}
                  />
                </Stack>
              )}
              <Paper
                component="form"
                elevation={3}
                onSubmit={handleSubmission}
                noValidate
                sx={{ p: 2, pl: 0 }}
              >
                <Stack spacing={2}>
                  {inputs.map((input, index) => (
                    <InputHelper
                      key={`form-input-${index}`}
                      previousData={previousData}
                      title={input.title}
                      inputName={input.inputName}
                      index={index}
                      type={input.type}
                      options={input.options}
                      nestedOption={input.nestedOption}
                    />
                  ))}
                </Stack>
                <Button
                  variant="contained"
                  sx={{
                    position: "relative",
                    right: "-50%",
                    transform: "translateX(-50%)",
                    px: 8,
                    my: 5,
                  }}
                  type="submit"
                >
                  {product ? "Save" : "Add"}
                </Button>
              </Paper>
            </Stack>
          </Box>
        </Container>
      )}
    </Box>
  );
}
