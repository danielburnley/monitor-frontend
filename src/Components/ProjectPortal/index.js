import React from 'react';
import "../Homepage/style.css";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export default class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.env = runtimeEnv();
    this.state = {
      apiKey: null
    }
  }

  componentDidMount() {
    this.props.canAccessProject.execute(this.props.token, parseInt(this.props.projectId, 10)).then(apiKey => this.setState({apiKey}))
  }

  renderBackToHomepageButton() {
    return <button
      data-test="back-to-homepage"
      className="btn btn-link btn-lg"
      onClick={() => this.props.history.push(`/`)}
    >
      Take me back to the Homepage
    </button>
  }

  render() {
    if (this.state.apiKey === null) {
      return <div>Loading</div>
    } else {
      if (this.state.apiKey.valid) {
        return this.props.children
      } else {
        return <div>
          <div className="row homepage">
        <div className="col-md-2" />
        <div className="col-md-8">
          <h1>Homes England Monitor</h1>
          <p>
            Welcome to the Homes England monitoring system. You are not a member of this project. If you believe you should have access
            to this project, or have any feedback or queries please feel free to email{" "}
            <a href={"mailto:" + this.env.REACT_APP_SUPPORT_EMAIL}>
              {this.env.REACT_APP_SUPPORT_EMAIL}
            </a>
            .
          </p>
          {this.renderBackToHomepageButton()}
        </div>
        <div className="col-md-2" />
      </div>
      </div>
      }
    }
  }
}