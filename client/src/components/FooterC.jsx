import React from 'react';
import { Footer } from 'react-materialize';
import TranslationContainer from '../containers/TranslationContainer';

export default function FooterC() {
  return (
    <div>
      <Footer
        className="container-fluid w-100 bg-dark text-light py-3"
        copyrights="© 2018 Copyright Coindome"
        moreLinks={(
          <a className="grey-text text-lighten-4 right" href="#/privacy">
            {' '}
            <TranslationContainer translationKey="privacy" />
          </a>
        )}
      />
    </div>
  );
}
