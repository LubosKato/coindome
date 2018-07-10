import React from 'react'
import Header from './Header.jsx'
import Main from './Main.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './../reducers/rootReducer';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const store = createStore(rootReducer);
const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

class App extends React.Component {
  render(){
    return (
    <ApolloProvider client={client}>  
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
              <Header />  
              <Main />
          </div>
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  )}
}

export default App
