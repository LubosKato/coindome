import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../modules/Auth';
import {Redirect} from 'react-router-dom';
import TranslationContainer from '../containers/TranslationContainer.jsx';
import LangSwitchContainer from '../containers/LangSwitchContainer.jsx';
import Currencies from './Currencies.jsx';
import { connect } from 'react-redux';
import * as currencyActions from './../actions/currencyActions';
import { bindActionCreators } from 'redux';
import {withRouter} from 'react-router'
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Header extends React.Component {
  constructor(props) {
      super(props);
      this.onLogOutClicked = this.onLogOutClicked.bind(this);
      this.onUpdate = this.onUpdate.bind(this);
      this.state = {
        currency: "USD"
      };
  }

  componentWillReceiveProps(params) {
    //var xx = this.props.textMessage;
    if(params.data.newNotification != null){
      toast(params.data.newNotification.label);
    }
  }

  onUpdate(val) {
    this.props.actions.setCurrency(val);
    this.setState({
      currency: val
    })
  };

  onLogOutClicked()
  {
    Auth.deauthenticateUser();
  }

  render() {
    return (
    <nav className="navbar navbar-default">
      <div className="App">
      <div className="App-intro">
      </div>
        <ToastContainer position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover/>
      </div>
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
        aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link to="/" className="navbar-brand"><TranslationContainer translationKey="site_text"/></Link>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className="active"><Link to="/bitcoinchart"><TranslationContainer translationKey="bitcoin_text"/> <span className="sr-only">(current)</span></Link></li>
        </ul>
       
        {Auth.isUserAuthenticated() == false ? (
              <ul className="nav navbar-nav navbar-right">
                <li className="active"><Link to="/login"><TranslationContainer translationKey="login_text"/><span className="sr-only">(current)</span></Link></li>
                <li className="active"><Link to="/signup"><TranslationContainer translationKey="signup_text"/> <span className="sr-only">(current)</span></Link></li>  
                <li><LangSwitchContainer /></li>
              </ul>
          ):(
            <ul className="nav navbar-nav navbar-right">
             <li><Currencies onUpdate={this.onUpdate}/></li>
             <li className="active"><Link to="/profile"><TranslationContainer translationKey="profile_text"/> <span className="sr-only">(current)</span></Link></li>  
             <li><Link to="/login" onClick={this.onLogOutClicked}><TranslationContainer translationKey="logout_text"/> <span className="sr-only">(current)</span></Link></li>
              <li><LangSwitchContainer /> </li>
              </ul>
          )
        }
      </div>
    </div>
  </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currency: state.currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(currencyActions, dispatch),
  };
}
const subNewNotification = gql`
  subscription {
    newNotification {
      label
    }
  }
`;
const query= graphql(subNewNotification);
const headerWithQuery = query(Header);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(headerWithQuery));

Header.propTypes = {
  currency: PropTypes.object,
  actions: PropTypes.object
};