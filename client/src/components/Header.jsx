import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
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
      isOpen: false,
    };
    this.toggle = this.toggle.bind(this);
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="md" fixed="sticky" scrolling="true">
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
        <NavbarBrand href="#/"><TranslationContainer translationKey="site_text" /></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavLink href="/#/bitcoinchart/"><TranslationContainer translationKey="bitcoin_text" /></NavLink>
          </Nav>
          <Nav className="ml-auto" navbar>
            {Auth.isUserAuthenticated() === false
              ? (
                <Fragment>
                  <NavItem>
                    <NavLink href="/#/login/"><TranslationContainer translationKey="login_text" /></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/#/signup/"><TranslationContainer translationKey="signup_text" /></NavLink>
                  </NavItem>
                  <NavItem>
                    <LangSwitchContainer />
                  </NavItem>
                </Fragment>
              )
              : (
                <Fragment>
                  <NavItem>
                    <Currencies onUpdate={this.onUpdate} />
                  </NavItem>
                  <NavItem>
                    <NavLink href="/#/profile/"><TranslationContainer translationKey="profile_text" /></NavLink>
                  </NavItem>
                  <NavItem>
                    <Link to="/login" onClick={this.onLogOutClicked} className="nav-link">
                      <TranslationContainer translationKey="logout_text" />
                    </Link>
                  </NavItem>
                  <NavItem>
                    <LangSwitchContainer />
                  </NavItem>
                </Fragment>
              )}
          </Nav>
        </Collapse>
      </Navbar>
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
