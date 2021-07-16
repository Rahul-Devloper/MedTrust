import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";
import { currentAdmin } from "../api/admin";
import Cookies from "js-cookie";

const AdminRoute = ({ children, ...restProps }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);
  const accessToken = Cookies.get("access");

  // Check if current user is admin
  useEffect(() => {
    if (accessToken) {
      currentAdmin()
        .then(() => {
          setOk(true);
        })
        .catch((error) => {
          setOk(false);
          console.log("ADMIN_ROUTE_ERROR", error);
        });
    }
  }, [auth]);

  return (
    <>
      {ok && accessToken !== undefined ? (
        <Route {...restProps} render={children} />
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default AdminRoute;
