import React, { useState, createElement, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Layout, Button, Row, Col } from "antd";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import logoSmall from "../../../assets/images/logo/logo-vector-blue.png";
import { redirectToDashboard } from "../../../utils/roleBasedRedirect";

import MenuLogo from "./logo";
import MenuFooter from "./footer";
import MenuItem from "./item";
import MenuMobile from "./mobile";

const { Sider } = Layout;

const Sidebar = (props) => {
  const { visible, setVisible } = props;

  // Redux
  const dispatch = useDispatch();
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
        className="da-sidebar da-bg-color-black-0 da-bg-color-dark-100"
      >
        <Row
          className="da-mr-12 da-ml-24 da-mt-24"
          align="bottom"
          justify="space-between"
        >
          <Col>{collapsed === false ? <MenuLogo onClose={onClose} /> : ""}</Col>

          {customize.sidebarCollapseButton && (
            <Col className="da-pr-0">
              <Button
                icon={trigger}
                type="text"
                className="da-float-right da-text-color-dark-0"
              ></Button>
            </Col>
          )}

          {collapsed !== false && (
            <Col className="da-mt-8">
              <Link to={redirectToDashboard(user)} onClick={onClose}>
                <img
                  className="da-logo"
                  src={logoSmall}
                  alt="logo"
                  style={{
                    // Scale up
                    transform: "scale(1.4)",
                    marginLeft: "4px",
                  }}
                />
              </Link>
            </Col>
          )}
        </Row>

        <MenuItem onClose={onClose} />

        <MenuFooter onClose={onClose} collapsed={collapsed} />
      </Sider>
      <MenuMobile onClose={onClose} visible={visible} />
    </>
  );
};

export default Sidebar;
