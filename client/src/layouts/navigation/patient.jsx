import { Home, Calendar, Chat, Document } from 'react-iconly'
import { RxDashboard } from 'react-icons/rx'
import { FaAssistiveListeningSystems, FaRegStar } from 'react-icons/fa'
import { RiSearch2Fill } from 'react-icons/ri'

const patient = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <RxDashboard set='curved' className='remix-icon' />,
    navLink: '/patient/dashboard',
  },
  {
    id: 'findDoctor',
    title: 'Find Doctors',
    icon: <RiSearch2Fill set='curved' className='remix-icon' />,
    navLink: '/patient/find-doctor',
  },
  {
    id: 'specialityDirectory',
    title: 'Specialists',
    icon: <FaAssistiveListeningSystems set='curved' className='remix-icon' />,
    navLink: '/patient/speciality-directory',
  },
  {
    id: 'myReviews',
    title: 'My Reviews',
    icon: <FaRegStar set='curved' className='remix-icon' />,
    navLink: '/patient/my-reviews',
  },
]

export default patient
