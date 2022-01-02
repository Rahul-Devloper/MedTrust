import { Col, Layout, Row } from "antd";
import themeConfig from "../../../configs/themeConfig.jsx";

const { Footer } = Layout;

const MenuFooter = () => {
  return (
    <Footer className="da-bg-color-black-10 da-bg-color-dark-100">
      <Row align="middle" justify="space-between">
        <Col md={12} span={24}>
          <p className="da-badge-text da-mb-0 da-text-color-dark-30">
            COPYRIGHT ©2021 Hypeople, All rights Reserved
          </p>
        </Col>

        <Col
          md={12}
          span={24}
          className="da-mt-sm-8 da-text-sm-center da-text-right"
        >
          <a
            href="https://trello.com/b/8ZRmDN5y/yoda-roadmap"
            target="_blank"
            className="da-badge-text da-text-color-dark-30"
          >
            🥁 Version: {themeConfig.version}
          </a>
        </Col>
      </Row>
    </Footer>
  );
};

export default MenuFooter;
