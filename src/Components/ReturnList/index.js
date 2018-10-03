import React from "react";
import "./style.css";

export default class ReturnList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderListItems() {
    const url = window.location.origin;
    const returns = this.props.formData.returns;
    const listItems = returns.map(returns => (
      <div className="row" key={returns.id.toString()}>
        <div className="col-md-10">
          <a
            href={`${url}/project/${returns.project_id}/return/${returns.id}`}
            className="list-group-item"
            data-test={`return-${returns.id}`}
          >
            Return {returns.id}
          </a>
        </div>
        <div className="col-md-2 return-list">
          <strong className="beta" data-test={`status-${returns.id}`}>
            {returns.status}
          </strong>
        </div>
      </div>
    ));
    return listItems;
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
