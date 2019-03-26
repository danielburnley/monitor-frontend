import React from "react";
import "./style.css";

export default class List extends React.Component {
  displayDate(item) {
    if (!item.timestamp) return null;

    let unix = item.timestamp;
    let timestamp = new Date(unix * 1000);
    let date = timestamp.getDate();
    let month = timestamp.getMonth() + 1;
    let year = timestamp.getFullYear();
    return `${date}/${month}/${year}`;
  }

  renderLink(item, index) {
    return (
      <a
        href={`/project/${this.props.match.params.projectId}/${this.props.listType}/${item.id}`}
        className="list-group-item"
        data-test={`url-${item.id}`}
      >
        <span data-test={`${this.props.listType}-${item.id}`}>
          {`${this.props.prettyListType}`} {index + 1}
        </span>
        <div className="pull-right">{this.renderStatus(item)}</div>
        <span className="pull-right date">
          {this.renderSubmission(item)}
        </span>
      </a>
    );
  }

  renderStatus(item) {
    let status = item.status;
    if (status === "Draft") {
      return (
        <span className="badge" data-test={`status-${item.id}`}>
          {status}
        </span>
      );
    } else {
      return (
        <span
          className="badge badge-success"
          data-test={`status-${item.id}`}
        >
          {status}
        </span>
      );
    }
  }

  renderSubmission(item) {
    let fullDate = this.displayDate(item);
    return <span data-test={`timestamp-${item.id}`}>{fullDate}</span>;
  }

  renderItem(item, index) {
    return (
      <div className="row padding" key={item.id.toString()}>
        {this.renderLink(item, index)}
      </div>
    );
  }

  renderListItems() {
    const items = this.props.items;
    return items.map((item, index) => this.renderItem(item, index));
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
