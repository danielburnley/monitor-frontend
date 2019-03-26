import React from "react";

export default class BaselineListProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {baselines: []};
  }

  presentBaselines = (baselines) => {
    this.setState({ baselines });
  };

  presentBaselinesNotFound = () => {};

  componentDidMount() {
    
    this.props.getBaselines.execute(this, {
      id: this.props.match.params.projectId
    });
  }
  
  render() {

    return (
      <div>
        {this.props.children({
          baselines: this.state.baselines
        })}
      </div>
    );
  }
}
