import React, { useState } from "react";

import { useSelector } from "react-redux";

import { Layout, Row, Col } from "antd";

import Sidebar from "./components/menu/Sidebar";
import MenuHeader from "./components/header";
import ScrollTop from "./components/scroll-to-top";
const { Content } = Layout;

const VerticalLayout = (props) => {
  const { children } = props;
  const [visible, setVisible] = useState(false);

  // Redux
  const customize = useSelector((state) => state.customize);

  return (
    <Layout className="hp-app-layout">
      {/* Sidebar */}
      <Sidebar visible={visible} setVisible={setVisible} />

      <Layout className="hp-bg-black-20 hp-bg-color-dark-90">
        <MenuHeader setVisible={setVisible} />

        <Content className="hp-content-main">
          <Row justify="center">
            {customize.contentWidth === "full" && (
              <Col span={24}>{children}</Col>
            )}

            {customize.contentWidth === "boxed" && (
              <Col xxl={20} xl={22} span={24}>
                {children}
              </Col>
            )}
          </Row>
        </Content>
      </Layout>

      <ScrollTop />
    </Layout>
  );
};

export default VerticalLayout;
