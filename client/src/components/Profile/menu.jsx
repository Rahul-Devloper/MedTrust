import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Col, Avatar, Badge, Menu } from "antd";
import { User, Discount, Setting, Password } from "react-iconly";

import menuImg from "../../assets/images/pages/profile/menu-img.svg";
import avatar from "../../assets/images/memoji/user1.png";
import { useSelector } from "react-redux";

const MenuProfile = (props) => {
  const { user } = useSelector((state) => state.auth);
  const menuIconClass = "remix-icon da-mr-8";

  const menuFooterItem = () => {
    if (props.footer !== "none") {
      return (
        <div className="da-profile-menu-footer">
          <img src={menuImg} alt="Profile Image" />
        </div>
      );
    }
  };

  const moreBtn = () => {
    if (props.moreBtnCheck !== "none") {
      return (
        <Col className="da-menu-header-btn da-pr-16 da-mb-12 da-text-right">
          {props.moreBtn()}
        </Col>
      );
    }
  };

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <Col flex="240px" className="da-profile-menu da-py-24">
      <div className="da-w-100">
        <div className="da-profile-menu-header da-mt-md-16 da-text-center">
          {moreBtn()}

          <Badge>
            <Avatar size={80} src={avatar} />
          </Badge>

          <h3 className="da-mt-24 da-mb-4">{user?.name}</h3>
          <a href={`mailto:${user?.email}`} className="da-p1-body">
            {user?.email}
          </a>
        </div>

        <Menu
          mode="inline"
          className="da-w-100 da-profile-menu-body"
          theme={"light"}
        >
          {/* Personal Information */}
          <Menu.Item
            key="1"
            icon={<User set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pl-24 da-pr-32
              ${
                splitLocation[splitLocation.length - 1] === "information"
                  ? "ant-menu-item-selected"
                  : "ant-menu-item-selected-in-active"
              }
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/profile/information">Personal Information</Link>
          </Menu.Item>

          {/* Subscription */}
          {user.role === "admin" && (
            <Menu.Item
              key="2"
              icon={<Discount set="curved" className={menuIconClass} />}
              className={`
              da-mb-16 da-pl-24 da-pr-32
              ${
                splitLocation[splitLocation.length - 1] === "subscription"
                  ? "ant-menu-item-selected"
                  : "ant-menu-item-selected-in-active"
              }
            `}
              onClick={props.onCloseDrawer}
            >
              <Link to="/profile/subscription">My Subscription</Link>
            </Menu.Item>
          )}

          {/* Security */}
          <Menu.Item
            key="3"
            icon={<Setting set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pl-24 da-pr-32
              ${
                splitLocation[splitLocation.length - 1] === "security"
                  ? "ant-menu-item-selected"
                  : "ant-menu-item-selected-in-active"
              }
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/profile/security">Security Settings</Link>
          </Menu.Item>

          {/* Password Change */}
          <Menu.Item
            key="4"
            icon={<Password set="curved" className={menuIconClass} />}
            className={`
              da-mb-16 da-pl-24 da-pr-32
              ${
                splitLocation[splitLocation.length - 1] === "password"
                  ? "ant-menu-item-selected"
                  : "ant-menu-item-selected-in-active"
              }
            `}
            onClick={props.onCloseDrawer}
          >
            <Link to="/profile/password">Password Change</Link>
          </Menu.Item>
        </Menu>
      </div>

      {menuFooterItem()}
    </Col>
  );
};

export default MenuProfile;
