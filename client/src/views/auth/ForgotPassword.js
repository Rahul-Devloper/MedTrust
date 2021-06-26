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
import { resetPassword } from "../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Handle Reset Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Make the API call
    setLoading(true);
    resetPassword(email)
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
          <h2>Reset Password</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <InputGroup>
              <label htmlFor="reset-email">Email Address</label>
              <Input
                type="text"
                placeholder="Enter email"
                id="reset-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <Button type="submit">Reset</Button>
          </form>
          <br />
          <br />
          <hr />

          <span>
            Don't have an account?
            <Link to="/signup">Sign up</Link>
          </span>
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default ForgotPassword;
