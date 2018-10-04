import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import TranslationContainer from '../../containers/TranslationContainer';
import styles from '../../styles/InfoBox.css';

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
      monthChangeD: null,
      monthChangeP: null,
      updatedAt: null,
    };
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate(prevProps) {
    // only update chart if the data has changed
    if (prevProps.currency !== this.props.currency) {
      this.updateChart();
    }
  }

  componentWillUnmount() {
    clearInterval(this.refresh);
  }

  updateChart() {
    const currency = this.props.currency.currency;
    this.getData = () => {
      const { data } = this.props;
      const all = gql`
      {getInfoBox{
        bpi
        disclaimer
        time {
          updated
          updatedISO
          updateduk
        }}}`;

      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query: all }),
      })
        .then(r => r.json())
        .then((bitcoinData) => {
          const price = currency == 'USD'
            ? bitcoinData.data.getInfoBox.bpi.USD.rate_float
            : bitcoinData.data.getInfoBox.bpi.EUR.rate_float;
          const change = price - data[0].y;
          const changeP = (price - data[0].y) / data[0].y * 100;

          this.setState({
            currentPrice: currency == 'USD'
              ? bitcoinData.data.getInfoBox.bpi.USD.rate_float
              : bitcoinData.data.getInfoBox.bpi.EUR.rate_float,
            monthChangeD: change.toLocaleString('us-EN', {
              style: 'currency',
              currency,
            }),
            monthChangeP: `${changeP.toFixed(2)}%`,
            updatedAt: bitcoinData.data.getInfoBox.time.updated,
          });
        })
        .catch((e) => {
          //console.log(e);
        });
    };
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }

  render() {
    const currency = this.props.currency.currency;
    return (
      <div id={styles.datacontainer}>
        {this.state.currentPrice
          ? (
            <div id={styles.left} className={styles.box}>
              <div className={styles.heading}>
    {this
  .state
  .currentPrice
  .toLocaleString('us-EN', {
    style: 'currency',
    currency,
  })}

  </div>
              <div className={styles.subtext}>
    <TranslationContainer translationKey="updated_text" />
    {' '}
    {moment(this.state.updatedAt).fromNow()}
    </div>
                        </div>
          )
          : null}
        {this.state.currentPrice
          ? (
            <div id={styles.middle} className={styles.box}>
              <div className={styles.heading}>{this.state.monthChangeD}</div>
              <div className={styles.subtext}>
    <TranslationContainer translationKey="change_curr_text" />
                (
    {currency}
)
</div>
                        </div>
          )
          : null}
        <div id={styles.right} className={styles.box}>
          <div className={styles.heading}>{this.state.monthChangeP}</div>
          <div className={styles.subtext}><TranslationContainer translationKey="change_perc_text" /></div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currency: state.currency };
}

export default connect(mapStateToProps, null)(InfoBox);

InfoBox.propTypes = {
  currency: PropTypes.object,
};
