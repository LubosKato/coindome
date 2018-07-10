const fetch = require('node-fetch');

const CoinBase = {
  getOne(currency, period) {
    return fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency='+currency+'&start=' + this.getDate(period) + '&end=' + this.getToday())
      .then(res => res.json())
      .then(res => {
        return res;
      });
  },
  getInfo() {
    return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(res => {
        return res;
      });
  },
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
  },
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
};

module.exports = CoinBase;
