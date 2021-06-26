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
import { signUp, googleCreateOrLogin } from "../../api/auth";
import googleLogo from "../../assets/google_logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // Handle form change
  const handleFormChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle custom email sign up
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return;
      } else {
        setLoading(true);
        // Submit name, email & password to the server
        signUp(name, email, password)
          .then((res) => {
            // Check for errors
            if (res.data.error) {
              toast.error(res.data.type[0].message);
            }
            toast.success(res.data.message);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("SIGNUP_USER_ERROR", err);
          });
      }
    } catch (error) {
      console.log("SIGNUP_ERROR", error);
    }
  };

  // Handle google signup success
  const handleGoogleSuccess = async (res) => {
    const user = await res?.profileObj;
    const { name, email } = user;

    setLoading(true);
    googleCreateOrLogin(name, email)
      .then((res) => {
        const { token } = res.data;
        // Store the userObject and token in redux store & set cookie
        dispatch({
          type: "GOOGLE_LOG_IN",
          data: { user, token },
        });
        setLoading(false);
        // Push user to dashboard on successful login
        history.push("/user/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        console.log("GOOGLE_SIGNUP_ERROR", error);
      });
  };

  // Handle google login failure
  const handleGoogleFailure = () => {
    console.log("Google log in failed. Try again later");
  };

  return (
    <>
      <EntryPage>
        <PageHeader to="/">SaaS Logo</PageHeader>
        <EntryCard>
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
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
                  <img src={googleLogo} alt="Google Icon" />
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
