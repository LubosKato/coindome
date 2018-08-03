import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter } from 'react-router-dom'
import App from './components/Start.jsx'
import registerServiceWorker from './registerServiceWorker.js'
import 'style-loader!react-select/scss/default.scss'
import '!style-loader!css-loader!react-toastify/dist/ReactToastify.css'

import { toast } from "react-toastify";

ReactDom.render((
    <HashRouter>
      <App />
    </HashRouter>
), document.getElementById('react-app'));

registerServiceWorker(toast);