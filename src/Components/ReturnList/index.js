import React from "react";
import "./style.css";

export default class ReturnList extends React.Component {
  displayDate(returns) {
    let unix = returns.timestamp;
    let timestamp = new Date(unix * 1000);
    let date = timestamp.getDate();
    let month = timestamp.getMonth() + 1;
    let year = timestamp.getFullYear();
    return `${date}/${month}/${year}`;
  }

  renderLink(returns, index) {
    return (
      <a
        href={`/project/${returns.project_id}/return/${returns.id}`}
        className="list-group-item"
        data-test={`url-${returns.id}`}
      >
        <span data-test={`return-${returns.id}`}>Return {index + 1}</span>
        <div className="pull-right">{this.renderStatus(returns)}</div>
        <span className="pull-right date">
          {this.renderSubmission(returns)}
        </span>
      </a>
    );
  }

  renderStatus(returns) {
    let status = returns.status;
    if (status === "Draft") {
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

  renderSubmission(returns) {
    let fullDate = this.displayDate(returns);
    if (fullDate === "1/1/1970") {
      return null;
    } else {
      return <span data-test={`timestamp-${returns.id}`}>{fullDate}</span>;
    }
  }

  renderReturn(returns, index) {
    return (
      <div className="row padding" key={returns.id.toString()}>
        {this.renderLink(returns, index)}
      </div>
    );
  }

  renderListItems() {
    const returns = this.props.returns;
    return returns.map((returns, index) => this.renderReturn(returns, index));
  }

  render() {
    if (this.props.returns.length === 0) {
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
