import "./style.css";
import Logo from "./Homes_England_3282_DIGI_AW.png";
import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header className="monitor-header">
        <div className="logo-holder">
          <img src={Logo} className="logo" alt="Homes England" id="logo" />
        </div>
        <div className="beta-notice">
          <strong className="beta">Beta</strong> This is a new service — your <a href="mailto:SUPPORT_EMAIL_TBC">feedback</a> will help us improve it.
        </div>
      </header>
    );
  }
}
