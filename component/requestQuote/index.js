import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import RequestForm from "./RequestForm";

export default function RequestQuote() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        Request Quote
      </Button>
      <Dialog
        sx={{ backdropFilter: "blur(3px)" }}
        open={open}
        onClose={handleClose}
        maxWidth='lg'
      >
        <DialogTitle id='alert-dialog-title'>{"Request Quote"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <RequestForm />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
