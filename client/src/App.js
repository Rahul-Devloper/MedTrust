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
  Signup,
} from "./views";

const App = () => {
  return (
    <div className="App">
      <Switch>
        {/* Common Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/account/activate" component={AccountActivation} />
        <Route exact path="/account/reverify" component={AccountReverify} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        {/* User Routes */}
        <Route exact path="/user/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
