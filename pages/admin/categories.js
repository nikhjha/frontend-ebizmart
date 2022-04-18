import Head from "next/head"
import DashboardLayout from "../../component/dashboard"
import CategoriesPage from "../../component/CategoriesPage"
import { user } from "../../constant/constant"
import { serverFetch } from "../../libs/axiosClient"

export default function Categories({ categories }) {
  return (
    <div>
      <Head>
        <title>EbizMart - Admin (All Categories) </title>
      </Head>
      <DashboardLayout user={user.admin}>
        <CategoriesPage categories={categories} />
      </DashboardLayout>
    </div>
  )
}

export const getServerSideProps = async () => {
  const fetch = serverFetch()
  const res = await fetch.get(`/categories/getAllCategories`)

  return {
    props: {
      categories: res.data.data.categories.map(({ category }) => category),
    },
  }
}
