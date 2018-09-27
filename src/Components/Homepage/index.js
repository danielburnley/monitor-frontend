import "./style.css";
import React from "react";

export default class Homepage extends React.Component {
  render() {
    return (
      <div className="container homepage">
        <h1>Homes England Monitor</h1>
        Welcome to the Homes England monitoring system.
          If you have not been provided with a link to a project you believe you
          should have access to, or have any feedback or queries please feel
          free to email <a href="mailto:SUPPORT_EMAIL_TBC">SUPPORT_EMAIL_TBC</a>.
      </div>
    );
  }
}
