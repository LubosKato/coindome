import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import BitcoinChart from './BitcoinChart/BitcoinChart';
import LoginPage from '../containers/LoginContainer';
import SignUpPage from '../containers/SignUpContainer';
import ProfilePage from '../containers/ProfileContainer';
import TranslationContainer from '../containers/TranslationContainer';
import Subscriptions from './Notifications/Subscriptions';
import SendResetPassword from '../containers/SendResetPwdContainer';
import ResetPassword from '../containers/ResetPasswordContainer';
import Confirmation from '../containers/ConfirmationContainer';
import Privacy from './Privacy';

export default function Main() {
  return (
    <main className="container-fluid py-3 flex-fill">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home
              cardtitleP={<TranslationContainer translationKey="title_text" />}
              cardsubtitleP={<TranslationContainer translationKey="subtitle_text" />}
            />
          )}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/profile/" component={ProfilePage} />
        <Route path="/bitcoinchart" component={BitcoinChart} />
        <Route path="/sendreset" component={SendResetPassword} />
        <Route path="/reset/:id" component={ResetPassword} />
        <Route path="/confirmation/:id" component={Confirmation} />
        <Route path="/privacy" component={Privacy} />
      </Switch>
      <Subscriptions />
    </main>
  );
}
