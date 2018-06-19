import React, { Component } from 'react';
import moment from 'moment';
import styles from './../../styles/InfoBox.css';
import TranslationContainer from './../../containers/Translation/TranslationContainer.jsx';
import { connect } from 'react-redux';

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrice: null,
      monthChangeD: null,
      monthChangeP: null,
      updatedAt: null,      
      currency:props.currency.currency
    }
  }
  componentDidMount(){
    this.updateChart();
  }
  componentDidUpdate(prevProps) {
    // only update chart if the data has changed
    if (prevProps.currency !== this.props.currency) {
      this.updateChart();
    }
  }
  updateChart(){
    var currency = this.props.currency.currency;
    this.getData = () => {
      const {data} = this.props;
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

      fetch(url).then(r => r.json())
        .then((bitcoinData) => {
          const price = currency == 'USD' ? bitcoinData.bpi.USD.rate_float : bitcoinData.bpi.EUR.rate_float;
          const change = price - data[0].y;
          const changeP = (price - data[0].y) / data[0].y * 100;

          this.setState({
            currentPrice: currency == 'USD' ? bitcoinData.bpi.USD.rate_float : bitcoinData.bpi.EUR.rate_float,
            monthChangeD: change.toLocaleString('us-EN',{ style: 'currency', currency: currency }),
            monthChangeP: changeP.toFixed(2) + '%',
            updatedAt: bitcoinData.time.updated
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }
  componentWillUnmount(){
    clearInterval(this.refresh);
  }
  render(){
    var currency = this.props.currency.currency;
    return (
      <div id={styles.datacontainer}>
        { this.state.currentPrice ?
          <div id={styles.left} className={styles.box}>
            <div className={styles.heading}>{this.state.currentPrice.toLocaleString('us-EN',{ style: 'currency', currency: currency })}</div>
            <div className={styles.subtext}><TranslationContainer translationKey="updated_text"/> { moment(this.state.updatedAt ).fromNow()}</div>
          </div>
        : null}
        { this.state.currentPrice ?
          <div id={styles.middle} className={styles.box}>
            <div className={styles.heading}>{this.state.monthChangeD}</div>
            <div className={styles.subtext}><TranslationContainer translationKey="change_curr_text"/> ({currency})</div>
          </div>
        : null}
          <div id={styles.right} className={styles.box}>
            <div className={styles.heading}>{this.state.monthChangeP}</div>
            <div className={styles.subtext}><TranslationContainer translationKey="change_perc_text"/></div>
          </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currency: state.currency,
  };
}

export default connect(mapStateToProps, null)(InfoBox);

InfoBox.propTypes = {
  currency: PropTypes.object,
};

