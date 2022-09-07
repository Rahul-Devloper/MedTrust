import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

const Privacy = () => {
  return (
    <Row
      className="hp-bg-color-primary-4 hp-bg-color-dark-100"
      style={{
        height: "100vh",
      }}
    >
      <Col className="hp-error-content hp-py-32" span={24}>
        <Row className="hp-h-100" align="middle" justify="center">
          <Col xxl={11} xl={15} lg={20} md={20} sm={24}>
            <h1 className="hp-mb-sm-0">Privacy Policy</h1>
            <br />
            <h3>Your privacy is critically important to us.</h3>
            <br />
            <p>
              It is Netraga's policy to respect your privacy regarding any
              information we may collect from you across our website, and other
              sites we own and operate.
            </p>
            We don't share your information with anyone except to comply with
            the law, develop our products, or protect our rights.
            <br />
            <br />
            Like most website operators, Netraga collects
            non-personally-identifying information of the sort that web browsers
            and servers typically make available, such as the browser type,
            language preference, referring site, and the date and time of each
            visitor request.
            <br />
            <br />
            Although most changes are likely to be minor, Netraga may change its
            Privacy Policy from time to time, and in Netraga's sole discretion.
            Netraga encourages visitors to frequently check this page for any
            changes to its Privacy Policy. Your continued use of this site after
            any change in this Privacy Policy will constitute your acceptance of
            such change.
            <br />
            <br />
            <Col
              className="hp-other-links hp-mt-24"
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Link
                to="/login"
                className="hp-text-color-black-80 hp-text-color-dark-40"
              >
                <Button type="primary">Go back</Button>
              </Link>
            </Col>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Privacy;
