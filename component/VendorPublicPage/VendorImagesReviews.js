import React from "react";
import StyledPaper from "./StyledPaper";
import {
  Stack,
  Typography,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Image from "next/image";
import ReviewBoard from "../ReviewBoard";
import { grey } from "@mui/material/colors";
import { AuthContext } from "../../context/AuthProvider";
import getFetch, { baseURL } from "../../libs/axiosClient";

const ResponsiveImageList = ({ rowHeight, height, children }) => {
  const isLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <ImageList
      rowHeight={rowHeight}
      cols={isLg ? 4 : isMd ? 3 : isSm ? 2 : 1}
      sx={{ width: "100%", height: height }}
    >
      {children}
    </ImageList>
  );
};

function VendorImagesReviews({ vendor }) {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { images } = vendor;
  const [reviews, setReviews] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  React.useEffect(() => {
    const fetch = async () => {
      const res = await getFetch().get(`/reviews/receiver/${vendor._id}`);
      console.log(res.data.review);
      setReviews(
        res.data.review.map((review) => {
          return {
            ...review,
            firstName: "U",
            lastName: "R",
          };
        })
      );
    };
    if (user) {
      fetch();
    }
  }, [user, vendor]);

  return (
    <StyledPaper
      elevation={6}
      sx={{ my: 2, p: 2, height: "100%" }}
      id="images/reviews"
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="Vendor's details"
      >
        <Tab value="one" label="Images" />
        <Tab value="two" label="Reviews" />
      </Tabs>
      {value === "one" && (
        <Stack sx={{ p: 2, pt: 3 }} spacing={2}>
          <Typography variant="h4">Images</Typography>
          {images.length !== 0 && (
            <ResponsiveImageList rowHeight={160} height={640}>
              {images.map((image, index) => (
                <ImageListItem key={`image_no_${index}`}>
                  <Image
                    alt=""
                    src={`${baseURL}/${image}`}
                    width={160}
                    height={160}
                  />
                </ImageListItem>
              ))}
            </ResponsiveImageList>
          )}
          {images.length === 0 && (
            <Typography variant="subtitle1" color={grey["700"]}>
              Vendor does not have any images
            </Typography>
          )}
        </Stack>
      )}
      {value === "two" && (
        <ReviewBoard
          sx={{ p: 2, pt: 3 }}
          reviews={reviews}
          of={{ name: "VENDOR", id: vendor._id }}
        />
      )}
    </StyledPaper>
  );
}

export default VendorImagesReviews;
