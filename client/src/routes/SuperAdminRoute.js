import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";
import { currentSuperAdmin } from "../api/superAdmin";

const SuperAdminRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => state.auth);
  const [ok, setOk] = useState(false);

  // Check if current user is super admin
  useEffect(() => {
    if (user) {
      currentSuperAdmin()
        .then(() => {
          setOk(true);
        })
        .catch((error) => {
          setOk(false);
          console.log("SUPER_ADMIN_ROUTE_ERROR", error);
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

export default SuperAdminRoute;