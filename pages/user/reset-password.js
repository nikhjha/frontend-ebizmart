import Head from "next/head";
import UserResetPage from "../../component/AuthComponent/UserResetPage";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  const user = router.query;
  return <UserResetPage user={user} />;
};

export default function reset_password() {
  return (
    <div>
      <Head>
        <title>Ebizmart - User Reset Password</title>
      </Head>
      <ResetPassword />
    </div>
  );
}
