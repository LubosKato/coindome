import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom'
import App from './components/Start.jsx';

ReactDom.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
), document.getElementById('react-app'));