import { Home, Calendar, People, Chat, Document } from "react-iconly";

const admin = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home set="curved" className="remix-icon" />,
    navLink: "/admin/dashboard",
  },
  {
    id: "project",
    title: "Projects",
    icon: <Document set="curved" className="remix-icon" />,
    navLink: "/admin/projects",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: <Calendar set="curved" className="remix-icon" />,
    navLink: "/admin/calendar",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Chat set="curved" className="remix-icon" />,
    navLink: "/admin/chat",
  },
  {
    id: "team",
    title: "Team",
    icon: <People set="curved" className="remix-icon" />,
    navLink: "/admin/team",
  },
];

export default admin;
