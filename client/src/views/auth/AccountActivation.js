import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { accountActivate } from "../../api/auth";
const AccountActivation = () => {
  const [activating, setActivating] = useState(false);
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  useEffect(() => {
    setActivating(true);
    // Send token to the server
    accountActivate(token)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Account Activation</h1>
    </div>
  );
};

export default AccountActivation;
