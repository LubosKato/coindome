import React, { Component } from 'react';
import moment from 'moment';
import styles from './../../styles/BitcoinChart.css';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';
import TranslationContainer from './../../containers/Translation/TranslationContainer.jsx';
import { connect } from 'react-redux';
import { PERIODS } from './../../constants/periods';

class BitcoinChart extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this)
    this.getToday = this.getToday.bind(this)
    this.getDate = this.getDate.bind(this)
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null,
      currency:props.currency.currency,
      period:'30'
    }
  }
  handleChartHover(hoverLoc, activePoint){
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }
  componentDidMount(){
    this.updateChart(this.state.period);
  }
  componentDidUpdate(prevProps) {
    // only update chart if the data has changed
    if (prevProps.currency !== this.props.currency) {
      this.updateChart(this.state.period);
    }
  }
  getToday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }
  getDate(period){
    var today = new Date();
    today.setDate(today.getDate()-period);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }
  updateChart(period){
    this.state.period = period;
    var currency = this.props.currency.currency;
    const getData = () => {
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json?currency=' + currency +'&start=' + this.getDate(period) + '&end=' + this.getToday();

      fetch(url).then( r => r.json())
        .then((bitcoinData) => {
          const sortedData = [];
          let count = 0;
          for (let date in bitcoinData.bpi){
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: bitcoinData.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: currency }),
              x: count, //previous days
              y: bitcoinData.bpi[date] // numerical price
            });
            count++;
          }
          this.setState({
            data: sortedData,
            fetchingData: false
          })
        })
        .catch((e) => {
         // console.log(e);
        });
    }
    getData();
  }
  render() {
    return (
      <div>
        <div className={styles.row}>
          <h1><TranslationContainer translationKey="chart_title_text"/></h1>
        </div>
        <div className="lang" style={{ padding: 10, textAlign: 'center' }}>
        {PERIODS.map((period, i) =>
          <button
            key={i}
            style={{ fontWeight: this.state.period === period.value ? 'bold' : '' }}
            onClick={() => this.updateChart(period.value)}
          >
            <span>{period.label}</span>
          </button>
        )}
      </div>
        <div className={styles.row}>
          { !this.state.fetchingData ?
          <InfoBox data={this.state.data} />
          : null }
        </div>
        <div className={styles.row}>
          <div className={styles.popup}>
            {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.chart}>
            { !this.state.fetchingData ?
              <LineChart data={this.state.data} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
              : null }
          </div>
        </div>
        <div className={styles.row}>
          <div id="coindesk"> <TranslationContainer translationKey="powered_text"/> <a href="http://www.coindesk.com/price/">CoinDesk</a></div>
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

export default connect(mapStateToProps, null)(BitcoinChart);

BitcoinChart.propTypes = {
  currency: PropTypes.object,
};
