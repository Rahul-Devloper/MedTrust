import React from "react";
import { Row, Col } from "antd";
import { PasswordInfo } from "../../components";

const MyPassword = () => {
  return (
    <>
      <Row
        style={{
          paddingLeft: "50px",
          paddingRight: "40px",
        }}
      >
        <Col span={24}>
          <PasswordInfo />
        </Col>
      </Row>
    </>
  );
};

export default MyPassword;
