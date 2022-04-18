import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import { user } from "../../constant/constant";
import UserRecievedOffers from "../../component/UserDashboard/UserRecievedOffers";

export default function recieved_offers({ offers, setOffers }) {
  return (
    <div>
      <Head>
        <title>eBizMart - User Recieved offers</title>
      </Head>
      <DashboardLayout user={user.users}>
        <UserRecievedOffers offers={offers} setOffers={setOffers} />
      </DashboardLayout>
    </div>
  );
}
