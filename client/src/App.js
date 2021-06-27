import React from "react";
import { Switch, Route } from "react-router-dom";
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
} from "./views";
import { UserRoute, AdminRoute } from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {
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
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/account/activate" component={AccountActivation} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/new-password" component={NewPassword} />
        {/* User Routes */}
        <UserRoute exact path="/user/dashboard" component={Dashboard} />
        {/* Admin Routes */}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </div>
  );
};

export default App;
