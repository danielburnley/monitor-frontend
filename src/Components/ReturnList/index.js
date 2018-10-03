import React from "react";

export default class ReturnList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderListItems() {
    const url = window.location.origin;
    const returns = this.props.formData.returns;
    console.log(url);
    const listItems = returns.map(returns => (
      <a
        key={returns.id.toString()}
        href={`${url}/project/${returns.project_id}`}
        className="list-group-item"
        data-test={`return-${returns.id}`}
      >
        Return {returns.id}
      </a>
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
