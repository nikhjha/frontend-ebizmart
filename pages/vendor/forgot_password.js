import Head from "next/head";
import ForgotPage from "../../component/AuthComponent/ForgotPage";

export default function forgot_password(){
    return (
        <div>
            <Head>
                <title>Ebizmart - Vendor Forgot Password</title>
            </Head>
                <ForgotPage />
        </div>
    );
}