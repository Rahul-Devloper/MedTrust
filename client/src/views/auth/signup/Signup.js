import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Checkbox } from "antd";
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
};

const Signup = ({ history }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [agree, setAgree] = useState(false);
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
    const { name, email, password } = formData;

    // If fields are empty, throw error
    if (name === "" || email === "" || password === "") {
      ErrorNotification("Please fill in all fields");
      return;
    }

    // If not agreed, show error
    if (!agree) {
      ErrorNotification("You need to agree to the terms and conditions");
      return;
    }

    try {
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
      <Row gutter={[32, 0]} className="hp-authentication-page">
        <LeftContent />

        <Col lg={12} span={24} className="hp-py-sm-0 hp-py-md-64">
          <Row className="hp-h-100" align="middle" justify="center">
            <Col
              xxl={11}
              xl={15}
              lg={20}
              md={20}
              sm={24}
              className="hp-px-sm-8 hp-pt-24 hp-pb-48"
            >
              <h1 className="hp-mb-sm-0">Create Account</h1>

              <Form
                layout="vertical"
                name="basic"
                className="hp-mt-sm-16 hp-mt-32"
              >
                <Form.Item label="Name :" className="hp-mb-16">
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

                {/* Check box agreeing to terms and privacy */}
                <Form.Item>
                  <Row>
                    <Col span={24}>
                      <Checkbox
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="hp-text-color-blue-100 hp-text-color-dark-80"
                        >
                          Term of use
                        </Link>{" "}
                        &{" "}
                        <Link
                          to="/privacy"
                          className="hp-text-color-blue-100 hp-text-color-dark-80"
                        >
                          Privacy policy
                        </Link>
                      </Checkbox>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item className="hp-mt-16 hp-mb-8">
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

              <div className="hp-form-info">
                <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                  Already have an account?{" "}
                </span>

                <Link
                  to="/login"
                  className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
                >
                  Login
                </Link>
              </div>

              <Col className="hp-or-line hp-text-center hp-mt-16">
                <span className="hp-caption hp-text-color-black-80 hp-text-color-dark-30 hp-px-16 hp-bg-color-black-0 hp-bg-color-dark-100">
                  Or
                </span>
              </Col>

              <Col
                className="hp-account-buttons hp-mt-16"
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

export default Signup;
