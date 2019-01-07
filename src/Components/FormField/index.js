import React from 'react';

export default class FormField extends React.Component {
  onFieldChange = e => {
    this.props.updateField(this.props.fieldName, e.target.value);
  };

  renderInput() {
    if (this.props.type === 'text') {
      return (
        <div data-test="input-text">
          <input
          type="text"
          id={this.props.fieldName}
          name={this.props.fieldName}
          onChange={this.onFieldChange}
          value={this.props.initialValue}
          disabled={this.props.baseline}
        />
        </div>
      );
    } else if (this.props.type === 'yes/no') {
      return (
        <div data-test="input-yes-no">
          <select
            id={this.props.fieldName}
            name={this.props.fieldName}
            onChange={this.onFieldChange}
            value={this.props.initialValue}
            disabled={this.props.baseline}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

      );
    } else if (this.props.type === 'status') {
      return (
        <div data-test="input-status">
          <select
            id={this.props.fieldName}
            name={this.props.fieldName}
            onChange={this.onFieldChange}
            value={this.props.initialValue}
            disabled={this.props.baseline}>
            <option value="Completed">Completed</option>
            <option value="On Schedule">On Schedule</option>
            <option value="Delayed">Delayed</option>
          </select>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="form-field">
        <div>
          <label htmlFor={this.props.fieldName} data-test="label">{this.props.fieldLabel}</label>
        </div>
        <div>{this.renderInput()}</div>
      </div>
    );
  }
}
