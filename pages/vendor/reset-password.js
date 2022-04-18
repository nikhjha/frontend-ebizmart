import Head from "next/head";
import ResetPage from "../../component/AuthComponent/ResetPage";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  const user = router.query;
  return <ResetPage user={user} />;
};

export default function reset_password() {
  return (
    <div>
      <Head>
        <title>Ebizmart - Vendor Reset Password</title>
      </Head>
      <ResetPassword />
    </div>
  );
}
