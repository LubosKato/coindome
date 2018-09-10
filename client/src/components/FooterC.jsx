import React, { Component } from 'react';
import { Footer } from 'react-materialize';
import TranslationContainer from '../containers/TranslationContainer';
import styles from '../styles/Index.css';

class FooterC extends Component {
  render() {
    return (
      <div >
      <Footer className="container-fluid w-100 bg-dark text-light py-3" copyrights="© 2018 Copyright Coindome"
        moreLinks={<a className="grey-text text-lighten-4 right" href="#/privacy"> <TranslationContainer translationKey="privacy" /></a>}
      >
      </Footer>
      </div>
    );
  }
}

export default (FooterC);
