import React from "react";
import { Route } from "react-router-dom";
import { LoadingToRedirect } from "../components";
import Cookies from "js-cookie";
import { getNewToken } from "../utils/getNewToken";
const UserRoute = ({ children, ...restProps }) => {
  const accessToken = Cookies.get("access");

  // If access token doesnt exist, get new access token
  if (accessToken === undefined || accessToken === null) {
    getNewToken();
  }

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
