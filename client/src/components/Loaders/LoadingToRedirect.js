import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { RoleBasedRedirectWithUser } from "../../utils/roleBasedRedirect";
import { useSelector } from "react-redux";

const LoadingToRedirect = () => {
  const { user } = useSelector((state) => state.auth);
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currCount) => --currCount);
    }, 1000);
    // redirect once count is 0
    count === 0 && RoleBasedRedirectWithUser(user, history);
    // cleanup
    return () => clearInterval(interval);
  }, [count, history, user]);

  return (
    <div class="loader">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
      <div class="bar4"></div>
      <div class="bar5"></div>
      <div class="bar6"></div>
    </div>
  );
};

export default LoadingToRedirect;
