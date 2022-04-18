import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
// import { Box, Grid, Container, Typography } from "@mui/material";
/*
import BugReports from "../../component/VendorDashboard/BugReports";
import ItemOrders from "../../component/VendorDashboard/ItemOrders";
import NewUsers from "../../component/VendorDashboard/NewUsers";
import WeeklySales from "../../component/VendorDashboard/WeeklySales";
import NewsUpdate from "../../component/VendorDashboard/NewsUpdate";
import OrderTimeline from "../../component/VendorDashboard/OrderTimeline";
import SiteTraffic from "../../component/VendorDashboard/SiteTraffic";
import WebsiteVisits from "../../component/VendorDashboard/WebsiteVisits";
import CurrentVisits from "../../component/VendorDashboard/CurrentVisits";
import PopularProducts from "../../component/VendorDashboard/PopularProducts";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { user } from "../../constant/constant";

const VendorDashboard = () => {
  const verified = useProtectedRoute(user.vendor);
  return (
    <Box>
      {verified && (
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <WeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <NewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <BugReports />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <WebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <CurrentVisits />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <NewsUpdate />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <OrderTimeline />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <SiteTraffic />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <PopularProducts />
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};*/

export default function dashboard() {
  return (
    <div>
      <Head>
        <title>EbizMart - Vendor Dashboard</title>
      </Head>
      <DashboardLayout>{/*<VendorDashboard />*/}</DashboardLayout>
    </div>
  );
}
