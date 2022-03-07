import React from "react";
import { Row, Col } from "antd";
import { SecurityInfo } from "../../components";

const MySecurity = () => {
  return (
    <>
      <Row
        style={{
          paddingLeft: "50px",
          paddingRight: "40px",
        }}
      >
        <Col span={24}>
          <SecurityInfo />
        </Col>
      </Row>
    </>
  );
};

export default MySecurity;
