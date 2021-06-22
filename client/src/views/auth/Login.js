import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { login } from "../../api/auth";
import Cookies from "js-cookie";
import googleLogo from "../../assets/google_logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Email login
  const handleSubmit = (e) => {
    // Submit email and password to server
    e.preventDefault();

    login(email, password)
      .then((res) => {
        // Extract the JWT that is sent from the server and set it to the browser cookie
        const token = res?.data.token;
        Cookies.set("token", token, { expires: 0.02 });
      })
      .catch((err) => {
        console.log("EMAIL_LOGIN_ERROR", err);
      });
  };

  // Handle google login success
  const handleGoogleSuccess = async (res) => {
    const result = await res?.profileObj;
    const token = await res?.tokenId;
    try {
      // Store the userObject and token in redux store
      dispatch({
        type: "GOOGLE_LOG_IN",
        data: { result, token },
      });
      // Set google JWT token to cookie
      dispatch({
        type: "GOOGLE_JWT_COOKIE",
        data: { token },
      });
    } catch (error) {
      console.log("GOOGLE_LOGIN_ERROR", error);
    }
  };

  const handleGoogleFailure = () => {
    console.log("Google log in failed. Try again later");
  };

  return (
    <>
      <EntryPage>
        <PageHeader to="/">SaaS Logo</PageHeader>
        <EntryCard>
          <h2>Log in</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <label htmlFor="login-email">Email Address</label>
              <Input
                type="text"
                placeholder="Enter email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="login-password">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Log in
            </Button>
          </form>
          <span>
            Don't have an account?
            <Link to="/signup">Sign up</Link>
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
                  <p>Log in with Google</p>
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

export default Login;
