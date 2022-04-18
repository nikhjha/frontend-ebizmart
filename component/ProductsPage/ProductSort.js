import { Icon } from "@iconify/react";
import { useState } from "react";
import chevronUpFill from "@iconify/icons-eva/chevron-up-fill";
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill";
// material
import { Menu, Button, MenuItem, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: "category", label: "Category" },
  { value: "Laz", label: "Name : A-Z" },
  { value: "Lza", label: "Name : Z-A" },
  { value: "priceDsc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
  { value: "DateDsc", label: "Date (Oldest to Newest) " },
  { value: "DateAsc", label: "Date (Newest to Oldest) " },
];

export default function ShopProductSort({ products, setProducts }) {
  const [open, setOpen] = useState(null);
  const [select, setSelect] = useState({ value: "feat", label: "Featured" });

  //  console.log(products.discountPrice);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  // console.log(...products,products.mrp);
  const handlesort = (option) => {
    setSelect(option);
    switch (option.value) {
      case "priceAsc":
        products.sort((a, b) => {
          return a.discountPrice - b.discountPrice;
        });
        // console.log(products);
        setProducts([...products]);
        break;
      case "priceDsc":
        products.sort((a, b) => {
          return b.discountPrice - a.discountPrice;
        });
        setProducts([...products]);
        break;
      case "DateAsc":
        products.sort((a, b) => {
          return (
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime()
          );
        });
        setProducts([...products]);
        break;
      case "DateDsc":
        products.sort((a, b) => {
          return (
            new Date(a.dateCreated).getTime() -
            new Date(b.dateCreated).getTime()
          );
        });
        // console.log(products);
        setProducts([...products]);

        break;
      case "Laz":
        products.sort((a, b) =>
          a.productName.localeCompare(b.productName, "es", {
            sensitivity: "base",
          })
        );
        setProducts([...products]);
        // console.log("Products updated", products);
        break;
      case "Lza":
        products.sort((a, b) =>
          b.productName.localeCompare(a.productName, "es", {
            sensitivity: "base",
          })
        );
        setProducts([...products]);
        // console.log("Products updated", products);
        break;
      case "category":
        products.sort((a, b) => {
          if (a.category && b.category)
            return a.category.localeCompare(b.category);
          else if (a.category) return a.category;
          else if (b.category) return b.category;
          else return 0;
        });
        setProducts([...products]);
        break;

      case "featured":
        products.sort((a, b) => {
          return (
            new Date(a.dateCreated).getTime() -
            new Date(b.dateCreated).getTime()
          );
        });
        // console.log(products);
        setProducts([...products]);
    } //end switc
    handleClose();
  };
  const handleClose = () => {
    setOpen(null);
  };
  // console.log(...products, products.mrp);

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          {select.label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === select.value}
            onClick={() => {
              handlesort(option);
            }}
            sx={{ typography: "body2" }}
          >
            {option.label === "Featured" ? "" : option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
