import React, { Component } from 'react';
import moment from 'moment';
import styles from './../../styles/BitcoinChart.css';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import InfoBox from './InfoBox';
import TranslationContainer from './../../containers/Translation/TranslationContainer.jsx';

class BicoinChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null
    }
  }
  handleChartHover(hoverLoc, activePoint){
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }
  componentDidMount(){
    const getData = () => {
      const url = 'https://api.coindesk.com/v1/bpi/historical/close.json';

      fetch(url).then( r => r.json())
        .then((bitcoinData) => {
          const sortedData = [];
          let count = 0;
          for (let date in bitcoinData.bpi){
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: bitcoinData.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
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

export default BicoinChart;
