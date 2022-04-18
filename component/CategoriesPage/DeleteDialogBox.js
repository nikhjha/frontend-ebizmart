import React, { useState } from "react"
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import getFetch from "../../libs/axiosClient"

export default function DeleteDialogBox({ id, setRows }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    const res = await getFetch().delete(`/categories/${id}`)
    console.log(res)
    handleClose()
    setRows((row) => [...row.filter((r) => r._id !== id)])
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteOutlinedIcon
          style={{
            color: "rgb(220, 50, 38)",
            cursor: "pointer",
          }}
        />
      </IconButton>
      <Dialog
        sx={{ backdropFilter: "blur(3px)" }}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Delete this Category?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you wish to delete this category.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>
            No
          </Button>
          <Button variant='contained' onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
