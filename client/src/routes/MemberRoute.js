import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { LoadingToRedirect } from "../components";
import VerticalLayout from "../layouts/VerticalLayout";
import { useDispatch } from "react-redux";
import { isMemberAction } from "../redux/actions/authActions";

const MemberRoute = ({ children, ...restProps }) => {
  children ? console.log('children==>', children) : console.log('noCHildren==>')

  const dispatch = useDispatch()
  // const [ok, setOk] = useState(false)

  // Check if current user is a member
  // useEffect(() => {
  //   dispatch(isMemberAction({ setOk }));
  // }, []);

  //removed loading to redirect in here
  // using member route as guest login
  return (
    <>
      <VerticalLayout menuHeader={false}>
        <Route {...restProps} render={children} />
      </VerticalLayout>
    </>
  )
};

export default MemberRoute;
