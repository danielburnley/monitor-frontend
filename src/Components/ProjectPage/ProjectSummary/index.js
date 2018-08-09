import React from 'react';
import './style.css'

export default class ProjectSummary extends React.Component {
  renderItems = () => {
    return Object.entries(this.props.schema.properties.summary.properties).map(
      ([key, value]) => {
        return (
          <div className="summary-field" key={key}>
            <h3 data-test={`summary_${key}`}>{value.title}</h3>
            <div data-test={`summary_${key}`}>
              {this.props.data.summary[key]}
            </div>
          </div>
        );
      },
    );
  };

  render() {
    return (
      <div data-test="summary">
        <h2>{this.props.schema.properties.summary.title}</h2>
        <div>{this.renderItems()}</div>
      </div>
    );
  }
}
