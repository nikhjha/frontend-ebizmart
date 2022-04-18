import React from "react"
import { Button } from "@mui/material"
import { Icon } from "@iconify/react"
import roundFilterList from "@iconify/icons-ic/round-filter-list"

export default function CategoryFilter() {
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
      >
        Filters&nbsp;
      </Button>
    </>
  )
}
