import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(<Provider store={store}><BrowserRouter><Auth0Provider
    domain="hurstlimited.us.auth0.com"
    clientId="6UiZjoMJIIiYH95Qj7zw28Ctnm61pkhJ"
    audience='https://hurstapi/api'
    redirectUri={window.location.origin}
  ><App /></Auth0Provider></BrowserRouter></Provider>, document.getElementById('root'));

// ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
