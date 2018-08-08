import {Subscription} from "react-apollo";
import {gql} from "apollo-boost";
import {toast} from 'react-toastify';
import {graphql} from 'react-apollo'
import React, {Component} from "react";
import TranslationContainer from '../../containers/TranslationContainer.jsx';

class Subscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      userName:''
    }
  }

  render() {
    return (
      <div>
        <Subscription subscription={newNotification}>
          {({data}) => {
            if (data != undefined) {
              if ((data.newNotification.id != this.state.id)
               && (data.newNotification.user != this.state.userName )) {
                this.state.id = data.newNotification.id;
                this.state.userName = data.newNotification.user;
                return toast( < TranslationContainer translationKey = {data.newNotification.label} />);
              } else {
                return null;
              }
            } else {
              return null;
            }
          }}
        </Subscription>
      </div>
    )
  }
}

const newNotification = gql `
subscription {
  newNotification {
    id
    label
    user
  }
}`;

export default graphql(newNotification)(Subscriptions)
