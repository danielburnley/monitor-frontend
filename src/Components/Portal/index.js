import React from "react";
import GetToken from "../GetToken"
import LogoutButton from "../LogoutButton";
import "./style.css";

export default class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      apiKey: null
    }
  }

  updateAccessStatus = () => {
    this.props.canAccessMonitor
      .execute(this.props.token)
      .then(apiKey => this.setState({apiKey}))
  }

  componentDidMount() {
    this.updateAccessStatus();
  }

  onLogout = () => {
    this.updateAccessStatus();
  }

  renderLogoutButton = () =>
    <LogoutButton
      logoutUsecase={this.props.logoutUsecase}
      onLogout={this.onLogout}
    />

  renderToolbar = () =>
    <div class="toolbar">
      {this.renderLogoutButton()}
    </div>

  render() {
    if (this.state.apiKey === null) {
      return <div>Loading...</div>
    } else {
      if (this.state.apiKey.valid) {
        return <div>
          {this.renderToolbar()}
          {this.props.children}
        </div>
      } else {
        return <GetToken projectId={this.props.projectId} targetUrl={window.location.href} requestToken={this.props.requestToken}/>
      }
    }
  }
}
