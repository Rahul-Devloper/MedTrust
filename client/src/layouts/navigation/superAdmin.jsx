import { Home, User, Ticket, Discount, Buy } from "react-iconly";

const superAdmin = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home set="curved" className="remix-icon" />,
    navLink: "/super-admin/dashboard",
  },
  {
    id: "admins",
    title: "Admins",
    icon: <User set="curved" className="remix-icon" />,
    navLink: "/super-admin/admins",
  },
  {
    id: "order",
    title: "Orders",
    icon: <Buy set="curved" className="remix-icon" />,
    navLink: "/admin/orders",
  },
  {
    id: "plans",
    title: "Plans",
    icon: <Ticket set="curved" className="remix-icon" />,
    navLink: "/super-admin/plans",
  },
  {
    id: "coupons",
    title: "Coupons",
    icon: <Discount set="curved" className="remix-icon" />,
    navLink: "/super-admin/coupons",
  },
];

export default superAdmin;
