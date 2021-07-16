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
  const isAdmin = Cookies.get("is_admin");

  // Check if current user is admin
  useEffect(() => {
    if (auth && auth.token) {
      currentAdmin()
        .then(() => {
          setOk(true);
          Cookies.set("is_admin", true);
        })
        .catch((error) => {
          setOk(false);
          console.log("ADMIN_ROUTE_ERROR", error);
        });
    }
  }, [auth]);

  // Removes admin cookie
  const removeAdminCookie = () => {
    if (accessToken === undefined) {
      Cookies.remove("is_admin");
    }
  };

  return (
    <>
      {isAdmin && accessToken ? (
        <Route {...restProps} render={children} />
      ) : (
        (removeAdminCookie(), (<LoadingToRedirect />))
      )}
    </>
  );
};

export default AdminRoute;
