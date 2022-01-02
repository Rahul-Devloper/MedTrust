import { Calendar, People, Buy } from "react-iconly";

const apps = [
    {
        header: "APPS",
    },
    {
        id: "apps-calendar",
        title: "Calendar",
        icon: <Calendar set="curved" />,
        navLink: "/apps/calendar",
    },
    {
        id: "contact",
        title: "Contact",
        icon: <People set="curved" />,

        navLink: "/apps/contact",
    },
    {
        id: "ecommerce",
        title: "Ecommerce",
        icon: <Buy set="curved" />,
        children: [
            {
                id: "shop",
                title: "Shop",
                navLink: "/apps/ecommerce/shop",
            },
            {
                id: "wishlist",
                title: "Wishlist",
                navLink: "/apps/ecommerce/wishlist",
            },
            {
                id: "product-detail",
                title: "Product Detail",
                navLink: "/apps/ecommerce/product-detail/0",
            },
            {
                id: "checkout",
                title: "Checkout",
                navLink: "/apps/ecommerce/checkout",
            },
        ],
    },
];

export default apps