import Head from "next/head";
import UserLogin from "../../component/AuthComponent/Userlogin";

export default function login() {
  return (
    <div>
      <Head>
        <title>eBizMart - User Login</title>
      </Head>
      <UserLogin />
    </div>
  );
}
