import { Home, Calendar, People, Chat, Document } from "react-iconly";
import { MdPersonAddDisabled } from 'react-icons/md'
import { FaUserDoctor } from 'react-icons/fa6'
import { IoPersonAddOutline } from 'react-icons/io5'

import { RxDashboard } from 'react-icons/rx'

const admin = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <RxDashboard size={18} />,
    navLink: '/admin/dashboard',
  },
  {
    id: 'patients',
    title: 'Patients',
    icon: <IoPersonAddOutline size={18} />,
    navLink: '/admin/manage-patients',
  },
  {
    id: 'doctors',
    title: 'Doctors',
    icon: <FaUserDoctor size={18} />,
    navLink: '/admin/manage-doctors',
  },
  {
    id: 'deactivatedProfiles',
    title: 'Deactivated Profiles',
    icon: <MdPersonAddDisabled size={18} />,
    navLink: '/admin/deactivatedProfiles',
  },
]

export default admin;
