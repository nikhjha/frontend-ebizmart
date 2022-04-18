import { Icon } from "@iconify/react";
import { useState } from "react";
import chevronUpFill from "@iconify/icons-eva/chevron-up-fill";
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill";
// material
import { Menu, Button, MenuItem, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: "Laz", label: "Vendor Name : A-Z" },
  { value: "Lza", label: "Vendor Name : Z-A" },
  { value: "Caz", label: "Company Name : A-Z" },
  { value: "Cza", label: "Company Name : Z-A" },
  { value: "Location", label: "Location : A-Z" },
  { value: "DateDsc", label: "Date (Oldest to Newest) " },
  { value: "DateAsc", label: "Date (Newest to Oldest) " },
];

export default function ShopProductSort({ vendors, setVendors }) {
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
      case "DateAsc":
        break;
      case "DateDsc":
        break;
      case "Laz":
        vendors.sort((a, b) => {
          if (!a.firstName && !b.firstName) {
            return 0;
          }
          if (!a.firstName) return b.firstName;
          if (!b.firstName) return a.firstName;
          return a.firstName.localeCompare(b.firstName, "es", {
            sensitivity: "base",
          });
        });
        setVendors([...vendors]);
        // console.log("Products updated", products);
        break;
      case "Lza":
        vendors.sort((a, b) => {
          if (!a.firstName && !b.firstName) {
            return 0;
          }
          if (!a.firstName) return b.firstName;
          if (!b.firstName) return a.firstName;
          return b.firstName.localeCompare(a.firstName, "es", {
            sensitivity: "base",
          });
        });
        setVendors([...vendors]);
        // console.log("Products updated", products);
        break;
      case "Cza":
        vendors.sort((a, b) => {
          if (!a.companyName && !b.companyName) {
            return 0;
          }
          if (!a.companyName) return b.companyName;
          if (!b.companyName) return a.companyName;
          return b.companyName.localeCompare(a.companyName, "es", {
            sensitivity: "base",
          });
        });
        setVendors([...vendors]);
        // console.log("Products updated", products);
        break;
      case "Caz":
        vendors.sort((a, b) => {
          if (!a.companyName && !b.companyName) {
            return 0;
          }
          if (!a.companyName) return b.companyName;
          if (!b.companyName) return a.companyName;
          return a.companyName.localeCompare(b.companyName, "es", {
            sensitivity: "base",
          });
        });
        setVendors([...vendors]);
        // console.log("Products updated", products);
        break;

      case "Location":
        vendors.sort((a, b) => {
          let x, y;
          if (!a.city && !b.city) {
            x = "";
            y = "";
          } else if (!a.city) {
            x = "";
            y = b.city;
          } else if (!b.city) {
            x = a.city;
            y = "";
          } else {
            x = a.city;
            y = b.city;
          }
          return x.localeCompare(y, "es", {
            sensitivity: "base",
          });
        });
        setVendors([...vendors]);
    } //end switc
    handleClose();
  };
  const handleClose = () => {
    setOpen(null);
  };
  console.log(vendors);

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
            {option.label === "Featured" ? null : option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
