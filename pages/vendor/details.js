import { Container } from "@mui/material";
import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import VendorConfigPanel from "../../component/VendorConfigPanel";

const details = () => {
  return (
    <div >
      <Head>
        <title>EBizMart - vendor config</title>
      </Head>
      <DashboardLayout>
      <Container maxWidth="md">
        <VendorConfigPanel />
      </Container></DashboardLayout>
    </div>
  );
};

export default details;
