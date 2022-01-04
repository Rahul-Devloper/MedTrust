import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { newPassword } from "../../../api/auth";
import { Row, Col, Form, Input, Button } from "antd";
import LeftContent from "../leftContent";
import { toast } from "react-toastify";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  // Handle Reset Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Check if both the passwords match
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      } else {
        // Submit token & new password to the server
        newPassword(token, password)
          .then((res) => {
            toast.success(res.data.message);
            setSuccess(true);
          })
          .catch((err) => {
            toast.error(err.response.data.type[0].message);
          });
      }
    } catch (error) {
      console.log("SET_PASSWORD_ERROR", error);
    }
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
                {!success ? "Reset Password" : "Successfully changed password"}
              </h1>

              {!success ? (
                <Form
                  layout="vertical"
                  name="basic"
                  className="da-mt-sm-16 da-mt-32"
                >
                  <Form.Item label="Password :">
                    <Input.Password
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item label="Confirm Password :">
                    <Input.Password
                      id="confirm-password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item className="da-mt-16 da-mb-8">
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      onClick={handleSubmit}
                    >
                      Change Password
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
                  href="/privacy"
                  className="da-text-color-black-80 da-text-color-dark-40"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
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

export default NewPassword;
