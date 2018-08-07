import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {CURRENCY_NAMES} from './../../constants/currencies';

export default class CurrencySwitch extends Component {
  render() {
    return (
      <div
        className="lang"
        style={{
        padding: 10,
        textAlign: 'center'
      }}>
        {CURRENCY_NAMES.map((Currency, i) => <button
          key={i}
          style={{
          fontWeight: this.props.currency === Currency.currency
            ? 'bold'
            : ''
        }}
          onClick={() => this.props.setCurrency(Currency.currency)}>
          <span>{Currency.name}</span>
        </button>)}
      </div>
    );
  }
}

CurrencySwitch.propTypes = {
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func
};
