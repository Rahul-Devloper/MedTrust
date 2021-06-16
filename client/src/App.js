import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import { Home, Login } from "./views";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">This is the header component</header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;
