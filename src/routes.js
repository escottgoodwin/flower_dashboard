// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

import LocationOn from "@material-ui/icons/LocationOn";// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import SalesList from "components/SalesList.jsx";
import DashboardCalendar from "components/Calendar";
import ProductList from "components/ProductList1";
import Maps1 from "views/Maps/Maps1.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/sales_list",
    name: "Sales",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: SalesList,
    layout: "/admin"
  },
  {
    path: "/product_list",
    name: "Products",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ProductList,
    layout: "/admin"
  },
  {
    path: "/maps1",
    name: "Sales Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps1,
    layout: "/admin"
  },
  ,
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "خرائط",
    icon: LocationOn,
    component: DashboardCalendar,
    layout: "/admin"
  },
];

export default dashboardRoutes;
