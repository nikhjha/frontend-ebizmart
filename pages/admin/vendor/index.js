import Head from "next/head";
import DashboardLayout from "../../../component/dashboard";
import VendorPage from "../../../component/VendorPage";
import { user } from "../../../constant/constant";

export default function createVendor() {
  return (
    <div>
      <Head>
        <title>EbizMart - Vendor (Add New Vendor) </title>
      </Head>
      <DashboardLayout user={user}>
        <VendorPage />
      </DashboardLayout>
    </div>
  );
}
