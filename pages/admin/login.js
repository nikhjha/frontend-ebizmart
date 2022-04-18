import Head from "next/head";
import AdminLogin from "../../component/AuthComponent/Adminlogin";

export default function login() {
  return (
    <div>
      <Head>
        <title>eBizMart - Admin login</title>
      </Head>
      <AdminLogin />
    </div>
  );
}
