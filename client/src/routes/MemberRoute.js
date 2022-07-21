import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { LoadingToRedirect } from "../components";
import VerticalLayout from "../layouts/VerticalLayout";
import { useDispatch } from "react-redux";
import { isMemberAction } from "../redux/actions/authActions";

const MemberRoute = ({ children, ...restProps }) => {
  const dispatch = useDispatch();
  const [ok, setOk] = useState(false);

  // Check if current user is a member
  useEffect(() => {
    dispatch(isMemberAction({ setOk }));
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

export default MemberRoute;
