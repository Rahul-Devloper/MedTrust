import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Divider, Switch, Button } from "antd";

const SecurityInfo = () => {
  const dividerClass = "da-border-color-black-40 da-border-color-dark-80";

  return (
    <div className="da-profile-security">
      <h2>Security Settings</h2>
      <p className="da-p1-body da-mb-0">
        These settings help you keep your account secure.
      </p>

      <Divider className={dividerClass} />

      <Row align="middle" justify="space-between">
        <Col md={12}>
          <h3>Save my Activity Logs</h3>
          <p className="da-p1-body da-mb-0">
            You can save your all activity logs including unusual activity
            detected.
          </p>
        </Col>

        <Col className="da-mt-md-24">
          <Switch disabled />
        </Col>
      </Row>

      <Divider className={dividerClass} />

      <Row align="middle" justify="space-between">
        <Col md={12}>
          <h3>Change Password</h3>
          <p className="da-p1-body da-mb-0">
            Set a unique password to protect your account.
          </p>
        </Col>

        <Col className="da-mt-md-24">
          <Link to="/profile/password">
            <Button type="primary">Change Password</Button>
          </Link>
        </Col>
      </Row>

      <Divider className={dividerClass} />

      <Row align="middle" justify="space-between">
        <Col md={12}>
          <h3>2 Factor Auth</h3>
          <p className="da-p1-body da-mb-0">
            Secure your account with 2FA security. When it is activated you will
            need to enter not only your password, but also a special code using
            app. You can receive this code by in mobile app.
          </p>
        </Col>

        <Col className="da-mt-md-24">
          <Button type="primary" disabled>
            Disable
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SecurityInfo;
