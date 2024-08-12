import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Col, Avatar, Badge, Menu, Image } from 'antd'
import { User, Discount, Setting, Password } from 'react-iconly'

import menuImg from '../../assets/images/pages/profile/menu-img.svg'
import avatar from '../../assets/images/memoji/user1.png'
import doctorMaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import { useSelector } from 'react-redux'

const MenuProfile = (props) => {
  const { user } = useSelector((state) => state.auth)
  const menuIconClass = 'remix-icon hp-mr-8'

  const avatarImg = user?.ImgUrl || avatar

  const menuFooterItem = () => {
    if (props.footer !== 'none') {
      return (
        <div className='hp-profile-menu-footer'>
          <img src={menuImg} alt='Profile Image' />
        </div>
      )
    }
  }

  const moreBtn = () => {
    if (props.moreBtnCheck !== 'none') {
      return (
        <Col className='hp-menu-header-btn hp-pr-16 hp-mb-12 hp-text-right'>
          {props.moreBtn()}
        </Col>
      )
    }
  }

  const location = useLocation()
  const { pathname } = location
  const splitLocation = pathname.split('/')

  return (
    <Col flex='240px' className='hp-profile-menu hp-py-24'>
      <div className='hp-w-100'>
        <div className='hp-profile-menu-header hp-mt-md-16 hp-text-center'>
          {moreBtn()}
          <Badge>
            <Avatar shape='circle' size={100} src={avatarImg} />
          </Badge>

          <h3 className='hp-mt-24 hp-mb-4'>{user?.name}</h3>
          <a href={`mailto:${user?.email}`} className='hp-p1-body'>
            {user?.email}
          </a>
        </div>

        <Menu
          mode='inline'
          className='hp-w-100 hp-profile-menu-body'
          theme={'light'}>
          {/* Personal Information */}
          <Menu.Item
            key='1'
            icon={<User set='curved' className={menuIconClass} />}
            className={`
              hp-mb-16 hp-pl-24 hp-pr-32
              ${
                splitLocation[splitLocation.length - 1] === 'information'
                  ? 'ant-menu-item-selected'
                  : 'ant-menu-item-selected-in-active'
              }
            `}
            onClick={props.onCloseDrawer}>
            <Link to='/profile/information'>Personal Information</Link>
          </Menu.Item>

          {/* Subscription */}
          {user?.role === 'admin' && (
            <Menu.Item
              key='2'
              icon={<Discount set='curved' className={menuIconClass} />}
              className={`
              hp-mb-16 hp-pl-24 hp-pr-32
              ${
                splitLocation[splitLocation.length - 1] === 'subscription'
                  ? 'ant-menu-item-selected'
                  : 'ant-menu-item-selected-in-active'
              }
            `}
              onClick={props.onCloseDrawer}>
              <Link to='/profile/subscription'>My Subscription</Link>
            </Menu.Item>
          )}

          {/* Security */}
          <Menu.Item
            key='3'
            icon={<Setting set='curved' className={menuIconClass} />}
            className={`
              hp-mb-16 hp-pl-24 hp-pr-32
              ${
                splitLocation[splitLocation.length - 1] === 'security'
                  ? 'ant-menu-item-selected'
                  : 'ant-menu-item-selected-in-active'
              }
            `}
            onClick={props.onCloseDrawer}>
            <Link to='/profile/security'>Security Settings</Link>
          </Menu.Item>

          {/* Password Change */}
          <Menu.Item
            key='4'
            icon={<Password set='curved' className={menuIconClass} />}
            className={`
              hp-mb-16 hp-pl-24 hp-pr-32
              ${
                splitLocation[splitLocation.length - 1] === 'password'
                  ? 'ant-menu-item-selected'
                  : 'ant-menu-item-selected-in-active'
              }
            `}
            onClick={props.onCloseDrawer}>
            <Link to='/profile/password'>Password Change</Link>
          </Menu.Item>
        </Menu>
      </div>

      {menuFooterItem()}
    </Col>
  )
}

export default MenuProfile;
