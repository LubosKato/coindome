import { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class PushNotification extends Component {
  componentDidMount() {
    this.pushNotification(this.props);
  }

  pushNotification(props) {
    const { label } = props;
    const user = localStorage.getItem('usrname') != null ? JSON.parse(localStorage.getItem('usrname')).name : '';
    const { pushNotificationMutation } = this.props;
    pushNotificationMutation({
      variables: {
        label,
        user,
      },
    });
  }

  render() {
    return null;
  }
}

const POST_MUTATION = gql`
mutation PushNotificationMutation($label: String!,$user: String!){
  pushNotification(label: $label, user: $user) {
    id
    label
    user
  }
}`;

export default graphql(POST_MUTATION, { name: 'pushNotificationMutation' })(PushNotification);
