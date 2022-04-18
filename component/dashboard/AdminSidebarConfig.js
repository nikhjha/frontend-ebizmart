import { Icon } from "@iconify/react"
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill"
import settingsFill from "@iconify/icons-eva/settings-2-outline"
import roundCategory from "@iconify/icons-ic/round-category"
import peopleFill from "@iconify/icons-eva/people-fill"

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />

const adminSidebarConfig = [
  {
    title: "dashboard",
    path: "/admin/dashboard",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "vendors",
    path: "/admin/vendors",
    icon: getIcon(peopleFill),
  },
  {
    title: "categories",
    path: "/admin/categories",
    icon: getIcon(roundCategory),
  },
  {
    title: "settings",
    path: "/admin/settings",
    icon: getIcon(settingsFill),
  },
]

export default adminSidebarConfig
