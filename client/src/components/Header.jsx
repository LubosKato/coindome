import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../modules/Auth';
import {Redirect} from 'react-router-dom';
import TranslationContainer from './../containers/Translation/TranslationContainer.jsx';
import LangSwitchContainer from './../containers/LangSwitch/LangSwitchContainer.jsx';
import styles from './../styles/Index.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onLogOutClicked = this.onLogOutClicked.bind(this);
  }    

  onLogOutClicked()
  {
    Auth.deauthenticateUser();
  }

  render() {
    return (
    <nav className="navbar navbar-default">
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

export default Header