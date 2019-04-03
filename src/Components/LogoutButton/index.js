import React from "react";

export default class LogoutButton extends React.Component {
  userLoggedOut = () => {
    this.props.onLogout();
  }

  render = () =>
    <button onClick={
      () => {this.props.logoutUsecase.execute(this)}
    }>
      Logout
    </button>
}
