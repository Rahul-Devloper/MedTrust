import { Filter2, TicketStar, Discovery, Category, Danger } from "react-iconly";

const components = [
    {
        header: "COMPONENTS",
    },
    {
        id: "general",
        title: "General",
        icon: <Category set="curved" className="remix-icon" />,
        children: [
            {
                id: "style-guide",
                title: "Style Guide",
                navLink: "/components/general/style-guide",
            },
            {
                id: "buttons",
                title: "Buttons",
                navLink: "/components/general/buttons",
            },
            {
                id: "icons",
                title: "Icons",
                navLink: "/components/general/icons",
            },
        ],
    },
    {
        id: "navigation",
        title: "Navigation",
        icon: <Discovery set="curved" className="remix-icon" />,
        children: [
            {
                id: "breadcrumb",
                title: "Breadcrumbs",
                navLink: "/components/navigation/breadcrumb",
            },
            {
                id: "dropdown",
                title: "Dropdown",
                navLink: "/components/navigation/dropdown",
            },
            {
                id: "menu",
                title: "Menu",
                navLink: "/components/navigation/menu",
            },
            {
                id: "pagination",
                title: "Pagination",
                navLink: "/components/navigation/pagination",
            },
            {
                id: "steps",
                title: "Steps",
                navLink: "/components/navigation/steps",
            },
        ],
    },
    {
        id: "data-entry",
        title: "Data Entry",
        icon: <Filter2 set="curved" className="remix-icon" />,
        children: [
            {
                id: "checkbox",
                title: "Checkbox",
                navLink: "/components/data-entry/checkbox",
            },
            {
                id: "datepicker",
                title: "DatePicker",
                navLink: "/components/data-entry/datepicker",
            },
            {
                id: "form",
                title: "Form",
                navLink: "/components/data-entry/form",
            },
            {
                id: "inputs",
                title: "Inputs",
                navLink: "/components/data-entry/inputs",
            },
            {
                id: "input-number",
                title: "InputNumber",
                navLink: "/components/data-entry/input-number",
            },
            {
                id: "radio",
                title: "Radio",
                navLink: "/components/data-entry/radio",
            },
            {
                id: "rate",
                title: "Rate",
                navLink: "/components/data-entry/rate",
            },
            {
                id: "select",
                title: "Select",
                navLink: "/components/data-entry/select",
            },
            {
                id: "slider",
                title: "Slider",
                navLink: "/components/data-entry/slider",
            },
            {
                id: "switch",
                title: "Switch",
                navLink: "/components/data-entry/switch",
            },
            {
                id: "upload",
                title: "Upload",
                navLink: "/components/data-entry/upload",
            },
        ],
    },
    {
        id: "data-display",
        title: "Data Display",
        icon: <TicketStar set="curved" className="remix-icon" />,
        children: [
            {
                id: "avatar",
                title: "Avatar",
                navLink: "/components/data-display/avatar",
            },
            {
                id: "badge",
                title: "Badge",
                navLink: "/components/data-display/badge",
            },
            {
                id: "calendar",
                title: "Calendar",
                navLink: "/components/data-display/calendar",
            },
            {
                id: "card",
                title: "Card",
                navLink: "/components/data-display/card",
            },
            {
                id: "collapse",
                title: "Collapse",
                navLink: "/components/data-display/collapse",
            },
            {
                id: "comment",
                title: "Comment",
                navLink: "/components/data-display/comment",
            },
            {
                id: "empty",
                title: "Empty",
                navLink: "/components/data-display/empty",
            },
            {
                id: "list",
                title: "List",
                navLink: "/components/data-display/list",
            },
            {
                id: "popover",
                title: "Popover",
                navLink: "/components/data-display/popover",
            },
            {
                id: "table",
                title: "Table",
                navLink: "/components/data-display/table",
            },
            {
                id: "tabs",
                title: "Tabs",
                navLink: "/components/data-display/tabs",
            },
            {
                id: "tag",
                title: "Tag",
                navLink: "/components/data-display/tag",
            },
            {
                id: "timeline",
                title: "Timeline",
                navLink: "/components/data-display/timeline",
            },
            {
                id: "tooltip",
                title: "Tooltip",
                navLink: "/components/data-display/tooltip",
            },
        ],
    },
    {
        id: "feedback",
        title: "Feedback",
        icon: <Danger set="curved" className="remix-icon" />,
        children: [
            {
                id: "alert",
                title: "Alert",
                navLink: "/components/feedback/alert",
            },
            {
                id: "drawer",
                title: "Drawer",
                navLink: "/components/feedback/drawer",
            },
            {
                id: "modal",
                title: "Modal",
                navLink: "/components/feedback/modal",
            },
            {
                id: "message",
                title: "Message",
                navLink: "/components/feedback/message",
            },
            {
                id: "notification",
                title: "Notification",
                navLink: "/components/feedback/notification",
            },
            {
                id: "popconfirm",
                title: "Popconfirm",
                navLink: "/components/feedback/popconfirm",
            },
            {
                id: "progress",
                title: "Progress",
                navLink: "/components/feedback/progress",
            },
            {
                id: "result",
                title: "Result",
                navLink: "/components/feedback/result",
            },
            {
                id: "skeleton",
                title: "Skeleton",
                navLink: "/components/feedback/skeleton",
            },
        ],
    },
];

export default components