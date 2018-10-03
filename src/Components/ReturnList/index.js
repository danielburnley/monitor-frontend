import React from "react";

export default class ReturnList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderListItems() {
    console.log(this.props.formData.returns[0])
    return (
      <div>
        <a className="list-group-item" data-test={`return-${this.props.formData.returns[0].id}`}>
          Return {this.props.formData.returns[0].id}
        </a>
      </div>
    );
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" data-test="schema-title">
          {this.props.schema.title}
        </div>
        <div className="panel-body">
          <ul className="list-group">{this.renderListItems()}</ul>
        </div>
      </div>
    );
  }
}
