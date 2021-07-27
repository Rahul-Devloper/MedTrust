import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";

const UserRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user ? (
        <Route {...restProps} render={children} />
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default UserRoute;
