import Head from "next/head";
import VendorPublicPage from "../../../component/VendorPublicPage";
import { serverFetch } from "../../../libs/axiosClient";
import SecondaryTheme from "../../../theme/SecondaryThemeProvider";

export default function vendorPage({ vendor }) {
  return (
    <div>
      <Head>
        <title>A web profile</title>
      </Head>
      <SecondaryTheme>
        <VendorPublicPage vendor={vendor} />
      </SecondaryTheme>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const fetch = serverFetch();
  const res = await fetch.get(`/vendors/${params.id}`);
  const productsRes = await fetch.get(`/products/vendor/${params.id}`);
  const popularProductsRes = await fetch.get(`/products/trending/vendor/${params.id}`);
  const vendor = {
    ...res.data.vendor,
    location: { lat: -34.397, lng: 150.644 },
    reviews: [],
    products: productsRes.data.data.products.map(({ product }) => product),
    popularProducts: popularProductsRes.data.data.products.map(({ product }) => product),
  };
  return {
    props: {
      vendor: vendor,
    },
  };
};
