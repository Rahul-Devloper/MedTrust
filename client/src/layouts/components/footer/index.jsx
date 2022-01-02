import { Col, Layout, Row } from "antd";

const { Footer } = Layout;

const MenuFooter = () => {
  return (
    <Footer className="da-bg-color-black-10 da-bg-color-dark-100">
      <Row align="middle" justify="center">
        <Col md={12} span={24}>
          <p className="da-badge-text da-mb-0 da-text-color-dark-30">
            COPYRIGHT ©2021 Netraga, All rights Reserved
          </p>
        </Col>
      </Row>
    </Footer>
  );
};

export default MenuFooter;
