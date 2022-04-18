import Head from "next/head";
import ProductPage from "../../component/ProductPage/Public";
import Topbar from "../../component/Topbar";
import Footer from "../../component/Footer";
// import { getProduct } from "../../_mocks_/products";
import { serverFetch } from "../../libs/axiosClient";
import SecondaryTheme from "../../theme/SecondaryThemeProvider";
import SetToGlobalState from "../../component/SetToGlobalState";

export default function Product({ product, categories, vendor }) {
  return (
    <div>
      <Head>
        <title>{product.productName} &nbsp; - EbizMart</title>
      </Head>
      <SecondaryTheme>
        <SetToGlobalState categories={categories} />
        <Topbar />
        <ProductPage product={product} vendor={vendor} />
        <Footer />
      </SecondaryTheme>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const fetch = serverFetch();
  try {
    const res = await fetch.get(`/products/${context.params.id}`);
    const categoryRes = await fetch.get("/categories/getActiveCategories");
    const vendorRes = await fetch.get(`/vendors/${res.data.product.vendorId}`);
    //console.log(res.data.product.vendorId);
    //console.log(vendorRes.data);
    return {
      props: {
        product: res.data.product,
        categories: categoryRes.data.data.categories,
        vendor: vendorRes.data.vendor,
      },
    };
  } catch (e) {
    return {
      props: {
        product: {},
        categories: [],
      },
    };
  }
};
