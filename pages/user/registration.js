import Head from "next/head";
import Registration from "../../component/AuthComponent/UserRegistration";

export default function registration() {
    return (
        <div>
            <Head>
                <title>eBizMart - User registration</title>
            </Head>
            <Registration />
        </div>
    )
}