import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button } from "antd";
import LeftContent from "../leftContent";
import { resetPassword } from "../../../api/auth";
import { SuccessNotification, ErrorNotification } from "../../../components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Reset Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate Email
    if (!email) {
      ErrorNotification("Please enter your email");
      return;
    }

    setLoading(true);
    // Make the API call
    resetPassword(email)
      .then((res) => {
        if (res.data.error) {
          ErrorNotification(res.data.type[0].message);
        }
        SuccessNotification(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        ErrorNotification(err.response.data.type[0].message);
      });
  };

  return (
    <>
      <Row gutter={[32, 0]} className="hp-authentication-page">
        <LeftContent />

        <Col md={12}>
          <Row className="hp-h-100" align="middle" justify="center">
            <Col
              xxl={11}
              xl={15}
              lg={20}
              md={20}
              sm={24}
              className="hp-px-sm-8 hp-pt-24 hp-pb-48"
            >
              <h1 className="hp-mb-sm-0">Reset Password</h1>
              <p className="hp-mt-sm-0 hp-mt-8 hp-text-color-black-60">
                We’ll e-mail you instructions on how to reset your password.
              </p>

              <Form
                layout="vertical"
                name="basic"
                className="hp-mt-sm-16 hp-mt-32"
              >
                <Form.Item label="E-mail :">
                  <Input
                    id="validating"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item className="hp-mt-16 hp-mb-8">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>

              <div className="hp-form-info">
                <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                  Go back to{" "}
                </span>

                <Link
                  to="/login"
                  className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
                >
                  Login
                </Link>
              </div>

              <Col
                className="hp-other-links hp-mt-24"
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Link
                  to="/privacy"
                  className="hp-text-color-black-80 hp-text-color-dark-40"
                  style={{
                    marginRight: "8px",
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="hp-text-color-black-80 hp-text-color-dark-40"
                >
                  Term of use
                </Link>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
