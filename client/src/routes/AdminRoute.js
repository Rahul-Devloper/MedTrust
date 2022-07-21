import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { LoadingToRedirect } from "../components";
import VerticalLayout from "../layouts/VerticalLayout";
import { useDispatch } from "react-redux";
import { isAdminAction } from "../redux/actions/authActions";

const AdminRoute = ({ children, ...restProps }) => {
  const dispatch = useDispatch();
  const [ok, setOk] = useState(false);

  // Check if current user is admin
  useEffect(() => {
    dispatch(isAdminAction({ setOk }));
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

export default AdminRoute;
