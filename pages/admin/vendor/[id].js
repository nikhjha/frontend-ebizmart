import Head from "next/head";
import DashboardLayout from "../../../component/dashboard";
import { user } from "../../../constant/constant";

import { serverFetch } from "../../../libs/axiosClient";
import AdminConfigPanel from "../../../component/AdminConfigPanel";

export default function vendor({ vendor }) {
  return (
    <div>
      <Head>
        <title>Vendor </title>
      </Head>
      <DashboardLayout user={user.admin}>
        <AdminConfigPanel vendor={vendor} />
      </DashboardLayout>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const fetch = serverFetch();
  const res = await fetch.get(`/vendors/${params.id}`);

  const vendor = {
    ...res.data.vendor,
    reviews: [],
  };
  return {
    props: {
      vendor: vendor,
    },
  };
};
