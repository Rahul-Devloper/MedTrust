import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.scss";
import {
  AccountActivation,
  AdminDashboard,
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  NewPassword,
  Signup,
  StripePayment,
  CreateCoupon,
} from "./views";
import { UserRoute, AdminRoute } from "./routes";
import { refreshTokenAction } from "./redux/actions/authActions";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Update access token on every refresh
  useEffect(() => {
    dispatch(refreshTokenAction());
  }, [dispatch]);

  return (
    <div className="App">
      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        {/* Common Routes */}
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
        {/* User Routes */}
        <UserRoute exact path="/user/dashboard" component={Dashboard} />
        <Route exact path="/user/payment" component={StripePayment} />
        {/* Admin Routes */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute
          exact
          path="/admin/coupon/create"
          component={CreateCoupon}
        />
      </Switch>
    </div>
  );
};

export default App;
