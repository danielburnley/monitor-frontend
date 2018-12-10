import React from "react";

function parseMoney(value) {
  if (value) {
    let cleanedString = value.replace(/[^0-9.]/g, "");
    return new Number(cleanedString);
  }
  return 0;
}

function accumulateMoney(array, property) {
  return array.reduce(
    (total, object) => parseMoney(object[property]) + total,
    0
  );
}

function sum(data, ...keys) {
  keys = keys.flat()
  return keys.reduce((total, key) => parseMoney(data[key]) + total, 0)
}

function periodTotal(object, totalProperty, property, ...keys) {
  return object[property].forEach((value, index) => {
    return object[property][index][totalProperty] = sum(value, keys)
  });
}

function set(object, property, value) {
  object[property] = value;
}

function get(object, ...properties) {
  return properties.reduce(
    (accumulator, property) => accumulator[property],
    object
  );
}

function calculateVariance(value1, value2) {
  let result =
    (value1 / value2) * 100;

  return Math.round(result * 100) / 100;
}

export default class CalculatedField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.formData
    };

    let formData = this.state.formData;
    eval(this.props.schema.calculation);
    this.state.formData = formData;
  }

  onChange = formData => {
    eval(this.props.schema.calculation);
    this.setState({ formData });
    this.props.onChange(formData);
  };

  removeCalculationBeforeRender = uiSchema => {
    if (uiSchema) {
      uiSchema["ui:field"] = "";
    }
    return uiSchema;
  };

  render = () => (
    <this.props.registry.fields.SchemaField
      formData={this.state.formData}
      schema={this.props.schema}
      onChange={this.onChange}
      uiSchema={this.removeCalculationBeforeRender(this.props.uiSchema)}
      registry={this.props.registry}
    />
  );
}
