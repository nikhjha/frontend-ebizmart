import Head from "next/head";
import Carousel from "../component/Carousel";
import Topbar from "../component/Topbar";
import CategoryPanel from "../component/CategoryPanel";
import Footer from "../component/Footer";
import Image from "next/image";
import Dailog from "../component/complaint/Dailog";
import { Container } from "@mui/material";
import SecondaryTheme from "../theme/SecondaryThemeProvider";
import { serverFetch } from "../libs/axiosClient";
import SetToGlobalState from "../component/SetToGlobalState";

export default function Home({ categories }) {
	
	return (
		<div>
			{/* Meta tags and head components for "/" page */}
			<Head>
				<title>eBizMart</title>
				<meta name="description" content="A website similar to justdial.com" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Top three header components are present in Topbar component */}
			<SecondaryTheme>
				<SetToGlobalState categories={categories}/>
				<Topbar />
				<Container maxWidth="xl" sx={{ my: 2, mb: 4 }}>
					<Carousel>
						<Image alt="" src="/images/banner.png" layout="fill" quality={100} />
						<Image alt="" src="/images/banner.png" layout="fill" quality={100} />
						<Image alt="" src="/images/banner.png" layout="fill" quality={100} />
					</Carousel>
				</Container>
				<CategoryPanel />
				<Footer />
				<Dailog />
			</SecondaryTheme>
		</div>
	);
}

export const getStaticProps = async () => {
	const res = await serverFetch().get("/categories/getActiveCategories");
	return {
		props: {
			categories: res.data.data.categories,
		},
	};
};
