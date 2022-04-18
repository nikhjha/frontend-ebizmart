import Head from "next/head";
import DashboardLayout from "../../../component/dashboard";
import ProductPage from "../../../component/ProductPage";
import { serverFetch } from "../../../libs/axiosClient";

export default function product({ product, categories }) {
	return (
		<div>
			<Head>
				<title>EbizMart - Vendor Product</title>
			</Head>
			<DashboardLayout>
				<ProductPage product={product} categories={categories} />
			</DashboardLayout>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const fetch = serverFetch();
	const res = await fetch.get(`/products/${context.params.id}`);
	const categories_res = await fetch.get("/categories/getAllCategories");
	return {
		props: {
			product: res.data.product,
			categories: categories_res.data.data.categories,
		},
	};
};
