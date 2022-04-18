import Head from "next/head";
import Login from "../../component/AuthComponent/Login";

export default function login() {
    return (
        <div>
            <Head>
                <title>eBizMart - vendor login</title>
            </Head>
           <Login /> 
        </div>
    )
}
