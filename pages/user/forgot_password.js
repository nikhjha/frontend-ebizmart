import Head from "next/head";
import UserForgotPage from "../../component/AuthComponent/UserForgotPage";

export default function forgot_password() {
  return (
    <div>
      <Head>
        <title>Ebizmart - User Forgot Password</title>
      </Head>
      <UserForgotPage />
    </div>
  );
}
