import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import VendorsPage from "../../component/VendorsPage";
import { user } from "../../constant/constant";

export default function vendors({}) {
  return (
    <div>
      <Head>
        <title>EbizMart - Vendors</title>
      </Head>
      <DashboardLayout user={ user.admin }>
        <VendorsPage />
      </DashboardLayout>
    </div>
  );
}
