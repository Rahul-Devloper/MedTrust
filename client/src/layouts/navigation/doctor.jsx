import { Home, Calendar, Chat, Document } from 'react-iconly'
import { RxDashboard } from 'react-icons/rx'
import { FaRegStar } from 'react-icons/fa'

const doctor = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <RxDashboard set='curved' className='remix-icon' />,
    navLink: '/doctor/dashboard',
  },
  {
    id: 'project',
    title: 'Patient Reviews',
    icon: <FaRegStar set='curved' className='remix-icon' />,
    navLink: '/doctor/patient-reviews',
  },
]

export default doctor
