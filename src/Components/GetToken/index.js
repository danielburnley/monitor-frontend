import fetch from 'isomorphic-fetch';

import React from 'react';
import './style.css'

export default class GetToken extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      message_sent: false
    }
  }

  emailChange = (e) => {
    this.setState({email: e.target.value});
  }

  sendRequest = (e) => {
    this.props.requestToken.execute(this.state.email, this.props.projectId, this.props.targetUrl)
    this.setState({message_sent: true})
    e.preventDefault();
  }

  render() {
    if (this.state.message_sent) {
      return (<div data-test="sent_message">
        <h3>We&#39;ve sent an email to {this.state.email}</h3>
        <p>Didn&#39;t receive an email? Check your spam and make sure you entered your email correctly.</p>
        </div>)
    } else {
      return (<form onSubmit={this.sendRequest}>
        {"You do not have permission to view this page, please enter your email:"} <br/>
        <input data-test="email_input" type="text" onChange={this.emailChange}></input>
        <input data-test="submit_button" type="submit" value="Request Access"/>
      </form>)
    }
  }
}
