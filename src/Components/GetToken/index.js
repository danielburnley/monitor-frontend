import React from "react";
import "./style.css";

export default class GetToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message_sent: false
    };
  }

  emailChange = e => {
    this.setState({ email: e.target.value });
  };

  sendRequest = e => {
    if (this.state.email) {
      this.props.requestToken.execute(
        this.state.email,
        this.props.projectId,
        this.props.targetUrl
      );
      this.setState({ message_sent: true });
    }
    e.preventDefault();
  };

  renderMessageSent = () => {
    return (
      <div data-test="sent_message">
        <h3>We&#39;ve sent an email to {this.state.email}</h3>
        <p>
          Didn&#39;t receive an email? Check your spam and make sure you entered
          your email correctly.
        </p>
      </div>
    );
  };

  render() {
    if (this.state.message_sent) {
      return this.renderMessageSent();
    } else {
      return (
        <div className="col-md-offset-4 col-md-4">
          <h4>
            You do not have permission to view this page, please enter your
            email:
          </h4>
          <form onSubmit={this.sendRequest}>
            <div className="form-group">
              <input
                data-test="email_input"
                type="text"
                className="form-control"
                placeholder="email@example.com"
                onChange={this.emailChange}
              />
            </div>
            {
              this.state.email ?
              <button
                data-test="submit-button"
                type="submit"
                className="btn btn-primary"
              >
                Request Access
              </button> : <button
                data-test="disabled-submit-button"
                type="submit"
                className="btn disabled"
              >
                Request Access
              </button>
          }
          </form>
        </div>
      );
    }
  }
}
