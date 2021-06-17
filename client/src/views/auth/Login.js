import React from "react";
import { Link } from "react-router-dom";
import {
  EntryCard,
  InputGroup,
  Input,
  Button,
  EntryPage,
  PageHeader,
} from "../../components";

const Login = () => {
  return (
    <>
      <EntryPage>
        <PageHeader to="/">SaaS Logo</PageHeader>
        <EntryCard>
          <h2>Log in</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <label htmlFor="login-email">Email Address</label>
              <Input type="text" placeholder="Enter email" id="login-email" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="login-password">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                id="login-password"
              />
            </InputGroup>
            <Button type="submit">Log in</Button>
          </form>
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
