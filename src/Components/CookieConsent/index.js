import React from "react";
import './style.css';

export default class CookieConsent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  componentDidMount() {
    this.props.showCookieConsent.execute(this);
  }

  show = () => {
    this.setState({show: true});
  }

  render() {
    if (this.state.show) {
      return (
        <div id="cookie-notice" data-test="cookie-notice">
          The Homes England Monitor uses cookies to make the site simpler. <a href="https://blog.gov.uk/cookies/">Find out more about cookies</a>
        </div>
      );
    } else {
      return null;
    }
  }
}
