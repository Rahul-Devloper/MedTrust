import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  // Auth
  Signup,
  AccountActivation,
  Login,
  ForgotPassword,
  NewPassword,
  // Super Admin Routes
  SuperAdminDashboard,
  // Admin Routes
  AdminDashboard,
  // Member Routes
  MemberDashboard,
  // -------------- Wildcard --------------
  RandomPageRedirect,
} from "./views";
import { MemberRoute, AdminRoute, SuperAdminRoute } from "./routes";
import { refreshTokenAction } from "./redux/actions/authActions";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const customize = useSelector((state) => state.customize);

  // Update access token on every refresh
  useEffect(() => {
    dispatch(refreshTokenAction());
  }, [dispatch]);

  useEffect(() => {
    if (user?.role && history.location.pathname === "/") {
      if (user.role === "superadmin") {
        history.push("/super-admin/dashboard");
      } else if (user.role === "admin") {
        history.push("/admin/dashboard");
      } else if (user.role === "member") {
        history.push("/member/dashboard");
      }
    }
  }, [user, history]);

  return (
    <div className="App">
      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <ConfigProvider direction={customize.direction}>
        <Switch>
          {/**************** Common Routes ****************/}
          <Route exact path="/login" component={!user && Login} />
          <Route exact path="/signup" component={!user && Signup} />
          <Route
            exact
            path="/account/activate"
            component={!user && AccountActivation}
          />
          <Route
            exact
            path="/forgot-password"
            component={!user && ForgotPassword}
          />
          <Route exact path="/new-password" component={!user && NewPassword} />
          {/**************** Super Admin Routes ****************/}
          <SuperAdminRoute
            exact
            path="/super-admin/dashboard"
            component={SuperAdminDashboard}
          />

          {/**************** Admin Routes ****************/}
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          {/**************** Member Routes ****************/}
          <MemberRoute
            exact
            path="/member/dashboard"
            component={MemberDashboard}
          />

          {/* Wildcard */}
          <Route path={"*"} component={RandomPageRedirect} />
        </Switch>
      </ConfigProvider>
    </div>
  );
};

export default App;
