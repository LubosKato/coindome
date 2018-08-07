import {Subscription} from "react-apollo";
import {gql} from "apollo-boost";
import {toast} from 'react-toastify';
import {graphql} from 'react-apollo'
import React, {Component} from "react";

class Subscriptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0
    }
  }

  render() {
    return (
      <div>
        <Subscription subscription={newNotification}>
          {({data}) => {
            if (data != undefined) {
              if (data.newNotification.id != this.state.id) {
                this.state.id = data.newNotification.id;
                return toast(data.newNotification.label);
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
  }
}`;

export default graphql(newNotification)(Subscriptions)
