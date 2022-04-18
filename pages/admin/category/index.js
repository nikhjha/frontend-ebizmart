import Head from "next/head"
import DashboardLayout from "../../../component/dashboard"
import CategoryPage from "../../../component/CategoryPage"
import { user } from "../../../constant/constant"

export default function createCategory() {
  return (
    <div>
      <Head>
        <title>EbizMart - Admin (Add New Category) </title>
      </Head>
      <DashboardLayout user={user.admin}>
        <CategoryPage />
      </DashboardLayout>
    </div>
  )
}
