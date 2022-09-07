import { Home, Calendar, People, Chat, Document } from "react-iconly";

const admin = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home size={18} />,
    navLink: "/admin/dashboard",
  },
  {
    id: "project",
    title: "Projects",
    icon: <Document size={18} />,
    navLink: "/admin/projects",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: <Calendar size={18} />,
    navLink: "/admin/calendar",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Chat size={18} />,
    navLink: "/admin/chat",
  },
  {
    id: "team",
    title: "Team",
    icon: <People size={18} />,
    navLink: "/admin/team",
  },
];

export default admin;
