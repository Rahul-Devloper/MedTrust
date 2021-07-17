import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { LoadingToRedirect } from "../components";
import Cookies from "js-cookie";
import { getNewToken } from "../utils/getNewToken";
const UserRoute = ({ children, ...restProps }) => {
  const accessToken = Cookies.get("access");

  // If access token doesn't exist, get new access token
  useEffect(() => {
    const interval = setInterval(() => {
      getNewToken();
    }, process.env.REACT_APP_ACCESS_TOKEN_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

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
