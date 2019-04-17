import React from "react";

export default class ProjectOverviewProvider extends React.Component {
  constructor() {
    super();
    this.state = { overview: undefined };
  }

  presentOverview(overview) {
    this.setState({ overview });
  }

  componentDidMount() {
    this.props.getProjectOverview.execute(this, {
      projectId: this.props.projectId
    });
  }

  render() {
    if (this.state.overview) {
      return (
        <div>
          {this.props.children({
            name: this.state.overview.name,
            type: this.state.overview.type,
            status: this.state.overview.status,
            data: this.state.overview.data,
            baselines: this.state.overview.baselines,
            claims: this.state.overview.claims,
            returns: this.state.overview.returns
          })}
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}
