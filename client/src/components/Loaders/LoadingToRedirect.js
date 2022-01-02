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
    <div className="">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
