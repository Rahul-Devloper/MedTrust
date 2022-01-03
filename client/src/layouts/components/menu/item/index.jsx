import React from "react";
import { useLocation, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Menu } from "antd";

import navigation from "../../../navigation/vertical";

const MenuItem = (props) => {
  const { onClose } = props;

  // Redux
  const customize = useSelector((state) => state.customize);

  // Location
  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const menuItem = navigation.map((item, index) => {
    const itemNavLink = item.navLink.split("/");

    return (
      // Level 1
      <Menu.Item
        key={item.id}
        icon={item.icon}
        onClick={onClose}
        className={
          splitLocation[splitLocation.length - 2] +
            "/" +
            splitLocation[splitLocation.length - 1] ===
          itemNavLink[itemNavLink.length - 2] +
            "/" +
            itemNavLink[itemNavLink.length - 1]
            ? "ant-menu-item-selected"
            : "ant-menu-item-selected-in-active"
        }
      >
        <Link to={item.navLink}>{item.title}</Link>
      </Menu.Item>
    );
  });

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={[
        splitLocation.length === 5
          ? splitLocation[splitLocation.length - 3]
          : null,
        splitLocation[splitLocation.length - 2],
      ]}
      theme={customize.theme === "light" ? "light" : "dark"}
    >
      {menuItem}
    </Menu>
  );
};

export default MenuItem;
