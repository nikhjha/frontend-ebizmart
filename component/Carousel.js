//Importing material components
import { Box } from "@mui/material";

//Importing material icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState } from "react";

//Importing styles from carousel.module.css
import styles from "../styles/Carousel.module.scss";

export default function Carousel({ children }) {
  //state to control the carousel frame to display
  const [carouselTraversel, setCarouselTraversal] = useState(0);

  //converting child components into array of components
  const childrenArray = React.Children.toArray(children);

  //storing count of childrens
  const childrenCount = childrenArray.length;

  //Function to define it's left traversal
  const travelLeft = () => {
    if (carouselTraversel !== 0) {
      setCarouselTraversal((carouselTraversel) => carouselTraversel + 100);
    }
  };

  //Function to define it's right traversal
  const travelRight = () => {
    if (carouselTraversel !== (childrenCount - 1) * -100) {
      setCarouselTraversal((carouselTraversel) => carouselTraversel - 100);
    }
  };

  return (
    <div className={styles.carousel}>
      {/* Render all childrens  */}
      {childrenArray.map((child, index) => (
        <div
          key={`carousel_child_${index}`}
          style={{ transform: `translateX(${carouselTraversel}%)` }}
        >
          {child}
        </div>
      ))}
      <Box className={styles.carousel_btn_left} onClick={travelLeft}>
        <ArrowBackIosIcon />
      </Box>
      <Box onClick={travelRight} className={styles.carousel_btn_right}>
        <ArrowForwardIosIcon />
      </Box>
      <Box className={styles.carousel_dots}>
        {childrenArray.map((_, index) => (
          <Box
            key={`carousel_dot_${index}`}
            onClick={() => {
              setCarouselTraversal(index * -100);
            }}
            sx={{cursor : "pointer"}}
            style={
              index === -1 * Math.round(carouselTraversel / 100)
                ? { backgroundColor: "rgb(100,100,100)" }
                : {}
            }
          />
        ))}
      </Box>
    </div>
  );
}
