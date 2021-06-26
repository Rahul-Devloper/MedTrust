import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import {
  AccountActivation,
  AccountReverify,
  Dashboard,
  ForgotPassword,
  Home,
  Login,
  NewPassword,
  Signup,
} from "./views";
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
        <Route exact path="/account/reverify" component={AccountReverify} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/new-password" component={NewPassword} />
        {/* User Routes */}
        <Route exact path="/user/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
