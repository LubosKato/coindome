import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as translationActions from './actions';
import CurrencySwitch from './CurrencySwitch.jsx';

class CurrencySwitchContainer extends Component {

  render() {
    return (
      <CurrencySwitch currency={this.props.currency} setCurrency={this.props.translationActions.setCurrency} />
    );
  }
}

function mapStateToProps(state) {
    localStorage.setItem('currency', state.currency.currency);
  return {
    currency: state.currency.currency,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    translationActions: bindActionCreators(translationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitchContainer);

CurrencySwitchContainer.propTypes = {
  currency: PropTypes.string,
  translationActions: PropTypes.object,
};
