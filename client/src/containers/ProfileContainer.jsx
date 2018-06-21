import React, { PropTypes } from 'react';
import ProfileForm from '../components/Profile/Profile.jsx';
import ProfileSuccessForm from '../components/Profile/ProfileSuccess.jsx';
import {Redirect} from 'react-router-dom';
import TranslationContainer from './../containers/TranslationContainer.jsx';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    // set the initial component state
    this.state = {
      redirect: false,
      errors: {},
      user: {
        name:'',
        currentpwd: '',
        newpwd: '',
        confirmPassword: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.state.user.name = JSON.parse(localStorage.getItem('usrname')).name;
    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const newpwd = encodeURIComponent(this.state.user.newpwd);
    const currentpwd = encodeURIComponent(this.state.user.currentpwd);
    const confirmPassword  = encodeURIComponent(this.state.user.confirmPassword); 
    const formData = `name=${name}&password=${newpwd}&currentpwd=${currentpwd}`;

    if(newpwd != confirmPassword){
      const errors = {};
      errors.password = <TranslationContainer translationKey="match_password_text"/>;
      this.setState({
        errors
      });
    }
    else{
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/changepwd');
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
        
        // set a message
        localStorage.setItem('successMessage', xhr.response.message);
        this.setState({redirect: true});
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }
}

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
      {this.state.redirect == false ?(
      <ProfileForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
      ):
      (
        <ProfileSuccessForm/>
        //<Redirect to='/login' />
      )
      }
      </div>
    );
  }
}

export default ProfileContainer;