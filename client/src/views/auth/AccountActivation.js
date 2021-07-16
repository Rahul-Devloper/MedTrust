import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  EntryCard,
  InputGroup,
  Input,
  Button,
  EntryPage,
  PageHeader,
} from "../../components";
import { useLocation } from "react-router-dom";
import { accountActivate, resendVerification } from "../../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AccountActivation = () => {
  const [activating, setActivating] = useState(false);
  const [activatingError, setActivatingError] = useState(false);
  const [email, setEmail] = useState("");
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  useEffect(() => {
    setActivating(true);
    // Send token to the server
    accountActivate(token)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.type[0].message);
          setActivatingError(true);
        }
        toast.success(res.data.message);
        setActivating(false);
      })
      .catch((err) => {
        setActivating(false);
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make the API call
    resendVerification(email)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.type[0].message);
        }
        toast.success(res.data.message);
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
          {activatingError ? (
            <>
              <h2>Resend Verification</h2>
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

                <Button type="submit">Resend</Button>
              </form>
              <br />
              <br />
              <hr />

              <span>
                Don't have an account?
                <Link to="/signup">Sign up</Link>
              </span>
            </>
          ) : (
            <>
              <h2>Account Activated</h2>
              <br />
              <br />
              <hr />

              <span>
                <Link to="/login">Login</Link>
              </span>
            </>
          )}
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default AccountActivation;
