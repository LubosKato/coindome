import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PushNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label:  ''
    }
    this.pushNotification = this.pushNotification.bind(this);
  }

  // componentWillReceiveProps(params) {
  //   if(params.data.newNotification != null){
  //     this.setState(params.data.newNotification.label);
  //   }
  // }
  renderFullName () {
    var xxx = this.props.label;
  }

  render() {
   this.renderFullName()
    return (
      <div>
        {/* <input
          value={this.state.label}
          onChange={e => this.setState({ label: e.target.value  })}
          type="text"
          placeholder="A label"
        />
        <button onClick={() => this.pushNotification()}>Submit</button> */}
      </div>
    )
  }

  async pushNotification () {
    const { label } = this.state
    await this.props.pushNotificationMutation({
      variables: {
        label
      }
    })
    this.setState({ label: '' });
  }
}

const POST_MUTATION = gql`
mutation PushNotificationMutation($label: String!){
  pushNotification(label: $label) {
    label
  }
}
`

export default graphql(POST_MUTATION, { name: 'pushNotificationMutation' })(PushNotification)
