import { gql } from 'apollo-boost';
import { toast } from 'react-toastify';
import { Subscription, graphql } from 'react-apollo';
import React, { Component } from 'react';
import TranslationContainer from '../../containers/TranslationContainer';

const newNotification = gql`
subscription {
  newNotification {
    id
    label
    user
  }
}`;

class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      userName: '',
    };
  }

  render() {
    const { id } = this.state;
    const { userName } = this.state;
    return (
      <div>
        <Subscription subscription={newNotification}>
          {({ data }) => {
            if (data !== undefined) {
              if ((data.newNotification.id !== id)
               && (data.newNotification.user !== userName)) {
                this.state.id = data.newNotification.id;
                this.state.userName = data.newNotification.user;
                return toast(
                  <TranslationContainer translationKey={data.newNotification.label} />,
                );
              }
              return null;
            }
            return null;
          }}
        </Subscription>
      </div>
    );
  }
}

export default graphql(newNotification)(Subscriptions);
