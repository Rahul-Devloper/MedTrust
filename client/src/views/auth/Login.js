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
import {
  loginAction,
  googleLoginAction,
} from "../../redux/actions/authActions";
import googleLogo from "../../assets/google_logo.png";
import "react-toastify/dist/ReactToastify.min.css";

const Login = ({ history }) => {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("Abcd1234!");
  const dispatch = useDispatch();

  // Handle email password login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Dispatch email, password and history to action
    dispatch(loginAction({ email, password, history }));
  };

  // Handle google login success
  const handleGoogleSuccess = async (res) => {
    const userObjGoogle = await res?.profileObj;
    const { name, email } = userObjGoogle;

    // Dispatch email, password and history to action
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
          <h2>Log in</h2>
          <form onSubmit={(e) => handleLoginSubmit(e)}>
            <InputGroup>
              <label htmlFor="login-email">Email Address</label>
              <Input
                type="text"
                placeholder="Enter email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
              />
            </InputGroup>
            <Button type="submit">Log in</Button>
          </form>
          <span>
            <Link to="/forgot-password">Forgot your password?</Link>
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
          <span>
            Don't have an account?
            <Link to="/signup">Sign up</Link>
          </span>
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default Login;
