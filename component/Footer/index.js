import { Typography, Grid, Divider } from "@mui/material";
import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import styles from "../../styles/Footer.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.footer} style={{overflow : "hidden"}}>
      <div className={styles.footer_service}>
        <Typography variant="h5">Electronics :</Typography>
        <Typography variant="body2">
          if yourre lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          aif yourre lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laborid minim
          veniam, quis nostrud exercitation ullamco laboris
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <ShoppingCartCheckoutIcon className={styles.custom_svg} />
              </Grid>
              <Grid item xs={10}>
                <div className={styles.footer_service_details}>
                  <Typography variant="h4">Free Shipping</Typography>
                  <Typography variant="body2">on order over $100</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <ShoppingCartCheckoutIcon className={styles.custom_svg} />
              </Grid>
              <Grid item xs={10}>
                <div className={styles.footer_service_details}>
                  <Typography variant="h4">Free Shipping</Typography>
                  <Typography variant="body2">on order over $100</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <ShoppingCartCheckoutIcon className={styles.custom_svg} />
              </Grid>
              <Grid item xs={10}>
                <div className={styles.footer_service_details}>
                  <Typography variant="h4">Free Shipping</Typography>
                  <Typography variant="body2">on order over $100</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={styles.footer_service_category}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h6">Categories</Typography>
            <Typography variant="body1">Mobiles</Typography>
            <Typography variant="body1">Mobiles</Typography>
            <Typography variant="body1">Mobiles</Typography>
            <Typography variant="body1">Mobiles</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Quick Links</Typography>
            <Typography variant="body1">About Us</Typography>
            <Typography variant="body1">Contact Us</Typography>
            <Typography variant="body1">Help</Typography>
            <Typography variant="body1">Mobiles</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Get In Touch</Typography>
            <Typography variant="body1">Address</Typography>
            <Typography variant="body1">Phone no</Typography>
            <Typography variant="body1">Mobiles</Typography>
            <Typography variant="body1">Mobiles</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">Follow Us On</Typography>
            <div className={styles.footer_social_media}>
              <div className={styles.footer_media_link} style={{"--background-color": "red"}}>
                <GoogleIcon style={{fontSize: "1.2rem"}}/>
              </div>
              <div className={styles.footer_media_link} style={{"--background-color": "blue"}}>
                <FacebookIcon style={{fontSize: "1.2rem"}}/>
              </div>
              <div className={styles.footer_media_link} style={{"--background-color": "dodgerblue"}}>
                <TwitterIcon style={{fontSize: "1.2rem"}}/>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={styles.footer_service_lined}>
        <Typography variant="h6">Computers :</Typography>
        <div className={styles.footer_service_links}>
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
        </div>
        <Typography variant="h6">Computers :</Typography>
        <div className={styles.footer_service_links}>
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
        </div>
        <Typography variant="h6">Computers :</Typography>
        <div className={styles.footer_service_links}>
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2">Android Phones</Typography>
          <Divider orientation="vertical" flexItem />
        </div>
      </div>
      <div className={styles.footer_payment}>
        <Typography variant="h6">Payment Method</Typography>
        <div className={styles.footer_payment_logos}>
          <Image alt="" width="125px" height="50px" src="/images/payment.png" />
        </div>
      </div>
      <div className={styles.footer_copyright}>
        <Typography variant="body1">2021 All right reserverd</Typography>
      </div>
    </div>
  );
}
