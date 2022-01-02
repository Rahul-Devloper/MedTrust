import {
    CloseSquare,
    Discount,
    User,
    Discovery,
    Paper,
    InfoSquare,
    Password,
    PaperPlus,
    Unlock,
    Bookmark,
    Message,
} from "react-iconly";

const pages = [
    {
        header: "PAGES",
    },
    {
        id: "errors",
        title: "Error Pages",
        icon: <CloseSquare set="curved" className="remix-icon" />,
        children: [
            {
                id: "error-404",
                title: "404",
                navLink: "/pages/error-404",
            },
            {
                id: "error-403",
                title: "403",
                navLink: "/pages/error-403",
            },
            {
                id: "error-500",
                title: "500",
                navLink: "/pages/error-500",
            },
            {
                id: "error-503",
                title: "503",
                navLink: "/pages/error-503",
            },
            {
                id: "error-502",
                title: "502",
                navLink: "/pages/error-502",
            },
            {
                id: "maintenance",
                title: "Maintenance",
                navLink: "/pages/maintenance",
            },
            {
                id: "comming-soon",
                title: "Coming Soon",
                navLink: "/pages/coming-soon",
            },
        ],
    },
    {
        id: "landing",
        title: "Landing",
        icon: <Discovery set="curved" className="remix-icon" />,
        navLink: "/pages/landing",
    },
    {
        id: "pricing",
        title: "Pricing",
        icon: <Discount set="curved" className="remix-icon" />,
        navLink: "/pages/pricing",
    },
    {
        id: "profile",
        title: "Profile",
        icon: <User set="curved" className="remix-icon" />,
        children: [
            {
                id: "profile-personel-information",
                title: "Personel Information",
                navLink: "/pages/profile/personel-information",
            },
            {
                id: "profile-notifications",
                title: "Notifications",
                navLink: "/pages/profile/notifications",
            },
            {
                id: "profile-activity",
                title: "Activity Monitor",
                navLink: "/pages/profile/activity",
            },
            {
                id: "profile-security",
                title: "Security Settings",
                navLink: "/pages/profile/security",
            },
            {
                id: "profile-password-change",
                title: "Password Change",
                navLink: "/pages/profile/password-change",
            },
            {
                id: "profile-connect-with-social",
                title: "Connect with Social",
                navLink: "/pages/profile/connect-with-social",
            },
        ],
    },
    {
        id: "invoice",
        title: "Invoice",
        icon: <Paper set="curved" className="remix-icon" />,
        navLink: "/pages/invoice",
    },
    {
        id: "email",
        title: "E-mail Templates",
        icon: <Message set="curved" className="remix-icon" />,
        children: [
            {
                id: "email-hello",
                title: "Hello",
                navLink: "https://yoda.hypeople.studio/yoda-email-template/hello.html",
            },
            {
                id: "email-promotional",
                title: "Promotional",
                navLink: "https://yoda.hypeople.studio/yoda-email-template/promotional.html",
            },
            {
                id: "email-verify",
                title: "Verify",
                navLink: "https://yoda.hypeople.studio/yoda-email-template/verify.html",
            },
            {
                id: "email-reset-password",
                title: "Reset Password",
                navLink: "https://yoda.hypeople.studio/yoda-email-template/reset-password.html",
            },
            {
                id: "email-term",
                title: "Term",
                navLink: "https://yoda.hypeople.studio/yoda-email-template/term.html",
            },
            {
                id: "email-deactive-account",
                title: "Deactive Account",
                navLink: "https://yoda.hypeople.studio/yoda-email-template/deactive-account.html",
            },
        ],
    },
    {
        id: "faq",
        title: "FAQ",
        icon: <InfoSquare set="curved" className="remix-icon" />,
        navLink: "/pages/faq",
    },
    {
        id: "knowledge-base",
        title: "Knowledge Base",
        icon: <Bookmark set="curved" className="remix-icon" />,
        children: [
            {
                id: "knowledge-base-1",
                title: "Knowledge Base 1",
                navLink: "/pages/knowledge-base/knowledge-base-1",
            },
            {
                id: "knowledge-base-2",
                title: "Knowledge Base 2",
                navLink: "/pages/knowledge-base/knowledge-base-2",
            },
        ],
    },
    {
        id: "blank-page",
        title: "Blank Page",
        icon: <PaperPlus set="curved" className="remix-icon" />,
        navLink: "/pages/blank-page",
    },
    {
        id: "authentication",
        title: "Authentication",
        icon: <Unlock set="curved" className="remix-icon" />,
        children: [
            {
                id: "login-page",
                title: "Login Page",
                navLink: "/pages/authentication/login",
            },
            {
                id: "register-page",
                title: "Register Page",
                navLink: "/pages/authentication/register",
            },
            {
                id: "recover-password",
                title: "Receover Password",
                navLink: "/pages/authentication/recover-password",
            },
            {
                id: "reset-password",
                title: "Reset Password",
                navLink: "/pages/authentication/reset-password",
            },
        ],
    },
    {
        id: "lock-page",
        title: "Lock Screen",
        icon: <Password set="curved" className="remix-icon" />,
        children: [
            {
                id: "welcome",
                title: "Welcome",
                navLink: "/pages/welcome",
            },
            {
                id: "password-is-changed",
                title: "Password Is Changed",
                navLink: "/pages/password-is-changed",
            },
            {
                id: "deactivated",
                title: "Deactivated",
                navLink: "/pages/deactivated",
            },
            {
                id: "lock",
                title: "Lock",
                navLink: "/pages/lock",
            },
        ],
    },
];

export default pages