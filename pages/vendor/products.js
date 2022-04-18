import Head from "next/head";
import DashboardLayout from "../../component/dashboard";
import ProductsPage from "../../component/ProductsPage";

export default function products({}) {
  return (
    <div>
      <Head>
        <title>EbizMart - Vendor Products</title>
      </Head>
      <DashboardLayout>
          <ProductsPage />
      </DashboardLayout>
    </div>
  );
}
