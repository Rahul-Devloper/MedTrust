import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Tag } from "antd";

import {
  superAdminNav,
  adminNav,
  memberNav,
  doctorNav,
  patientNav,
} from '../../../navigation'

const MenuItem = (props) => {
  const { onClose } = props
  const { user } = useSelector((state) => state.auth)
  const [navigation, setNavigation] = useState([])

  useEffect(() => {
    if (user?.role === 'superadmin') {
      setNavigation(superAdminNav)
    } else if (user?.role === 'admin') {
      setNavigation(adminNav)
    } else if (user?.role === 'doctor') {
      setNavigation(doctorNav)
    } else if (user?.role === 'patient') {
      setNavigation(patientNav)
    } else {
      setNavigation(memberNav)
    }
  }, [user])

  // Location
  const location = useLocation()
  const { pathname } = location

  const splitLocation = pathname.split('/')

  const menuItem = navigation?.map((item, index) => {
    const itemNavLink = item.navLink.split('/')

    return (
      // Level 1
      <Menu.Item
        key={item.id}
        icon={item.icon}
        onClick={onClose}
        className={
          splitLocation[splitLocation.length - 2] +
            '/' +
            splitLocation[splitLocation.length - 1] ===
          itemNavLink[itemNavLink.length - 2] +
            '/' +
            itemNavLink[itemNavLink.length - 1]
            ? 'ant-menu-item-selected'
            : 'ant-menu-item-selected-in-active'
        }
        style={item.tag && { pointerEvents: 'none' }}>
        {item.tag ? (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            href='#'
            className='hp-d-flex hp-align-items-center hp-d-flex-between'>
            <span>{item.title}</span>
            <Tag
              className='hp-mr-0 hp-border-none hp-text-color-black-100 hp-bg-success-3 hp-border-radius-full hp-px-8'
              style={{ marginRight: -14 }}>
              {item.tag}
            </Tag>
          </a>
        ) : (
          <Link to={item.navLink}>{item.title}</Link>
        )}
      </Menu.Item>
    )
  })

  return (
    <Menu
      mode='inline'
      defaultOpenKeys={[
        splitLocation.length === 5
          ? splitLocation[splitLocation.length - 3]
          : null,
        splitLocation[splitLocation.length - 2],
      ]}
      theme={'light'}>
      {menuItem}
    </Menu>
  )
}

export default MenuItem;
