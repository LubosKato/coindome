import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth';
import {Redirect} from 'react-router-dom';
import PushNotification from '../components/Notifications/PushNotification.jsx'

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      redirect: false,
      errors: {},
      message: "User logged out",
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Accept-Language', localStorage.getItem('lang'));
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        // save the token
        Auth.authenticateUser(xhr.response.token);

        localStorage.setItem('usrname', JSON.stringify(xhr.response.user));
        
       // console.log(JSON.parse(localStorage.getItem('usrname')).name);
        this.setState({message: "User logged in"});
        this.setState({redirect: true});
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>

      {this.state.redirect == false? ( 
        <React.Fragment>
          <PushNotification label={"User logged out"}/>
          <LoginForm
            onSubmit={this.processForm}
            onChange={this.changeUser}
            errors={this.state.errors}
            successMessage={this.state.successMessage}        
            user={this.state.user}
          />
           </React.Fragment>
        ):
          <Redirect to='/' />
      }
      </div>
    );
  }
}
export default LoginContainer;