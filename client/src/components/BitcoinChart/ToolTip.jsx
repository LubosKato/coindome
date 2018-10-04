import React, { PureComponent } from 'react';
import styles from '../../styles/ToolTip.css';

class ToolTip extends PureComponent {
  render() {
    const { hoverLoc, activePoint } = this.props;
    const svgLocation = document
      .getElementsByClassName('linechart')[0]
      .getBoundingClientRect();

    const placementStyles = {};
    const width = 100;
    placementStyles.width = `${width}px`;
    placementStyles.left = hoverLoc + svgLocation.left - (width / 2);

    return (
      <div className={styles.hover} style={placementStyles}>
        <div className={styles.date}>{activePoint.d}</div>
        <div className={styles.price}>{activePoint.p}</div>
      </div>
    );
  }
}

export default ToolTip;
