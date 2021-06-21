import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import { Dashboard, Home, Login, Signup } from "./views";

const App = () => {
  return (
    <div className="App">
      <Switch>
        {/* Common Routes */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {/* User Routes */}
        <Route exact path="/user/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
