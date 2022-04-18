import { Container } from "@mui/material";
import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import VendorConfigPanel from "../../component/VendorConfigPanel";

const account = () => {
  return (
    <div>
      <Head>
        <title>EBizMart - Vendor Account</title>
      </Head>
      <DashboardLayout>
        <Container maxWidth="md">
          <VendorConfigPanel isPatch={true} />
        </Container>
      </DashboardLayout>
    </div>
  );
};

export default account;
