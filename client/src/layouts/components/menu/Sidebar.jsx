import React, { useState, createElement, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Layout, Button, Row, Col } from "antd";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { motion } from "framer-motion/dist/framer-motion";

import logoSmall from "../../../assets/images/logo/logo.svg";
import { redirectToDashboard } from "../../../utils/roleBasedRedirect";

import MenuLogo from "./logo";
import MenuFooter from "./footer";
import MenuItem from "./item";
import MenuMobile from "./mobile";

const { Sider } = Layout;

const Sidebar = (props) => {
  const { visible, setVisible } = props;

  // Redux
  const customize = useSelector((state) => state.customize);
  const { user } = useSelector((state) => state.auth);

  // Collapsed
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (customize.sidebarCollapsed) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [customize]);

  // Mobile Sidebar
  const onClose = () => {
    setVisible(false);
  };

  // Menu
  function toggle() {
    setCollapsed(!collapsed);
  }

  const trigger = createElement(collapsed ? RiMenuUnfoldLine : RiMenuFoldLine, {
    className: "trigger",
    onClick: toggle,
  });

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        showProgress={true}
        width={256}
        className="hp-sidebar hp-bg-black-20 hp-bg-color-dark-90 hp-border-right-1 hp-border-color-black-40 hp-border-color-dark-80"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
          className="hp-d-flex hp-h-100"
          style={{ flexDirection: "column" }}
        >
          <Row align="bottom" justify="space-between">
            {/* Expanded Logo */}
            <Col>
              {collapsed === false ? <MenuLogo onClose={onClose} /> : ""}
            </Col>

            {customize.sidebarCollapseButton &&
              (collapsed === false ? (
                <Col className="hp-pr-0">
                  <div className="hp-cursor-pointer" onClick={toggle}>
                    <svg
                      width="8"
                      height="15"
                      viewBox="0 0 8 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.91102 1.73796L0.868979 4.78L0 3.91102L3.91102 0L7.82204 3.91102L6.95306 4.78L3.91102 1.73796Z"
                        fill="#B2BEC3"
                      />
                      <path
                        d="M3.91125 12.0433L6.95329 9.00125L7.82227 9.87023L3.91125 13.7812L0.000224113 9.87023L0.869203 9.00125L3.91125 12.0433Z"
                        fill="#B2BEC3"
                      />
                    </svg>
                  </div>
                </Col>
              ) : (
                <Col span={24} className="hp-d-flex-full-center">
                  <div className="hp-cursor-pointer" onClick={toggle}>
                    <svg
                      width="8"
                      height="15"
                      viewBox="0 0 8 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Path right expand arrow */}
                      <path
                        d="M3.91102 1.73796L0.868979 4.78L0 3.91102L3.91102 0L7.82204 3.91102L6.95306 4.78L3.91102 1.73796Z"
                        fill="#B2BEC3"
                      />
                      {/* Path left expand arrow */}
                      <path
                        d="M3.91125 12.0433L6.95329 9.00125L7.82227 9.87023L3.91125 13.7812L0.000224113 9.87023L0.869203 9.00125L3.91125 12.0433Z"
                        fill="#B2BEC3"
                      />
                    </svg>
                  </div>
                </Col>
              ))}

            {/* Collapsed Logo */}
            {collapsed && (
              <Col span={24} className="hp-mt-12 hp-d-flex-full-center">
                <Link to={redirectToDashboard(user)} onClick={onClose}>
                  <img
                    className="hp-logo"
                    src={logoSmall}
                    alt="logo"
                    style={{ backgroundColor: "transparent" }}
                  />
                </Link>
              </Col>
            )}
          </Row>

          <MenuItem onClose={onClose} />

          <MenuFooter onClose={onClose} collapsed={collapsed} />
          <MenuMobile onClose={onClose} visible={visible} />
        </motion.div>
      </Sider>
    </>
  );
};

export default Sidebar;
