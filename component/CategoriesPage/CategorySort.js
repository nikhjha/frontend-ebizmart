import React,{useState} from "react"
import { Button, Typography,Menu,MenuItem } from "@mui/material"
import { Icon } from "@iconify/react"
import chevronDownFill from "@iconify/icons-eva/chevron-down-fill"

import chevronUpFill from "@iconify/icons-eva/chevron-up-fill";



const SORT_BY_OPTIONS = [
  { value: "Laz", label: "Name : A-Z" },
  { value: "Lza", label: "Name : Z-A" },
  { value: "active", label: "Availablity" },
];

export default function CategorySort({categoriess,setCategoriess}) {
  const [select, setSelect] = useState({ value: "feat", label: "Featured" });
  const [open, setOpen] = useState(null);

  console.log(categoriess);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };

  const handlesort = (option) => {
    setSelect(option);
    switch (option.value) {
      case "active":
        categoriess.sort((a,b)=>{
        const u= a.isActive ? 1:0 ;
        const v=b.isActive ? 1:0;
            return v-u
        })
        setCategoriess([...categoriess]);

        break;
      case "DateDsc":
        break;
      case "Lza":
        categoriess.sort((a, b) => {
          console.log(a.name);
          if (!a.name && !b.name) {
            return 0;
          }
          if (!a.name) return b.name;
          if (!b.name) return a.name;
          return b.name.localeCompare(a.name, "es", {
            sensitivity: "base",
          });
        });
        setCategoriess([...categoriess]);
        break;
      case "Laz":
        categoriess.sort((a, b) => {
          console.log(a.name)
          if (!a.name && !b.name) {
            return 0;
          }
          if (!a.name) return b.name;
          if (!b.name) return a.name;
          return a.name.localeCompare(b.name, "es", {
            sensitivity: "base",
          });
        });
        setCategoriess([...categoriess]);
        break;
      
    } //end switc
    handleClose();
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
            {option.label === "Featured" ? null : option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
