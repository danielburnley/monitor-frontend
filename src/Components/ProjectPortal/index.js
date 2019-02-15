import React from 'react';
import "../Homepage/style.css";
import Cookies from 'js-cookie';
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

  refreshCookies = () => {
    Cookies.remove('apikey');
    window.location.reload();
  }

  renderRefreshCookiesButton = () => {
    return <button
      data-test="refresh-cookies"
      className="btn btn-link"
      onClick={this.refreshCookies}
    >
      Refresh Login
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
            Welcome to the Homes England monitoring system. If you believe you should have access
            to this project, or have any feedback or queries please feel free to email{" "}
            <a href={"mailto:" + this.env.REACT_APP_SUPPORT_EMAIL}>
              {this.env.REACT_APP_SUPPORT_EMAIL}
            </a>
            .
          </p>
          <p>If you believe you have already been added to project {this.props.projectId}, you can try refreshing your login: {this.renderRefreshCookiesButton()}</p>
          
          {this.renderBackToHomepageButton()}
        </div>
        <div className="col-md-2" />
      </div>
      </div>
      }
    }
  }
}