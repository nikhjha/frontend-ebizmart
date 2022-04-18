import { Button, Menu } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import React from "react";

export default function CustomizedSelect({
  id,
  children,
  className,
  dropDown
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const childrens = React.Children.toArray(children);
  const MenuItems = childrens.filter((child) =>  child.type !== "label");
  const labelItem = childrens.filter((child) =>  child.type === "label")[0];

  return (
    <>
      <Button
        id={`custom_select_${id}_button`}
        className={className}
        aria-controls={open ? `custom_select_${id}_menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {labelItem.props.children}
       {dropDown && open ? <ArrowDropUpIcon /> : dropDown && !open ? <ArrowDropDownIcon /> : null} 
      </Button>
      <Menu
        id={`custom_select_${id}_menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `custom_select_${id}_menu`,
        }}
      >
        {MenuItems.map((item) => item)}
      </Menu>
    </>
  );
}
