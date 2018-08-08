import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

class PushNotification extends Component {
  componentDidMount() {
    this._pushNotification(this.props)
  }

  render() {
    return null;
  }

  _pushNotification(props) {
    var label = props.label;
    var user = localStorage.getItem('usrname') !=null ? JSON.parse(localStorage.getItem('usrname')).name : '';
    this.props.pushNotificationMutation({variables: {
          label,
          user
        }})
  }
}

const POST_MUTATION = gql `
mutation PushNotificationMutation($label: String!,$user: String!){
  pushNotification(label: $label, user: $user) {
    id
    label
    user
  }
}`

export default graphql(POST_MUTATION, {name: 'pushNotificationMutation'})(PushNotification)