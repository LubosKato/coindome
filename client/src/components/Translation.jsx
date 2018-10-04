import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

export default class Translation extends PureComponent {
  render() {
    return (
      <span>{this.props.translation}</span>
    );
  }
}

Translation.propTypes = {
  translation: PropTypes.string.isRequired,
};
