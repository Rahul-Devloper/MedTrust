import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Divider, Avatar, Row, Col } from "antd";
import { RiSettings3Line } from "react-icons/ri";

import avatar from "../../../../assets/images/memoji/user1.png";

const MenuFooter = (props) => {
  const { user } = useSelector((state) => state.auth);
  console.log('user==>', user)

  return props.collapsed === false ? (
    <Row
      className='hp-sidebar-footer hp-bg-color-dark-90'
      align='middle'
      justify='space-between'>
      <Divider className='hp-border-color-black-40 hp-border-color-dark-70 hp-mt-0' />

      <Col>
        <Row align='middle'>
          <Avatar
            size={38}
            src={user?.ImgUrl || avatar}
            className='hp-bg-info-4 hp-mr-8'
            style={
              props.mobileMenu
                ? { marginLeft: '8px', marginRight: '8px' }
                : { marginLeft: '-15px', marginRight: '8px' }
            }
          />

          <div className='hp-mt-6'>
            <span
              className='hp-d-block hp-text-color-black-100 hp-text-color-dark-0 hp-p1-body'
              style={{ lineHeight: 1 }}>
              {user?.name}
            </span>

            <Link
              to='/profile/information'
              className='hp-badge-text hp-text-color-dark-30 hp-font-weight-400'
              onClick={props.onClose}>
              View Profile
            </Link>
          </div>
        </Row>
      </Col>

      <Col>
        <Link to='/profile/security' onClick={props.onClose}>
          <RiSettings3Line
            className='remix-icon hp-text-color-black-100 hp-text-color-dark-0'
            size={24}
            style={props.mobileMenu ? { marginRight: '12px' } : null}
          />
        </Link>
      </Col>
    </Row>
  ) : (
    <Row
      className='hp-sidebar-footer hp-bg-color-dark-90'
      align='middle'
      justify='center'>
      <Col>
        <Link to={`/profile/information`} onClick={props.onClose}>
          <Avatar
            size={48}
            src={user?.ImgUrl || avatar}
            className='hp-bg-info-4'
          />
        </Link>
      </Col>
    </Row>
  )
};

export default MenuFooter;
