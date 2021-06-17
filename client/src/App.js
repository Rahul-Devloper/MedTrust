import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import { Home, Login, Signup } from "./views";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  );
};

export default App;
