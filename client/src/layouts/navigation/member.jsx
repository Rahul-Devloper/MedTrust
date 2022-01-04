import { Home, Calendar, Chat, Document } from "react-iconly";

const member = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home set="curved" className="remix-icon" />,
    navLink: "/member/dashboard",
  },
  {
    id: "project",
    title: "Projects",
    icon: <Document set="curved" className="remix-icon" />,
    navLink: "/member/projects",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: <Calendar set="curved" className="remix-icon" />,
    navLink: "/member/calendar",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Chat set="curved" className="remix-icon" />,
    navLink: "/member/chat",
  },
];

export default member;
