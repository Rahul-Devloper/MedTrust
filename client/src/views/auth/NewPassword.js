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
import { useLocation } from "react-router-dom";
import { newPassword } from "../../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  // Handle Reset Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Check if both the passwords match
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      } else {
        setLoading(true);
        // Submit token & new password to the server
        newPassword(token, password)
          .then((res) => {
            if (res.data.error) {
              toast.error(res.data.type[0].message);
            }
            toast.success(res.data.message);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log("SET_PASSWORD_ERROR", error);
    }
    // Make the API call
    setLoading(true);
  };

  return (
    <>
      <EntryPage>
        <PageHeader to="/">SaaS Logo</PageHeader>
        <EntryCard>
          <h2>Enter New Password</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <InputGroup>
              <label htmlFor="reset-password">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                id="reset-password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="reset-password">Confirm password</label>
              <Input
                type="password"
                placeholder="Confirm password"
                id="reset-confirm-password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputGroup>

            <Button type="submit">Update Password</Button>
          </form>
          <br />
          <br />
          <hr />

          <span>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </span>
        </EntryCard>
      </EntryPage>
    </>
  );
};

export default NewPassword;
