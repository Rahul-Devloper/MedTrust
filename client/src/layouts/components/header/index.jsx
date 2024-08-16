import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Layout, Button, Row, Col, Menu } from 'antd'
import { RiMenuFill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import HeaderUser from './HeaderUser'
import HeaderNotifications from './HeaderNotifications'
import HeaderText from './HeaderText'

const { Header } = Layout

const MenuHeader = (props) => {
  const { setVisible } = props
  const [searchHeader, setSearchHeader] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const customize = useSelector((state) => state.customize)
  const location = useLocation() // Get current location for active class

  // Focus
  const inputFocusRef = useRef(null)
  const inputFocusProp = {
    ref: inputFocusRef,
  }

  // Search Active
  setTimeout(() => setSearchActive(searchHeader), 100)

  const searchClick = () => {
    setSearchHeader(true)
    setTimeout(() => {
      inputFocusRef.current.focus({
        cursor: 'start',
      })
    }, 200)
  }

  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true)
    setSearchHeader(false)
  }

  // Header Children for Patient
  const headerPatientChildren = () => (
    <Row
      align='middle'
      justify='space-between'
      className='hp-w-100 hp-position-relative'>
      <Col className='hp-mobile-sidebar-button hp-mr-24'>
        <Button
          type='text'
          onClick={showDrawer}
          icon={
            <RiMenuFill
              size={24}
              className='remix-icon hp-text-color-black-80 hp-text-color-dark-30'
            />
          }
        />
      </Col>

      {/* <Col flex='1' style={{ display: !searchHeader ? 'none' : 'block' }}> */}
      {/* Header search can be included here if needed */}
      {/* </Col> */}

      {/* {!searchHeader && <HeaderText />} */}

      <Col style={{ width: '50%' }}>
        {/* <Row align='middle'> */}
        <Menu
          mode='horizontal'
          selectedKeys={[location.pathname]} // Set active class based on current path
          theme='light'>
          <Menu.Item key='/patient/dashboard'>
            <Link to='/patient/dashboard'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key='/patient/find-doctor'>
            <Link to='/patient/find-doctor'>Find Doctor</Link>
          </Menu.Item>
          <Menu.Item key='/patient/speciality-directory'>
            <Link to='/patient/speciality-directory'>Specialists</Link>
          </Menu.Item>
          <Menu.Item key='/patient/my-reviews'>
            <Link to='/patient/my-reviews'>My Reviews</Link>
          </Menu.Item>
          <Menu.Item key='/patient/privacy-policy'>
            <Link to='/patient/privacy-policy'>Privacy Policy</Link>
          </Menu.Item>
        </Menu>
        {/* </Row> */}
      </Col>
      <HeaderUser />
    </Row>
  )

  // Header Children for Doctor
  const headerDoctorChildren = () => (
    <Row
      align='middle'
      justify='space-between'
      className='hp-w-100 hp-position-relative'>
      <Col className='hp-mobile-sidebar-button hp-mr-24'>
        <Button
          type='text'
          onClick={showDrawer}
          icon={
            <RiMenuFill
              size={24}
              className='remix-icon hp-text-color-black-80 hp-text-color-dark-30'
            />
          }
        />
      </Col>

      {/* <Col flex='1' style={{ display: !searchHeader ? 'none' : 'block' }}> */}
      {/* Header search can be included here if needed */}
      {/* </Col> */}

      {/* {!searchHeader && <HeaderText />} */}

      <Col>
        {/* <Row align='middle'> */}
        <Menu
          mode='horizontal'
          selectedKeys={[location.pathname]}
          theme='light'>
          <Menu.Item key='/doctor/dashboard'>
            <Link to='/doctor/dashboard'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key='/doctor/patient-reviews'>
            <Link to='/doctor/patient-reviews'>Reviews</Link>
          </Menu.Item>
          <Menu.Item key='/doctor/privacy-policy'>
            <Link to='/doctor/privacy-policy'>Privacy Policy</Link>
          </Menu.Item>
        </Menu>
        {/* </Row> */}
      </Col>
      <Col>
        <HeaderUser />
      </Col>
    </Row>
  )

  const headerAdminChildren = () => (
    <Row
      align='middle'
      justify='space-between'
      className='hp-w-100 hp-position-relative'>
      <Col className='hp-mobile-sidebar-button hp-mr-24'>
        <Button
          type='text'
          onClick={showDrawer}
          icon={
            <RiMenuFill
              size={24}
              className='remix-icon hp-text-color-black-80 hp-text-color-dark-30'
            />
          }
        />
      </Col>

      {/* <Col flex='1' style={{ display: !searchHeader ? 'none' : 'block' }}> */}
      {/* Header search can be included here if needed */}
      {/* </Col> */}

      {/* {!searchHeader && <HeaderText />} */}

      <Col style={{ width: '50%' }}>
        {/* <Row align='middle'> */}
        <Menu
          mode='horizontal'
          selectedKeys={[location.pathname]}
          theme='light'>
          <Menu.Item key='/admin/dashboard'>
            <Link to='/admin/dashboard'>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key='/admin/manage-patients'>
            <Link to='/admin/manage-patients'>Manage Patients</Link>
          </Menu.Item>
          <Menu.Item key='/admin/manage-doctors'>
            <Link to='/admin/manage-doctors'>Manage Doctors</Link>
          </Menu.Item>
          <Menu.Item key='/admin/privacy-policy'>
            <Link to='/admin/privacy-policy'>Privacy Policy</Link>
          </Menu.Item>
        </Menu>
        {/* </Row> */}
      </Col>
      <HeaderUser />
    </Row>
  )

  // Conditional Rendering based on user role
  const renderHeaderChildren = () => {
    switch (user?.role) {
      case 'admin':
        return headerAdminChildren() // Add admin header children here
      case 'doctor':
        return headerDoctorChildren()
      case 'patient':
        return headerPatientChildren()
      default:
        return null
    }
  }

  return (
    <Header style={{ marginTop: 0 }}>
      <Row justify='center' className='hp-w-100'>
        {customize.contentWidth === 'full' && <>{renderHeaderChildren()}</>}
        {customize.contentWidth === 'boxed' && (
          <Col xxl={20} xl={22} span={24}>
            {renderHeaderChildren()}
          </Col>
        )}
      </Row>
    </Header>
  )
}

export default MenuHeader
