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
      <Row gutter={[32, 0]} className="da-authentication-page">
        <LeftContent />

        <Col md={12}>
          <Row className="da-h-100" align="middle" justify="center">
            <Col
              xxl={11}
              xl={15}
              lg={20}
              md={20}
              sm={24}
              className="da-px-sm-8 da-pt-24 da-pb-48"
            >
              <h1 className="da-mb-sm-0">Reset Password</h1>
              <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
                We’ll e-mail you instructions on how to reset your password.
              </p>

              <Form
                layout="vertical"
                name="basic"
                className="da-mt-sm-16 da-mt-32"
              >
                <Form.Item label="E-mail :">
                  <Input
                    id="validating"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item className="da-mt-16 da-mb-8">
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

              <div className="da-form-info">
                <span className="da-text-color-black-80 da-text-color-dark-40 da-caption da-mr-4">
                  Go back to{" "}
                </span>

                <Link
                  to="/login"
                  className="da-text-color-primary-1 da-text-color-dark-primary-2 da-caption"
                >
                  Login
                </Link>
              </div>

              <Col
                className="da-other-links da-mt-24"
                style={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Link
                  to="/privacy"
                  className="da-text-color-black-80 da-text-color-dark-40"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="da-text-color-black-80 da-text-color-dark-40"
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
