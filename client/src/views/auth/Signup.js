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
import { signUp } from "../../api/auth";
import googleLogo from "../../assets/google_logo.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    // Submit email and password to server
    e.preventDefault();

    signUp(email, password)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleSignup = (e) => {
    window.open(`http://localhost:8000/api/auth/google`, "_self");
  };

  return (
    <>
      <EntryPage>
        <PageHeader to="/">SaaS Logo</PageHeader>
        <EntryCard>
          <h2>Sign up</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <label htmlFor="signup-name">Full name</label>
              <Input
                type="text"
                placeholder="Enter full name"
                id="signup-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="signup-email">Email address</label>
              <Input
                type="text"
                placeholder="Enter email"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="signup-password">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="signup-password">Confirm password</label>
              <Input
                type="password"
                placeholder="Confirm password"
                id="signup-confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputGroup>
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Sign up
            </Button>
          </form>
          <span>
            Already have an account?
            <Link to="/login">Log in</Link>
          </span>
          <br />
          <br />
          <hr />

          <span>
            <GoogleContainer onClick={(e) => handleGoogleSignup(e)}>
              <img src={googleLogo} alt="Google Icon" />
              <p>Sign up with Google</p>
            </GoogleContainer>
          </span>
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default Signup;
