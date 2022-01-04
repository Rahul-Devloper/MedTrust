import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";
import VerticalLayout from "../layouts/VerticalLayout";
import { currentAdmin } from "../api/admin";

const AdminRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => state.auth);
  const [ok, setOk] = useState(false);

  // Check if current user is admin
  useEffect(() => {
    if (user) {
      currentAdmin()
        .then(() => {
          setOk(true);
        })
        .catch((error) => {
          setOk(false);
          console.log("ADMIN_ROUTE_ERROR", error);
        });
    }
  }, [user]);

  return (
    <>
      {ok && user !== undefined ? (
        <VerticalLayout>
          <Route {...restProps} render={children} />
        </VerticalLayout>
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default AdminRoute;
