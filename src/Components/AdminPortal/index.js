import React from "react";

export default class AdminPortal extends React.Component {
  render() {
    if (this.props.getRole.execute().role === "Superuser") {
      return <div data-test="admin">Im an admin</div>
    }
    return null;
  }
}

