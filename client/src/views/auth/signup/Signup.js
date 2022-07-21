import React, { useState } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  signupAction,
  googleLoginAction,
} from "../../../redux/actions/authActions";
import LeftContent from "../leftContent";
import { ErrorNotification } from "../../../components";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = ({ history }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Handle form change
  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle custom email sign up
  const handleEmailSignup = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // If fields are empty, throw error
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      ErrorNotification("Please fill in all fields");
      return;
    }

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        ErrorNotification("Passwords don't match");
        return;
      } else {
        // Dispatch name, email, and password
        dispatch(
          signupAction({
            name,
            email,
            password,
            setFormData,
            initialFormData,
            setLoading,
          })
        );
      }
    } catch (error) {
      console.log("SIGNUP_ERROR", error);
    }
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
    console.log("GOOGLE_SIGNUP_ERROR");
  };

  return (
    <>
      <Row gutter={[32, 0]} className="da-authentication-page">
        <LeftContent />

        <Col lg={12} span={24} className="da-py-sm-0 da-py-md-64">
          <Row className="da-h-100" align="middle" justify="center">
            <Col
              xxl={11}
              xl={15}
              lg={20}
              md={20}
              sm={24}
              className="da-px-sm-8 da-pt-24 da-pb-48"
            >
              <h1 className="da-mb-sm-0">Create Account</h1>

              <Form
                layout="vertical"
                name="basic"
                className="da-mt-sm-16 da-mt-32"
              >
                <Form.Item label="Name :" className="da-mb-16">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </Form.Item>

                <Form.Item label="Email :">
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </Form.Item>

                <Form.Item label="Password :">
                  <Input.Password
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </Form.Item>

                <Form.Item label="Confirm Password :">
                  <Input.Password
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                  />
                </Form.Item>

                <Form.Item className="da-mt-16 da-mb-8">
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    onClick={handleEmailSignup}
                    loading={loading}
                  >
                    Sign up
                  </Button>
                </Form.Item>
              </Form>

              <div className="da-form-info">
                <span className="da-text-color-black-80 da-text-color-dark-40 da-caption da-mr-4">
                  Already have an account?{" "}
                </span>

                <Link
                  to="/login"
                  className="da-text-color-primary-1 da-text-color-dark-primary-2 da-caption"
                >
                  Login
                </Link>
              </div>

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

export default Signup;
