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
  keys = keys.flat();
  return keys.reduce((total, key) => parseMoney(data[key]) + total, 0);
}

function periodTotal(object, totalPath, property, ...keys) {
  if (!object[property]) return;
  return object[property].forEach((value, index) => {
    setCreate(object[property][index], totalPath, "" + sum(value, keys));
    return sum(value, keys);
  });
}

function weeksPassed(originalDate, newDate) {
  let seconds = secondsPassed(originalDate, newDate);
  return Math.round(seconds / (7 * 60 * 60 * 24));
}

function daysPassed(originalDate, newDate) {
  let seconds = secondsPassed(originalDate, newDate);
  return Math.round(seconds / (60 * 60 * 24));
}

function secondsPassed(originalDate, newDate) {
  let originalDateDatified = new Date(originalDate);
  let newDateDatified = new Date(newDate);

  if (
    newDateDatified == "Invalid Date" ||
    originalDateDatified == "Inavlid Date"
  )
    return "";

  return (newDateDatified - originalDateDatified) / 1000;
}

function validateArrayPropertyIsLessThan(array, path, value) {
  array.forEach(object => {
    setCreate(
      object,
      [...path.slice(0, path.length - 1), "_valid"],
      get(object, ...path) <= value
    );
  });
}

function setCreate(object, path, value) {
  let jsonToSet = path
    .slice(0, path.length - 1)
    .reduce((accumulator, property) => {
      if (accumulator[property]) {
        return accumulator[property];
      } else {
        accumulator[property] = {};
        return accumulator[property];
      }
    }, object);

  jsonToSet[path[path.length - 1]] = value;
  return object;
}

function set(object, property, value) {
  object[property] = value;
}

function get(object, ...properties) {
  return properties.reduce((accumulator, property) => {
    if (accumulator && accumulator[property]) {
      return accumulator[property];
    } else {
      return undefined;
    }
  }, object);
}

function calculateVariance(value1, value2) {
  let result = (value1 / value2) * 100;

  return Math.round(result * 100) / 100;
}

function combineArrays(array1, array2) {
  if (!array1) return array2;
  if (!array2) return array1;
  return array1.concat(array2);
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

  render = () => {
    return (
      <this.props.registry.fields.SchemaField
        formData={this.state.formData}
        schema={this.props.schema}
        onChange={this.onChange}
        uiSchema={this.removeCalculationBeforeRender(this.props.uiSchema)}
        registry={this.props.registry}
      />
    );
  };
}
