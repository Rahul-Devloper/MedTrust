import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleButton } from "../../../components";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import {
  signupAction,
  googleLoginAction,
} from "../../../redux/actions/authActions";
import { Row, Col, Form, Input, Button } from "antd";
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
      ErrorNotification(error.response.data.type[0].message);
    }
  };

  // Handle google login success
  const handleGoogleSuccess = async (res) => {
    const userObjGoogle = await res?.profileObj;
    const { name, email } = userObjGoogle;

    // Dispatch name, email and history to action
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

                <Form.Item label="E-mail :">
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

              <Col className="da-account-buttons da-mt-32">
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_ID}`}
                  render={(renderProps) => (
                    <span>
                      <GoogleButton
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="remix-icon"
                        >
                          <path
                            d="M3.28826 8.39085L2.82415 10.1235L1.12782 10.1593C0.620865 9.21906 0.333313 8.14325 0.333313 7.00002C0.333313 5.89453 0.602167 4.85202 1.07873 3.93408H1.07909L2.5893 4.21096L3.25086 5.7121C3.1124 6.11578 3.03693 6.54911 3.03693 7.00002C3.03698 7.4894 3.12563 7.95828 3.28826 8.39085Z"
                            fill="#FBBB00"
                          />
                          <path
                            d="M13.5502 5.75455C13.6267 6.15783 13.6667 6.57431 13.6667 6.99996C13.6667 7.47726 13.6165 7.94283 13.5209 8.39192C13.1963 9.92012 12.3483 11.2545 11.1736 12.1989L11.1733 12.1985L9.27108 12.1014L9.00186 10.4208C9.78134 9.96371 10.3905 9.24832 10.7114 8.39192H7.14655V5.75455H10.7634H13.5502Z"
                            fill="#518EF8"
                          />
                          <path
                            d="M11.1732 12.1986L11.1736 12.1989C10.0311 13.1172 8.57981 13.6667 6.99997 13.6667C4.46114 13.6667 2.25382 12.2476 1.12781 10.1594L3.28825 8.39087C3.85124 9.89342 5.3007 10.963 6.99997 10.963C7.73036 10.963 8.41463 10.7656 9.00179 10.4209L11.1732 12.1986Z"
                            fill="#28B446"
                          />
                          <path
                            d="M11.2553 1.86812L9.09558 3.63624C8.4879 3.2564 7.76957 3.03697 6.99999 3.03697C5.26225 3.03697 3.78569 4.15565 3.2509 5.71208L1.0791 3.93406H1.07874C2.18827 1.79486 4.42342 0.333328 6.99999 0.333328C8.61756 0.333328 10.1007 0.909526 11.2553 1.86812Z"
                            fill="#F14336"
                          />
                        </svg>
                        <p>Sign up with Google</p>
                      </GoogleButton>
                    </span>
                  )}
                  onSuccess={handleGoogleSuccess}
                  onFailure={handleGoogleFailure}
                  cookiePolicy="single_host_origin"
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

export default Signup;
