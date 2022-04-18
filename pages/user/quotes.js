import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import { user } from "../../constant/constant";
import UserRequestedQuotes from "../../component/UserDashboard/UserRequestedQuotes";

export default function requested_quotes({ quotes, setQuotes }) {
  return (
    <div>
      <Head>
        <title>eBizMart - User Requested Quotes</title>
      </Head>
      <DashboardLayout user={user.users}>
        <UserRequestedQuotes quotes={quotes} setQuotes={setQuotes} />
      </DashboardLayout>
    </div>
  );
}
