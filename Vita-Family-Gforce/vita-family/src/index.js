import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    // domain="dev-1wfdh4zr.us.auth0.com"
    // clientId="GMehfOKoTfH7XoMfMORbUkeAhw2cgqYy"
    domain="dev-1wfdh4zr.us.auth0.com"
    clientId="2yUxS7NlYfGygfAYPsKE23OfxpMj58Mn"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
