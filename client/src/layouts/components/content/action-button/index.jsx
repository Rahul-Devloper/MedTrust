import React from "react";

import { Col, Row, Button } from "antd";
import { RiSettings4Line } from "react-icons/ri";

export default function ActionButton() {
  return (
    <Col>
      <Row align="middle">
        <Button type="primary" className="da-mr-sm-8 da-mr-16" ghost="true">
          Action
        </Button>

        <Button type="primary" icon={<RiSettings4Line />} />
      </Row>
    </Col>
  );
}
