import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingToRedirect } from "../components";
import VerticalLayout from "../layouts/VerticalLayout";
import { currentMember } from "../api/member";

const MemberRoute = ({ children, ...restProps }) => {
  const { user } = useSelector((state) => state.auth);
  const [ok, setOk] = useState(false);

  // Check if current user is user
  useEffect(() => {
    if (user) {
      currentMember()
        .then(() => {
          setOk(true);
        })
        .catch((error) => {
          setOk(false);
          console.log("USER_ROUTE_ERROR", error);
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

export default MemberRoute;
