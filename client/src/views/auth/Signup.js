import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <h1>Login Page</h1>
      <span>
        Already have an account?
        <Link to="/login">Log in</Link>
      </span>
      <br />
      <span>
        Go back
        <Link to="/">Home</Link>
      </span>
    </>
  );
};

export default Register;
