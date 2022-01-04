import React, { useRef, useState } from "react";

import { useSelector } from "react-redux";

import { Layout, Button, Row, Col } from "antd";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import { Search } from "react-iconly";

import HeaderSearch from "./HeaderSearch";
import HeaderUser from "./HeaderUser";
import HeaderNotifications from "./HeaderNotifications";
import HeaderText from "./HeaderText";

const { Header } = Layout;

const MenuHeader = (props) => {
  const { setVisible } = props;

  const [searchHeader, setSearchHeader] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  // Redux
  const customize = useSelector((state) => state.customize);

  // Focus
  const inputFocusRef = useRef(null);
  const inputFocusProp = {
    ref: inputFocusRef,
  };

  // Search Active
  setTimeout(() => setSearchActive(searchHeader), 100);

  const searchClick = () => {
    setSearchHeader(true);

    setTimeout(() => {
      inputFocusRef.current.focus({
        cursor: "start",
      });
    }, 200);
  };

  // Mobile Sidebar
  const showDrawer = () => {
    setVisible(true);
    setSearchHeader(false);
  };

  // Children
  const headerChildren = () => {
    return (
      <Row
        className="da-w-100 da-position-relative"
        align="middle"
        justify="space-between"
      >
        <Col className="da-mobile-sidebar-button da-mr-24">
          <Button
            className="da-mobile-sidebar-button"
            type="text"
            onClick={showDrawer}
            icon={
              <RiMenuFill
                size={24}
                className="remix-icon da-text-color-black-80 da-text-color-dark-30"
              />
            }
          />
        </Col>

        <Col
          flex="1"
          style={{ display: !searchHeader ? "none" : "block" }}
          className={`da-pr-md-0 da-pr-16 da-header-search ${
            searchActive && "da-header-search-active"
          }`}
        >
          <HeaderSearch
            inputFocusProp={inputFocusProp}
            setSearchHeader={setSearchHeader}
          />
        </Col>

        {!searchHeader && <HeaderText />}

        <Col>
          <Row align="middle">
            <Col className="da-d-flex-center da-mr-4">
              {!searchHeader ? (
                <Button
                  type="text"
                  icon={
                    <Search set="curved" className="da-text-color-black-60" />
                  }
                  onClick={() => searchClick()}
                />
              ) : (
                <Button
                  type="text"
                  icon={
                    <RiCloseLine size={24} className="da-text-color-black-60" />
                  }
                  onClick={() => setSearchHeader(false)}
                />
              )}
            </Col>

            <HeaderNotifications />

            <HeaderUser />
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <Header>
      <Row justify="center" className="da-w-100">
        {customize.contentWidth === "full" && (
          <Col span={24}>{headerChildren()}</Col>
        )}

        {customize.contentWidth === "boxed" && (
          <Col xxl={20} xl={22} span={24}>
            {headerChildren()}
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default MenuHeader;
