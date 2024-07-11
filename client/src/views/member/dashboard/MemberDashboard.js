import React from "react";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

const MemberDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Row gutter={[32, 0]}>
        <Col span={24}>
          <h2
            style={{
              marginLeft: '10px',
            }}>
            Welcome, {user?.name.split(' ')[0]} 👋
          </h2>
        </Col>
      </Row>
    </>
  )
};

export default MemberDashboard;
