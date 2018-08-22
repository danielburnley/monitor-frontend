import fetch from 'isomorphic-fetch';

import React from 'react';
import './style.css'

export default class GetToken extends React.Component {

  emailChange = (e) => {
    this.setState({email: e.target.value});
  }
  //Make this use a gateway later
  sendRequest = (e) => {
    this.props.requestToken.execute(this.state.email, this.props.targetUrl)
    e.preventDefault();
  }

  render() {
    return (<form onSubmit={this.sendRequest}>
      {"You do not have permission to view this page, please enter your email:"} <br/>
      <input data-test="email_input" type="text" onChange={this.emailChange}></input>
      <input data-test="submit_button" type="submit" value="Request Access"/>
    </form>)
  }
}
