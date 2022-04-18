import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import accountBox from "@iconify/icons-ic/account-box";

// ----------------------------------------------------------------------

export const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/vendor/dashboard",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "account",
    path: "/vendor/account",
    icon: getIcon(accountBox),
  },
  {
    title: "products",
    path: "/vendor/products",
    icon: getIcon(shoppingBagFill),
  },
  {
    title: "orders",
    path: "/vendor/orders",
    icon: getIcon(fileTextFill),
  },
  {
    title: "webprofile",
    path: "/vendor/webprofile",
    icon: getIcon(accountBox),
  },
];

export default sidebarConfig;
