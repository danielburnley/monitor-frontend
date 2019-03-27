import React from "react";

export default class ClaimListProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {claims: []};
  }

  presentClaims = (claims) => {
    this.setState({claims});
  };

  presentClaimsNotFound = () => {};

  componentDidMount() {
    this.props.getClaims.execute(this, {
      projectId: this.props.match.params.projectId
    });
  }

  render() {
    return (
      <div>
        {this.props.children({
          claims: this.state.claims
        })}
      </div>
    );
  }
}
