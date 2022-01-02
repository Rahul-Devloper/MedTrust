import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";
import { currentMember } from "../api/member";

const MemberRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => state.auth);
  const [ok, setOk] = useState(false);

  // Check if current user is user
  useEffect(() => {
    if (user) {
      currentMember()
        .then(() => {
          setOk(true);
        })
        .catch((error) => {
          setOk(false);
          console.log("USER_ROUTE_ERROR", error);
        });
    }
  }, [user]);

  return (
    <>
      {ok && user !== undefined ? (
        <Route {...restProps} render={children} />
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default MemberRoute;
