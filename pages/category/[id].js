import Head from "next/head";
import SetToGlobalState from "../../component/SetToGlobalState";
import Topbar from "../../component/Topbar";
import SecondaryTheme from "../../theme/SecondaryThemeProvider";
import { serverFetch } from "../../libs/axiosClient";
import CategoryPublicPage from "../../component/CategoryPage/CategoryPublicPage";
import { convertToSlug } from "../../component/utility/slug";

export default function category({ categories, products }) {
  return (
    <div>
      <Head>
        <title>EbizMart - Category</title>
      </Head>
      <SecondaryTheme>
        <SetToGlobalState categories={categories} />
        <Topbar />
        <CategoryPublicPage products={products} />
      </SecondaryTheme>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await serverFetch().get("/categories/getActiveCategories");
  return {
    paths: res.data.data.categories.map(({ category }) => {
      return {
        params: { id: convertToSlug(category.name), categoryId: category._id },
      };
    }),
    fallback: false, // See the "fallback" section below
  };
}

export const getStaticProps = async ({ params }) => {
  const fetch = serverFetch();
  const res = await fetch.get("/categories/getActiveCategories");
  const [category] = res.data.data.categories.filter(
    ({ category }) => convertToSlug(category.name) === params.id
  );
  const id = category.category._id;
  const products = [];
  try {
    const productsRes = await fetch.get(`/products/category/${id}`);
    for (let productObj of productsRes.data.data.products) {
      const product = productObj.product;
      try {
        const vendorRes = await fetch.get(`/vendors/${product.vendorId}`);
        products.push({ ...product, vendor: vendorRes.data.vendor });
      } catch (e) {
        console.log(e.response.status);
      }
    }
    return {
      props: {
        categories: res.data.data.categories,
        products: products,
      },
    };
  } catch (e) {
    console.log(e.response.status);
    return {
      props: {
        categories: res.data.data.categories,
        products: products,
      },
    };
  }
};
