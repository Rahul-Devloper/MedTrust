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
  GithubContainer,
  TwitterContainer,
} from "../../components";
import { login, googleSignup } from "../../api/auth";
import Cookies from "js-cookie";
import googleLogo from "../../assets/google_logo.png";
import githubLogo from "../../assets/github_logo.png";
import twitterLogo from "../../assets/twitter_logo.png";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // Submit email and password to server
    e.preventDefault();

    login(email, password)
      .then((res) => {
        // Extract the JWT that is sent from the server and set it to the browser cookie
        const token = res.data.token;
        Cookies.set("token", token, { expires: 0.02 });
        history.push("/user/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = (e) => {
    window.open(`http://localhost:8000/api/auth/google`, "_self");
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
          <br />
          <br />
          <hr />

          <span>
            <GoogleContainer onClick={(e) => handleGoogleLogin(e)}>
              <img src={googleLogo} alt="Google Icon" />
              <p>Log in with Google</p>
            </GoogleContainer>
          </span>
          <span>
            <GithubContainer>
              <img src={githubLogo} alt="Github Icon" />
              <p>Log in with Github</p>
            </GithubContainer>
          </span>
          <span>
            <TwitterContainer>
              <img src={twitterLogo} alt="Twitter Icon" />
              <p>Log in with Twitter</p>
            </TwitterContainer>
          </span>
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default Login;
