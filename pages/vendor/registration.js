import Head from "next/head";
import Registration from "../../component/AuthComponent/Registration";

export default function registration() {
    return (
        <div>
            <Head>
                <title>eBizMart - vendor registration</title>
            </Head>
            <Registration />
        </div>
    )
}
