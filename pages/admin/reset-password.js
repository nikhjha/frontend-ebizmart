import Head from "next/head";
import AdminResetPage from "../../component/AuthComponent/AdminResetPage";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  const user = router.query;
  return <AdminResetPage user={user} />;
};

export default function reset_password() {
  return (
    <div>
      <Head>
        <title>Ebizmart - Admin Reset Password</title>
      </Head>
      <ResetPassword />
    </div>
  );
}
