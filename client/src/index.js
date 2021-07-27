import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { GlobalStyle } from "./globalCSS";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// redux
import DataProvider from "./redux/store";

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <DataProvider>
    <Router history={browserHistory}>
      <GlobalStyle />
      <App />
    </Router>
  </DataProvider>,
  document.getElementById("root")
);
