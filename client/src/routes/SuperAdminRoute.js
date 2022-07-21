import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { LoadingToRedirect } from "../components";
import VerticalLayout from "../layouts/VerticalLayout";
import { useDispatch } from "react-redux";
import { isSuperAdminAction } from "../redux/actions/authActions";

const SuperAdminRoute = ({ children, ...restProps }) => {
  const dispatch = useDispatch();
  const [ok, setOk] = useState(false);

  // Check if current user is super admin
  useEffect(() => {
    dispatch(isSuperAdminAction({ setOk }));
  }, []);

  return (
    <>
      {ok ? (
        <VerticalLayout>
          <Route {...restProps} render={children} />
        </VerticalLayout>
      ) : (
        <LoadingToRedirect />
      )}
    </>
  );
};

export default SuperAdminRoute;
