import React, { useState, useEffect } from "react";
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
import { login, googleCreateOrLogin } from "../../api/auth";
import googleLogo from "../../assets/google_logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Cookies from "js-cookie";

const Login = ({ history }) => {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("Abcd1234!");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Role based redirect upon login
  const roleBasedRedirect = (res) => {
    const intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.user.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/dashboard");
      }
    }
  };

  // Email login
  const handleSubmit = (e) => {
    // Submit email and password to server
    e.preventDefault();
    setLoading(true);
    login(email, password)
      .then((res) => {
        // Store the userObject and token in redux store & set cookie
        const { user, accessToken, refreshToken } = res.data;
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: user.name,
            email: user.email,
            role: user.role,
            access: accessToken,
            refresh: refreshToken,
            _id: user._id,
          },
        });
        if (res.data.error) {
          toast.error(res.data.type[0].message);
        }
        // Role based redirect upon successful login
        roleBasedRedirect(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("EMAIL_LOGIN_ERROR", err);
      });
  };

  // Handle google login success
  const handleGoogleSuccess = async (res) => {
    const userObjGoogle = await res?.profileObj;
    const { name, email } = userObjGoogle;

    setLoading(true);
    googleCreateOrLogin(name, email)
      .then((res) => {
        const { user, accessToken, refreshToken } = res.data;
        // Store the userObject and token in redux store & set cookie
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: user.name,
            email: user.email,
            role: user.role,
            access: accessToken,
            refresh: refreshToken,
            _id: user._id,
          },
        });
        setLoading(false);
        // Role based redirect upon successful login
        roleBasedRedirect(res);
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
