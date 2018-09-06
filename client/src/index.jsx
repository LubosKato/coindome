import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './components/Start';
import 'style-loader!react-select/scss/default.scss';
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('react-app'));

if ('serviceWorker' in navigator) {
  runtime.register();
}
