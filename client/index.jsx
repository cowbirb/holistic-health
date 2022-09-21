/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/user.context.jsx";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <UserProvider>
          <App />
        </UserProvider>
      </Auth0Provider>
    </BrowserRouter>
);
