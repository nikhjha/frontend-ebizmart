import React, { useContext, useState } from "react";
import StyledPaper from "./VendorPublicPage/StyledPaper";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Avatar,
  Rating,
  TextField,
  Paper,
} from "@mui/material";
import { baseURL } from "../libs/axiosClient";
import { motion } from "framer-motion";
import getFetch from "../libs/axiosClient";
import { AuthContext } from "../context/AuthProvider";

const ReviewCard = ({ review }) => {
  return (
    <StyledPaper
      elevation={4}
      sx={{ width: "900px", maxWidth: "100%", p: 2, border: "none" }}
    >
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={`${baseURL}/${review.icon}`}
            sx={{ width: 56, height: 56 }}
            alt={`${review.firstName} ${review.lastName}`}
          >
            {review.icon ? "" : `${review.firstName[0]}${review.lastName[0]}`}
          </Avatar>
        </Grid>
        <Grid item xs={12} md={10}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">{`${review.firstName} ${review.lastName}`}</Typography>
            <Rating
              value={review.rating}
              readOnly
              precision={0.5}
              sx={{ color: "primary.main" }}
            />
            <Typography variant="body1" color="GrayText">
              {review.description}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

const WriteReviewPanel = ({ open, of, set, setReviews }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = {
      rating,
      title: `Review for ${of.id}`,
      description: review,
      userId: user.id,
      reviewFor: of.name,
      receiverId: of.id,
    };
    console.log(value);
    const res = await getFetch().post("/reviews", value);
    console.log(res);
    setReviews((review) => [
      { ...value, firstName: "U", lastName: "R" },
      ...review,
    ]);
    set(false);
  };
  return (
    <Paper
      sx={{
        width: "600px",
        maxWidth: "100%",
        p: 2,
        border: "none",
        boxShadow: 4,
        my: 1,
      }}
      component={motion.div}
      animate={open ? { y: 0, height : "100%" } : { y: -500, height: 0, opacity: 0 }}
      transition={{ type: "spring", bounce: 0.3 }}
    >
      <Grid container spacing={1}>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 56, height: 56 }}>US</Avatar>
        </Grid>
        <Grid item xs={12} md={10}>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <Typography variant="subtitle1" color={"primary.main"}>
              Users Name
            </Typography>
            <Rating
              precision={0.5}
              sx={{ color: "primary.main" }}
              value={rating}
              onChange={(e) => {
                setRating(parseFloat(e.target.value));
              }}
            />
            <TextField
              label={"Review"}
              multiline
              rows={5}
              value={review}
              error={review.length === 300}
              helperText={
                review.length < 300
                  ? `${review.length}/300`
                  : "Review cannot be longer than 300 characters"
              }
              onChange={(e) => {
                setReview(e.target.value.slice(0, 300));
              }}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

function ReviewBoard({ sx, reviews, of }) {
  const [openWriteReview, setOpenWriteReview] = useState(false);
  const [writenReview, setWritenReview] = useState([]);
  return (
    <Box sx={{ ...sx, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Reviews</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setOpenWriteReview((value) => !value);
          }}
        >
          {openWriteReview ? "Cancel" : "Write a Review"}
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          overflow: "hidden",
        }}
      >
        <WriteReviewPanel
          open={openWriteReview}
          of={of}
          set={setOpenWriteReview}
          setReviews={setWritenReview}
        />
        {[...writenReview, ...reviews].map((review, index) => (
          <ReviewCard key={`review_${index}`} review={review} />
        ))}
      </Box>
    </Box>
  );
}

export default ReviewBoard;
