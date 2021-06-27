import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";

const UserRoute = ({ children, ...restProps }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <>
      {auth.authData && auth.authData.token ? (
        <Route {...restProps} render={children} />
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default UserRoute;
