import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

import "./assets/icons/remixicon.css";
import "./assets/less/netraga-theme.less";

// Redux
import { DataProvider } from "./redux/store";

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <DataProvider>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_ID}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </DataProvider>,
  document.getElementById("root")
);
