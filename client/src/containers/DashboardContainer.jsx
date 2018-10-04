import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    // {Auth.isUserAuthenticated() ? ( if(Auth.isUserAuthenticated()) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          secretData: xhr.response != null
            ? xhr.response.message
            : '',
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }
}

export default DashboardContainer;
