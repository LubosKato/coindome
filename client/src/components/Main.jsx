import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'
import Home from './Home.jsx'
import BitcoinChart from './BitcoinChart/BitcoinChart.jsx'
import LoginPage from '../containers/LoginPage.jsx';
import SignUpPage from '../containers/SignUpPage.jsx';
import ProfilePage from '../containers/ProfilePage.jsx';
import Auth from '../modules/Auth';
import TranslationContainer from './../containers/Translation/TranslationContainer.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
          <main>
            <Switch>
              <Route exact path='/' render={() => <Home cardtitleP={<TranslationContainer translationKey="title_text"/>} cardsubtitleP={<TranslationContainer translationKey="subtitle_text"/>}/>}/>    
              <Route path='/login' component={LoginPage}/>
              <Route path='/signup' component={SignUpPage}/>
              <Route path='/profile' component={ProfilePage}/>
              <Route path='/bitcoinchart' component={BitcoinChart}/>
            </Switch>
          </main>
    )
  }  
}

export default Main