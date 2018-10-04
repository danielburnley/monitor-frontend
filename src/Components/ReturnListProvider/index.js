import React from "react";

export default class ReturnListProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {returns: []};
  }

  presentReturns = ({ data }) => {
    this.setState({
      returns: data
    });
  };

  fetchData = () => {
    this.props.getReturns.execute(this, {
      projectId: this.props.projectId
    });
  };

  componentDidMount() {
    this.fetchData()
  }

  render() {
    return (
      <div>
        {this.props.children({
          returns: this.state.returns
        })}
      </div>
    );
  }
}
