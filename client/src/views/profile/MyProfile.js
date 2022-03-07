import React from "react";
import { Row, Col } from "antd";
import { ProfileInfo } from "../../components";

const MyProfile = () => {
  return (
    <>
      <Row
        style={{
          paddingLeft: "50px",
          paddingRight: "40px",
        }}
      >
        <Col span={24}>
          <ProfileInfo />
        </Col>
      </Row>
    </>
  );
};

export default MyProfile;
