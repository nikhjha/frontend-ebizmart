import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DialogActions, Typography } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import CommentIcon from "@mui/icons-material/Comment";
import Slide from "@mui/material/Slide";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../../context/AuthProvider";
import getFetch from "../../libs/axiosClient";
import { UserDataContext } from "../../context/UserDataProvider";
import { useRouter } from "next/router";
import { user as userConst } from "../../constant/constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ResponsiveDialog() {
  const [review, setReview] = React.useState({ subject: "", description: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = React.useContext(AuthContext);
  const { data } = React.useContext(UserDataContext);
  const router = useRouter();

  // ------------------------------------------------------------------------------------------------------------------------------------
  const handleClickOpen = () => {
    if (user && user.role === userConst.users && data && data.firstName) {
      setOpen(true);
      return;
    }
    router.push("/user/login");
  };
  const handleClose = () => {
    setOpen(false);
    setReview({ subject: "", description: "" });
  };

  //  -------------------------------------------------------------------------------------------------------------------------------------------

  const handleChange = (e) => {
    if (e.target.name === "subject") {
      const newValue = e.target.value.trim();
      console.log(newValue);
      if (e.target.value === null || e.target.value.trim() === "") {
        setError(true);
      } else {
        setError(false);
      }
    }

    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review.subject.length === 0 || review.subject.trim() === "") {
      setError(true);
    } else {
      setLoading(true);
      const value = {
        title: review.subject,
        description: review.description,
        userId: user.id,
      };
      const res = await getFetch().post("/reviews", value);
      console.log(value, res);
      setLoading(false);
      handleClose();
    }
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{ position: "fixed", bottom: "1rem", left: "1.5rem" }}
      >
        <CommentIcon />
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ backdropFilter: "blur(5px)" }}
      >
        <DialogTitle id="responsive-dialog-title" sx={{ my: 2, mt: 1 }}>
          {"Raise a Complaint"}
        </DialogTitle>
        {/* --------------Text fields started---------------------------------------------------------         */}
        <DialogContent>
          <TextField
            id="outlined-required"
            label="Subject"
            name="subject"
            onChange={handleChange}
            value={review.subject}
            error={error}
            helperText={error ? "Subject is required" : ""}
            fullWidth
            sx={{ my: 3.1, mt: 2 }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            name="description"
            inputProps={{ maxLength: 301 }}
            onChange={handleChange}
            value={review.description}
            rows={5}
            fullWidth
            sx={{ my: 2.1, mb: 1 }}
          />
          {/* ----------------------Functionality for words less than 300----------------------------------------   */}
          {review.description.length < 301 ? (
            <DialogContentText
              sx={{ position: "absolute", right: "2rem", my: 0 }}
            >
              {review.description.length}
              /300
            </DialogContentText>
          ) : (
            <Typography color="red" variant="subtitle2" sx={{ my: 1, mx: 1 }}>
              Description cannot be greater than 300 letter
            </Typography>
          )}
        </DialogContent>
        {/* ------------------------------------Button Control start------------------------------------------------------------------ */}
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            autoFocus
            sx={{ right: "1.2rem", my: 2, mt: 3 }}
          >
            Cancel
          </Button>
          {/* ------------------Cancel Button complete------------------------------------------------------------*/}

          {/*---------------Functionality for hiding button when words are greater than 300---------------------------------------------------------- */}

          {review.description.split(" ").filter((st) => st.length !== 0)
            .length <= 300 ? (
            <LoadingButton
              size="medium"
              type="submit"
              variant="contained"
              loading={loading}
              onClick={handleSubmit}
              sx={{ right: "1.2rem", my: 2, mt: 3 }}
            >
              Submit
            </LoadingButton>
          ) : (
            <LoadingButton
              type="submit"
              size="medium"
              disabled
              variant="contained"
              sx={{ right: "1.2rem", my: 2 }}
            >
              Submit
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
