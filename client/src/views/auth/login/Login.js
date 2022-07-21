import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import LeftContent from "../leftContent";
import {
  loginAction,
  googleLoginAction,
} from "../../../redux/actions/authActions";
import { ErrorNotification } from "../../../components";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Handle email password login
  const handleLoginSubmit = (e) => {
    // Validate email regex
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      ErrorNotification("Please enter a valid email");
      return;
    }

    // Make sure the password is at least 6 characters
    if (password.length < 6) {
      ErrorNotification("Please enter a valid password");
      return;
    }

    e.preventDefault();
    // Dispatch email, password and history to action
    dispatch(loginAction({ email, password, history, setLoading }));
  };

  // Handle google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    const userObject = jwt_decode(credentialResponse.credential);
    const { name, email } = userObject;
    setLoading(true);

    // Dispatch email, password and history to action
    dispatch(googleLoginAction({ name, email, history }));
  };

  // Handle google login failure
  const handleGoogleFailure = () => {
    console.log("GOOGLE_LOGIN_ERROR");
  };

  return (
    <>
      <Row className="da-authentication-page">
        <Col
          md={12}
          lg={12}
          xl={12}
          className="da-bg-color-primary-4 da-bg-color-dark-9"
        >
          <LeftContent />
        </Col>

        <Col lg={12} md={12} sm={12} className="da-py-sm-0 da-py-md-64">
          <Row className="da-h-100" align="middle" justify="center">
            <Col
              xxl={11}
              xl={15}
              lg={20}
              md={20}
              sm={24}
              className="da-px-sm-8 da-pt-24 da-pb-48"
            >
              <h1 className="da-mb-sm-0">Login</h1>
              <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
                Welcome back, please login to your account.
              </p>

              <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                className="da-mt-sm-16 da-mt-32"
              >
                <Form.Item
                  label="Email :"
                  className="da-mb-16"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input
                    id="validating"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Password :"
                  className="da-mb-8"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    id="warning2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Row align="middle" justify="space-between">
                  <Form.Item className="da-mb-0">
                    <Checkbox name="remember">Remember me</Checkbox>
                  </Form.Item>

                  <Link
                    className="da-button da-text-color-black-80 da-text-color-dark-40"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </Row>

                <Form.Item className="da-mt-16 da-mb-8">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={handleLoginSubmit}
                    loading={loading}
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>

              <Col className="da-form-info">
                <span className="da-text-color-black-80 da-text-color-dark-40 da-caption da-mr-4">
                  Don’t you have an account?
                </span>

                <Link
                  className="da-text-color-primary-1 da-text-color-dark-primary-2 da-caption"
                  to="/signup"
                >
                  {" "}
                  Create an account
                </Link>
              </Col>

              <Col className="da-or-line da-text-center da-mt-32">
                <span className="da-caption da-text-color-black-80 da-text-color-dark-30 da-px-16 da-bg-color-black-0 da-bg-color-dark-100">
                  Or
                </span>
              </Col>

              <Col
                className="da-account-buttons da-mt-32"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleSuccess(credentialResponse);
                  }}
                  onError={() => {
                    handleGoogleFailure();
                  }}
                />
              </Col>

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

export default Login;
