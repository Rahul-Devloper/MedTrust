import React from "react";

import { Row, Col, Divider, Form, Input, Button } from "antd";
import { InfoNotification } from "../Notification/ToastNotification";

const PasswordInfo = () => {
  const dividerClass = "da-border-color-black-40 da-border-color-dark-80";

  return (
    <Row>
      <Col span={24}>
        <h2>Change Password</h2>
        <p className="da-p1-body da-mb-0">
          Set a unique password to protect your account.
        </p>

        <Divider className={dividerClass} />
      </Col>

      <Col xxl={5} xl={10} md={15} span={24}>
        <Form layout="vertical" name="basic">
          <Form.Item
            label="Old Password :"
            className="da-mb-8"
            rules={[{ required: true, message: "Please enter your password" }]}
            name="old-password"
          >
            <Input.Password placeholder="Enter old password" id="validating" />
          </Form.Item>

          <Form.Item
            label="New Password :"
            className="da-mb-8"
            rules={[{ required: true, message: "Please enter password" }]}
            name="new-password"
          >
            <Input.Password placeholder="Enter new password" id="validating" />
          </Form.Item>

          <Form.Item
            label="Confirm Password :"
            className="da-mb-8"
            rules={[{ required: true, message: "Please enter your password" }]}
            name="confirm-new-password"
          >
            <Input.Password
              placeholder="Confirm new password"
              id="validating"
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              onClick={() =>
                InfoNotification("Change password from login page")
              }
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default PasswordInfo;
