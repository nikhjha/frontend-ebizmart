import Head from "next/head";
import DashboardLayout from "../../../component/dashboard";
import ProductPage from "../../../component/ProductPage";
import { serverFetch } from "../../../libs/axiosClient";

export default function createProduct({ categories }) {
	return (
		<div>
			<Head>
				<title>EbizMart - Vendor (Add New Product) </title>
			</Head>
			<DashboardLayout>
				<ProductPage categories={categories} />
			</DashboardLayout>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const fetch = serverFetch();
	const categories_res = await fetch.get("/categories/getAllCategories");
	return {
		props: {
			categories: categories_res.data.data.categories,
		},
	};
};
