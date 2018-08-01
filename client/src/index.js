import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom'
import App from './components/Start.jsx'
import registerServiceWorker from './registerServiceWorker.js'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

ReactDom.render((
    <HashRouter>
      <App />
    </HashRouter>
), document.getElementById('react-app'));

registerServiceWorker();