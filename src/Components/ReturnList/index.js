import React from "react";

export default class ReturnList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.formData.id,
      project_id: this.props.formData.project_id,
      status: this.props.formData.status,
      updates: this.props.formData.updates
    };
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" data-test="schema-title">{this.props.schema.title}</div>
        <div className="panel-body">
          <ul className="list-group">
            <a className="list-group-item">Return 1</a>
            <a className="list-group-item">Return 2</a>
            <a className="list-group-item">Return 3</a>
          </ul>
        </div>
      </div>
    );
  }
}
