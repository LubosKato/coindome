import React, { Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import IdleTimer from 'react-idle-timer';
import { withRouter } from 'react-router';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import Auth from '../modules/Auth';
import { rootReducer } from '../reducers/rootReducer';
import Main from './Main';
import Header from './Header';
import Footer from './FooterC';
import styles from '../styles/Index.css';

const store = createStore(rootReducer);
const httpLink = new HttpLink({ uri: `${process.env.API_HOST}/graphql` });

const wsLink = new WebSocketLink({
  uri: `${process.env.SUBS_HOST}/graphql`,
  options: {
    reconnect: true,
  },
});

const link = split(({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
}, wsLink, httpLink);

const client = new ApolloClient({ link, cache: new InMemoryCache() });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onIdle = this._onIdle.bind(this);
  }

  _onIdle(e) {
    if (Auth.isUserAuthenticated()) {
      Auth.deauthenticateUser();
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <IdleTimer
        ref={(ref) => {
          this.idleTimer = ref;
        }}
        element={document}
        onActive={this.onActive}
        onIdle={this.onIdle}
        timeout={1000 * 60 * 10}
      >
        <ApolloProvider client={client}>
          <Provider store={store}>
            <MuiThemeProvider>
              <div className={styles.wrapper}>
                <Header />
                <Main />
                <Footer />
              </div>
            </MuiThemeProvider>
          </Provider>
        </ApolloProvider>
      </IdleTimer>
    );
  }
}

export default withRouter(App);
