import React from 'react'
import Header from './Header.jsx'
import Main from './Main.jsx'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './../reducers/rootReducer';

const store = createStore(rootReducer);

class App extends React.Component {
  render(){
    return (  
    <Provider store={store}>
      <MuiThemeProvider>
        <div>
            <Header />  
            <Main />
        </div>
      </MuiThemeProvider>
    </Provider>
  )}
}

export default App
