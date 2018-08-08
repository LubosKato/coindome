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
    this.props.pushNotificationMutation({variables: {
          label
        }})
  }
}

const POST_MUTATION = gql `
mutation PushNotificationMutation($label: String!){
  pushNotification(label: $label) {
    id
    label
  }
}`

export default graphql(POST_MUTATION, {name: 'pushNotificationMutation'})(PushNotification)