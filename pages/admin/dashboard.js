import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import { user } from "../../constant/constant";
// import { Box, Grid, Container, Typography } from "@mui/material";

//import AdminBugReports from "../../component/AdminDashboard/AdminBugReports";
//import AdminItemOrders from "../../component/AdminDashboard/AdminItemOrders";
//import AdminNewUsers from "../../component/AdminDashboard/AdminNewUsers";
//import AdminWeeklySales from "../../component/AdminDashboard/AdminWeeklySales";
//import AdminNewsUpdate from "../../component/AdminDashboard/AdminNewsUpdate";
//import AdminOrderTimeline from "../../component/AdminDashboard/AdminOrderTimeline";
//import AdminSiteTraffic from "../../component/AdminDashboard/AdminSiteTraffic";
//import AdminWebsiteVisits from "../../component/AdminDashboard/AdminWebsiteVisits";
//import AdminCurrentVisits from "../../component/AdminDashboard/AdminCurrentVisits";
//import PopularCategories from "../../component/AdminDashboard/PopularCategories";
//import useProtectedRoute from "../../hooks/useProtectedRoute";

/*const AdminDashboard = () => {
  const verified = useProtectedRoute(user.admin);
  return (
    <Box>
      {verified && (
        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AdminWeeklySales />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AdminNewUsers />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AdminItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AdminBugReports />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AdminWebsiteVisits />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AdminCurrentVisits />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <AdminNewsUpdate />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AdminOrderTimeline />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AdminSiteTraffic />
            </Grid>

            <Grid item xs={12} md={6} lg={5}>
              <PopularCategories />
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};
*/
export default function dashboard() {
  return (
    <div>
      <Head>
        <title>EbizMart - Admin Dashboard</title>
      </Head>
      <DashboardLayout user={user.admin}>
        {/*<AdminDashboard />*/}
      </DashboardLayout>
    </div>
  );
}
