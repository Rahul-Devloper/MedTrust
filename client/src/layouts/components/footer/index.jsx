import { Col, Layout, Row } from "antd";

const { Footer } = Layout;

const MenuFooter = () => {
  return (
    <Footer className='hp-bg-color-black-10 hp-bg-color-dark-100'>
      <Row
        align='center'
        justify='center'
        style={{
          marginLeft: '60px',
        }}>
        <Col md={6} span={24}>
          <p className='hp-badge-text hp-mb-0 hp-text-color-dark-30'>
            Copyright ©2024 <strong>MedTrust Inc.</strong>, All Rights Reserved
          </p>
        </Col>
      </Row>
    </Footer>
  )
};

export default MenuFooter;
