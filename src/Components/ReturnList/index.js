import React from "react";
import "./style.css";

export default class ReturnList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLink(returns) {
    return (
      <a
        href={`/project/${returns.project_id}/return/${returns.id}`}
        className="list-group-item"
        data-test={`url-${returns.id}`}
      >
        <span data-test={`return-${returns.id}`}>Return {returns.id}</span>
        <div className="pull-right">{this.renderStatus(returns)}</div>
      </a>
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
      <div className="row padding" key={returns.id.toString()}>
        {this.renderLink(returns)}
      </div>
    );
  }

  renderListItems() {
    const returns = this.props.returns;
    return returns.map(returns => this.renderReturn(returns));
  }

  render() {
    if (this.props.returns.length == 0) {
      return <div />;
    } else {
      return (
        <div className="row padding-top">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading" data-test="schema-title">
                Returns
              </div>
              <div className="panel-body">
                <ul className="list-group">{this.renderListItems()}</ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
