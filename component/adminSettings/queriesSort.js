import { Icon } from "@iconify/react";
import { useState } from "react";
import chevronUpFill from "@iconify/icons-eva/chevron-up-fill";
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill";
// material
import { Menu, Button, MenuItem, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: "Laz", label: "Name : A-Z" },
  { value: "Lza", label: "Name : Z-A" },
  // { value: "rating", label: "Rating" },
  { value: "DateDsc", label: "Date (Oldest to Newest) " },
  { value: "DateAsc", label: "Date (Newest to Oldest) " },
];

export default function ShopProductSort({ queries, setQueries }) {
  const [open, setOpen] = useState(null);
  const [select, setSelect] = useState({ value: "feat", label: "Featured" });

   console.log(queries);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handlesort = (option) => {
    setSelect(option);
    switch (option.value) {
   
      case "DateAsc":
        queries.sort((a, b) => {
          return (
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime()
          );
        });
        setQueries([...queries]);
        break;
      case "DateDsc":
        queries.sort((a, b) => {
          return (
            new Date(a.dateCreated).getTime() -
            new Date(b.dateCreated).getTime()
          );
        });
        setQueries([...queries]);
        break;
        case "rating":
          queries.sort((a,b)=>{
              return (
              b.rating-a.rating)
          })
          setQueries([...queries]);
          break;
      case "Laz":
        queries.sort((a, b) =>
          a.description.localeCompare(b.description, "es", {
            sensitivity: "base",
          })
        );
        setQueries([...queries]);
        break;
      case "Lza":
        queries.sort((a, b) =>
          b.description.localeCompare(a.description, "es", {
            sensitivity: "base",
          })
        );
        setQueries([...queries]);
        break;
     
    } //end switc
    handleClose();
  };
  const handleClose = () => {
    setOpen(null);
  };

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
