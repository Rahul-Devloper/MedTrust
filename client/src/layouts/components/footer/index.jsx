import { Col, Layout, Row } from "antd";

const { Footer } = Layout;

const MenuFooter = () => {
  return (
    <Footer className="da-bg-color-black-10 da-bg-color-dark-100">
      <Row
        align="center"
        justify="center"
        style={{
          marginLeft: "60px",
        }}
      >
        <Col md={6} span={24}>
          <p className="da-badge-text da-mb-0 da-text-color-dark-30">
            Copyright ©2021 <strong>Netraga Inc.</strong>, All Rights Reserved
          </p>
        </Col>
      </Row>
    </Footer>
  );
};

export default MenuFooter;
