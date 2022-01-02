import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./assets/icons/remixicon.css";
import "./assets/less/yoda-theme.less";

// Redux
import { DataProvider } from "./redux/store";

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <DataProvider>
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>
  </DataProvider>,
  document.getElementById("root")
);
