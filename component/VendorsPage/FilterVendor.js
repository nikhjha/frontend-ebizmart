import React from 'react'
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {Stack,Typography,IconButton,Button} from '@mui/material'
import closeFill from "@iconify/icons-eva/close-fill";
import roundClearAll from "@iconify/icons-ic/round-clear-all";
import roundFilterList from "@iconify/icons-ic/round-filter-list";

const FilterVendor = () => {


    const onCloseFilter=()=>{}
    const onOpenFilter=()=>{}
  return (
    <div>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>
      
    </div>
  );
}

export default FilterVendor;
