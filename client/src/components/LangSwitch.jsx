import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { LANG_NAMES } from '../constants/translations';

export default class LangSwitch extends PureComponent {
  render() {
    return (
      <div
        className="lang"
        style={{
          padding: 5,
          textAlign: 'center',
        }}
      >
        {LANG_NAMES.map((language, i) => (
          <button
            type="button"
            key={i}
            style={{
              fontWeight: this.props.locale === language.locale
                ? 'bold'
                : '',
            }}
            onClick={() => this.props.setLanguage(language.locale)}
          >
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    );
  }
}

LangSwitch.propTypes = {
  locale: PropTypes.string.isRequired,
  setLanguage: PropTypes.func,
};
