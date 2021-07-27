import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { LoadingToRedirect } from "../components";
import Cookies from "js-cookie";
const UserRoute = ({ children, ...restProps }) => {
  const accessToken = Cookies.get("access");

  return (
    <>
      {accessToken ? (
        <Route {...restProps} render={children} />
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default UserRoute;
