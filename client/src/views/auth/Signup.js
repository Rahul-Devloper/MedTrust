import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  EntryCard,
  InputGroup,
  Input,
  Button,
  EntryPage,
  PageHeader,
} from "../../components";
import { signUp } from "../../api/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  const handleSubmit = (e) => {
    // Submit email and password to server
    e.preventDefault();

    setLoading(true);
    signUp(email, password)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <EntryPage>
        <PageHeader to="/">SaaS Logo</PageHeader>
        <EntryCard>
          <h2>Sign up</h2>
          <form onSubmit={(e) => e.preventDefault()}>
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
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Sign up
            </Button>
          </form>
          <span>
            Already have an account?
            <Link to="/login">Log in</Link>
          </span>
        </EntryCard>
      </EntryPage>
      {JSON.stringify(response)}
    </>
  );
};

export default Signup;
