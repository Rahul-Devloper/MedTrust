import { Home, Graph, Document } from "react-iconly";

const main = [
    {
        header: "MAIN",
    },
    {
        id: "dashboard",
        title: "Dashboards",
        icon: <Home set="curved" className="remix-icon" />,
        children: [
            {
                id: "analytics",
                title: "Analytics",
                navLink: "/main/dashboard/analytics",
            },
            {
                id: "dashboard-eCommerce",
                title: "Ecommerce",
                navLink: "/main/dashboard/ecommerce",
            },
        ],
    },
    {
        id: "widgets",
        title: "Widgets",
        icon: <Graph set="curved" className="remix-icon" />,
        children: [
            {
                id: "cards",
                title: "Yoda Card",
                children: [
                    {
                        id: "advance",
                        title: "Advance",
                        navLink: "/main/widgets/cards/advance",
                    },
                    {
                        id: "statistics",
                        title: "Statistics",
                        navLink: "/main/widgets/cards/statistics",
                    },
                    {
                        id: "widgets-analytics",
                        title: "Analytics",
                        navLink: "/main/widgets/cards/analytics",
                    },
                ],
            },
            {
                id: "charts",
                title: "Charts",
                navLink: "/main/widgets/charts",
            },
        ],
    },
    {
        id: "layouts",
        title: "Layouts",
        icon: <Document set="curved" className="remix-icon" />,
        children: [
            {
                id: "divider",
                title: "Divider",
                navLink: "/main/layouts/divider",
            },
            {
                id: "grid-system",
                title: "Grid Sytem",
                navLink: "/main/layouts/grid-system",
            },
            {
                id: "page-layouts",
                title: "Page Layouts",
                children: [
                    {
                        id: "boxed-layout",
                        title: "Boxed Layout",
                        navLink: "/main/layouts/page-layouts/boxed-layout",
                    },
                    {
                        id: "vertical-layout",
                        title: "Vertical Layout",
                        navLink: "/main/layouts/page-layouts/vertical-layout",
                    },
                    {
                        id: "horizontal-layout",
                        title: "Horizontal Layout",
                        navLink: "/main/layouts/page-layouts/horizontal-layout",
                    },
                    {
                        id: "full-layout",
                        title: "Full Layout",
                        navLink: "/main/layouts/page-layouts/full-layout",
                    },
                ],
            },
        ],
    },
];

export default main