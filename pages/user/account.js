import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import { user } from "../../constant/constant";
import UserAccount from "../../component/UserDashboard/UserAccount";

export default function account() {
  return (
    <div>
      <Head>
        <title>eBizMart - User Account</title>
      </Head>
      <DashboardLayout user={user.users}>
        <UserAccount />
      </DashboardLayout>
    </div>
  );
}
