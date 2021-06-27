import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";
import { currentAdmin } from "../api/admin";

const AdminRoute = ({ children, ...restProps }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth && auth.token) {
      currentAdmin()
        .then((result) => {
          setOk(true);
        })
        .catch((error) => {
          setOk(false);
          console.log(error);
        });
    }
  }, [auth]);

  return (
    <>
      {ok && auth.token ? (
        <Route {...restProps} render={children} />
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default AdminRoute;
