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
import { login, googleCreateOrLogin } from "../../api/auth";
import googleLogo from "../../assets/google_logo.png";

const Login = () => {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("Abcd1234!");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // Email login
  const handleSubmit = (e) => {
    // Submit email and password to server
    e.preventDefault();
    setLoading(true);
    login(email, password)
      .then((res) => {
        // Store the userObject and token in redux store & set cookie
        const { user, token } = res.data;
        dispatch({
          type: "EMAIL_LOG_IN",
          data: { user, token },
        });
        setLoading(false);
        // Push user to dashboard on successful login
        history.push("/user/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        console.log("EMAIL_LOGIN_ERROR", err);
      });
  };

  // Handle google login success
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
        console.log("GOOGLE_LOGIN_ERROR", error);
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
          <h2>Log in</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
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
            <Button type="submit">Log in</Button>
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
