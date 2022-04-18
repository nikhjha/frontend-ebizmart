import Head from "next/head";
import SearchResultPage from "../component/SearchResultPage";
import SetToGlobalState from "../component/SetToGlobalState";
import Topbar from "../component/Topbar";
import SecondaryTheme from "../theme/SecondaryThemeProvider";
import { serverFetch } from "../libs/axiosClient";

export default function search({ categories }) {
  return (
    <div>
      <Head>
        <title>EbizMart - Searches</title>
      </Head>
      <SecondaryTheme>
        <SetToGlobalState categories={categories} />
        <Topbar />
        <SearchResultPage />
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
