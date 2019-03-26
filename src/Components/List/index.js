import React from "react";
import "./style.css";

export default class List extends React.Component {
  displayDate(items) {
    let unix = items.timestamp;
    let timestamp = new Date(unix * 1000);
    let date = timestamp.getDate();
    let month = timestamp.getMonth() + 1;
    let year = timestamp.getFullYear();
    return `${date}/${month}/${year}`;
  }

  renderLink(items, index) {
    return (
      <a
        href={`/project/${this.props.match.params.projectId}/${this.props.listType}/${items.id}`}
        className="list-group-item"
        data-test={`url-${items.id}`}
      >
        <span data-test={`${this.props.listType}-${items.id}`}>
          {`${this.props.prettyListType}`} {index + 1}
        </span>
        <div className="pull-right">{this.renderStatus(items)}</div>
        <span className="pull-right date">
          {this.renderSubmission(items)}
        </span>
      </a>
    );
  }

  renderStatus(items) {
    let status = items.status;
    if (status === "Draft") {
      return (
        <span className="badge" data-test={`status-${items.id}`}>
          {status}
        </span>
      );
    } else {
      return (
        <span
          className="badge badge-success"
          data-test={`status-${items.id}`}
        >
          {status}
        </span>
      );
    }
  }

  renderSubmission(items) {
    let fullDate = this.displayDate(items);
    if (fullDate === "1/1/1970") {
      return null;
    } else {
      return <span data-test={`timestamp-${items.id}`}>{fullDate}</span>;
    }
  }

  renderItem(items, index) {
    return (
      <div className="row padding" key={items.id.toString()}>
        {this.renderLink(items, index)}
      </div>
    );
  }

  renderListItems() {
    const items = this.props.items;
    return items.map((items, index) => this.renderItem(items, index));
  }

  render() {
    if (this.props.items.length === 0) {
      return <div />;
    } else {
      return (
        <div className="padding-top">
            <div className="panel panel-default">
              <div className="panel-body">
                <ul className="list-group">{this.renderListItems()}</ul>
              </div>
          </div>
        </div>
      );
    }
  }
}
