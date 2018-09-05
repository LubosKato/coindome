import React from 'react';
import Confirmation from '../components/Confirmation';

class ConfirmationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      response: '',
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `/auth/confirmation/${this.state.id}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log( xhr.response);
        this.setState({
          response: xhr.response != null
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
    return (<Confirmation response={this.state.response} />);
  }
}

export default ConfirmationContainer;
