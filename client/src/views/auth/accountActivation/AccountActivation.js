import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import LeftContent from "../leftContent";
import { useLocation, Link } from "react-router-dom";
import { accountActivate, resendVerification } from "../../../api/auth";
import { SuccessNotification, ErrorNotification } from "../../../components";

const AccountActivation = () => {
  const [email, setEmail] = useState("");
  const [expired, setExpired] = useState(false);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  useEffect(() => {
    // Send token to the server
    accountActivate(token)
      .then((res) => {
        SuccessNotification(res.data.message);
      })
      .catch((err) => {
        if (err.response.data.type[0].message === "Account already activated") {
          ErrorNotification(err.response.data.type[0].message);
        } else if (
          err.response.data.type[0].message ===
          "Token is not valid or expired, enter email to resend verification"
        ) {
          ErrorNotification(err.response.data.type[0].message);
          setExpired(true);
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make the API call
    resendVerification(email)
      .then((res) => {
        SuccessNotification(res.data.message);
      })
      .catch((err) => {
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
              <h1>
                {expired
                  ? "Resend Verification"
                  : "Successfully activated account"}
              </h1>

              {expired ? (
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
                    >
                      Resend Verification
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <div className="da-mt-16 da-mb-8">
                  <Link to="/login">
                    <Button block type="primary">
                      Login
                    </Button>
                  </Link>
                </div>
              )}

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

export default AccountActivation;
