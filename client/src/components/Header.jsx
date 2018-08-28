import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Currencies from './Currencies';
import LangSwitchContainer from '../containers/LangSwitchContainer';
import * as currencyActions from '../actions/currencyActions';
import TranslationContainer from '../containers/TranslationContainer';
import Auth from '../modules/Auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onLogOutClicked = this
      .onLogOutClicked
      .bind(this);
    this.onUpdate = this
      .onUpdate
      .bind(this);
    this.state = {
      currency: 'USD',
    };
  }

  onUpdate(val) {
    this
      .props
      .actions
      .setCurrency(val);
    this.setState({ currency: val });
  }

  onLogOutClicked() {
    Auth.deauthenticateUser();
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="App">
          <div className="App-intro" />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </div>
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand"><TranslationContainer translationKey="site_text" /></Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/bitcoinchart">
                  <TranslationContainer translationKey="bitcoin_text" />
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>

            {Auth.isUserAuthenticated() === false
              ? (
                <ul className="nav navbar-nav navbar-right">
                  <li className="active">
                    <Link to="/login">
                      <TranslationContainer translationKey="login_text" />
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="active">
                    <Link to="/signup">
                      <TranslationContainer translationKey="signup_text" />
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li><LangSwitchContainer /></li>
                </ul>
              )
              : (
                <ul className="nav navbar-nav navbar-right">
                  <li><Currencies onUpdate={this.onUpdate} /></li>
                  <li className="active">
                    <Link to="/profile">
                      <TranslationContainer translationKey="profile_text" />
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={this.onLogOutClicked}>
                      <TranslationContainer translationKey="logout_text" />
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li>
                    <LangSwitchContainer />
                  </li>
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
  return { currency: state.currency };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(currencyActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

Header.propTypes = {
  currency: PropTypes.object,
  actions: PropTypes.object,
};
