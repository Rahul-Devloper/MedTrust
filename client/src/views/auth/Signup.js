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
const Signup = () => {
  return (
    <>
      <EntryPage>
        <PageHeader to="/">SaaS Logo</PageHeader>
        <EntryCard>
          <h2>Sign up</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputGroup>
              <label htmlFor="signup-name">Full name</label>
              <Input type="text" placeholder="John Doe" id="signup-name" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="signup-email">Email address</label>
              <Input type="text" placeholder="Enter email" id="signup-email" />
            </InputGroup>
            <InputGroup>
              <label htmlFor="signup-password">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                id="signup-password"
              />
            </InputGroup>
            <Button type="submit">Sign up</Button>
          </form>
          <span>
            Already have an account?
            <Link to="/login">Log in</Link>
          </span>
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default Signup;
