import React from "react";
import "./style.css";

export default class ReturnList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLink(returns) {
    return (
      <div className="col-md-10">
        <a
          href={`/project/${returns.project_id}/return/${returns.id}`}
          className="list-group-item"
          data-test={`return-${returns.id}`}
        >
          Return {returns.id}
        </a>
      </div>
    );
  }

  renderStatus(returns) {
    let status = returns.status;
    if (status == "Draft") {
      return (
        <span className="badge" data-test={`status-${returns.id}`}>
          {status}
        </span>
      );
    } else {
      return (
        <span
          className="badge badge-success"
          data-test={`status-${returns.id}`}
        >
          {status}
        </span>
      );
    }
  }

  renderReturn(returns) {
    return (
      <div className="row padding-bottom" key={returns.id.toString()}>
        <div className="col-md-10">{this.renderLink(returns)}</div>
        <div className="col-md-2 return-list">{this.renderStatus(returns)}</div>
      </div>
    );
  }

  renderListItems() {
    const returns = this.props.formData.returns;
    return returns.map(returns => this.renderReturn(returns));
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" data-test="schema-title">
          Returns: {this.props.schema.title}
        </div>
        <div className="panel-body">
          <ul className="list-group">{this.renderListItems()}</ul>
        </div>
      </div>
    );
  }
}
