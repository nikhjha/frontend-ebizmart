import Head from "next/head";
import AdminForgotPage from "../../component/AuthComponent/AdminForgotPage";

export default function forgot_password() {
  return (
    <div>
      <Head>
        <title>Ebizmart - Admin Forgot Password</title>
      </Head>
      <AdminForgotPage />
    </div>
  );
}
