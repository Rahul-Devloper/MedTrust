import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  EntryCard,
  InputGroup,
  Input,
  Button,
  EntryPage,
  PageHeader,
  GoogleContainer,
} from "../../components";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import {
  signupAction,
  googleLoginAction,
} from "../../redux/actions/authActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = ({ history }) => {
  const [formData, setFormData] = useState(initialFormData);
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

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      } else {
        // Dispatch email, password and history to action
        dispatch(signupAction({ name, email, password, history }));
      }
    } catch (error) {
      console.log("SIGNUP_ERROR", error);
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
    console.log("GOOGLE_LOGIN_ERROR");
  };

  return (
    <>
      <EntryPage>
        <PageHeader to="/">SaaS Logo</PageHeader>
        <EntryCard>
          <h2>Sign up</h2>
          <form onSubmit={handleEmailSignup}>
            <InputGroup>
              <label htmlFor="signup-name">Full name</label>
              <Input
                type="text"
                placeholder="Enter full name"
                id="signup-name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="signup-email">Email address</label>
              <Input
                type="text"
                placeholder="Enter email"
                id="signup-email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="signup-password">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                id="signup-password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                required
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="signup-password">Confirm password</label>
              <Input
                type="password"
                placeholder="Confirm password"
                id="signup-confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormChange}
                required
              />
            </InputGroup>
            <Button type="submit">Sign up</Button>
          </form>
          <span>
            Already have an account?
            <Link to="/login">Log in</Link>
          </span>
          <br />
          <br />
          <hr />
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_ID}`}
            render={(renderProps) => (
              <span>
                <GoogleContainer
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img alt="Google Icon" />
                  <p>Sign up with Google</p>
                </GoogleContainer>
              </span>
            )}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy="single_host_origin"
          />
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default Signup;
