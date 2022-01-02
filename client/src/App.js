import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  AccountActivation,
  AdminDashboard,
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  NewPassword,
  Signup,
  CreateCoupon,
  // -------------- Wildcard --------------
  RandomPageRedirect,
} from "./views";
import { MemberRoute, AdminRoute } from "./routes";
import { refreshTokenAction } from "./redux/actions/authActions";
import { ToastContainer } from "react-toastify";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

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
      <Switch>
        {/**************** Common Routes ****************/}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={user ? Dashboard : Login} />
        <Route exact path="/signup" component={user ? Dashboard : Signup} />
        <Route
          exact
          path="/account/activate"
          component={user ? Dashboard : AccountActivation}
        />
        <Route
          exact
          path="/forgot-password"
          component={user ? Dashboard : ForgotPassword}
        />
        <Route
          exact
          path="/new-password"
          component={user ? Dashboard : NewPassword}
        />
        {/**************** Member Routes ****************/}
        <MemberRoute exact path="/user/dashboard" component={Dashboard} />
        {/* Admin Routes */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute
          exact
          path="/admin/coupon/create"
          component={CreateCoupon}
        />

        {/* Wildcard */}
        <Route path={"*"} component={RandomPageRedirect} />
      </Switch>
    </div>
  );
};

export default App;
