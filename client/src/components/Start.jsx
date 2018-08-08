import React from 'react'
import Header from './Header.jsx'
import Main from './Main.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './../reducers/rootReducer';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';
import IdleTimer from 'react-idle-timer';
import Auth from '../modules/Auth';
import {withRouter} from 'react-router';
import {WebSocketLink} from 'apollo-link-ws';
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';

const store = createStore(rootReducer);
const httpLink = new HttpLink({uri: 'http://localhost:3000/graphql'})

const wsLink = new WebSocketLink({
  uri: `ws://coindome.herokuapp.com/subscriptions`,
  options: {
    reconnect: true
  }
});

const link = split(({query}) => {
  const {kind, operation} = getMainDefinition(query);
  return kind === 'OperationDefinition' && operation === 'subscription';
}, wsLink, httpLink,);

const client = new ApolloClient({link: link, cache: new InMemoryCache()})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
    this.onIdle = this
      ._onIdle
      .bind(this)
  }

  render() {
    return (
      <IdleTimer
        ref={ref => {
        this.idleTimer = ref
      }}
        element={document}
        onActive={this.onActive}
        onIdle={this.onIdle}
        timeout={1000 * 60 * 10}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <MuiThemeProvider>
              <div>
                <Header/>
                <Main/>
              </div>
            </MuiThemeProvider>
          </Provider>
        </ApolloProvider>
      </IdleTimer>
    )
  }

  _onIdle(e) {
    if (Auth.isUserAuthenticated()) {
      Auth.deauthenticateUser();
      this
        .props
        .history
        .push(`/login`);
    }
  }
}

export default withRouter(App)
