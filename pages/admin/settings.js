import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import AdminSettings from "../../component/adminSettings";
import { user } from "../../constant/constant";

const settings = () => {
  return (
    <div>
      <Head>
        <title>EBizMart - admin settings</title>
      </Head>
      <DashboardLayout user={user.admin}>
        <AdminSettings />
      </DashboardLayout>
    </div>
  );
};

export default settings;
