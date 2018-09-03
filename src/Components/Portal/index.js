import React from 'react';
import Form from 'react-jsonschema-form';
import GetToken from '../GetToken'

export default class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: null
    }
  }
  componentDidMount() {
    this.props.canAccessProject.execute(this.props.token, parseInt(this.props.projectId)).then(apiKey => this.setState({apiKey}))
  }

  render() {
    if (this.state.apiKey === null) {
      //Show loading thing
      return <div>Loading</div>
    } else {
      if (this.state.apiKey.valid) {
        if (this.props.onApiKey) {
          this.props.onApiKey(this.state.apiKey.apiKey)
        }
        return this.props.target
      } else {
        return <GetToken projectId={this.props.projectId} targetUrl={window.location.href} requestToken={this.props.requestToken}/>
      }
    }
  }
}
