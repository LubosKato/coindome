import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CurrencySwitch from './CurrencySwitch';

class CurrencySwitchContainer extends PureComponent {
  render() {
    return (
      <CurrencySwitch
        currency={this.props.currency}
        setCurrency={this.props.translationActions.setCurrency}
      />
    );
  }
}

function mapStateToProps(state) {
  localStorage.setItem('currency', state.currency.currency);
  return { currency: state.currency.currency };
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
