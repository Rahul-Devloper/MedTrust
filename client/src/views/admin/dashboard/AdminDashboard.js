import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Row gutter={[32, 0]}>
        <Col span={24}>
          <h2
            style={{
              marginLeft: "10px",
            }}
          >
            Welcome, {user?.name.split(" ")[0]} 👋
          </h2>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
