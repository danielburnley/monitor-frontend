import React from "react";

export function parseMoney(value) {
  if (value) {
    let cleanedString = value.replace(/[^0-9.]/g, "");
    return new Number(cleanedString);
  }
  return 0;
}

export function accumulateMoney(array, property) {
  return array.reduce(
    (total, object) => parseMoney(object[property]) + total,
    0
  );
}

export function sum(data, ...keys) {
  keys = keys.flat();
  return keys.reduce((total, key) => parseMoney(data[key]) + total, 0);
}

export function periodTotal(object, totalPath, property, ...keys) {
  if(!object[property]) return;
  return object[property].forEach((value, index) => {
    setCreate(object[property][index], totalPath, ""+sum(value, keys));
    return (sum(value, keys));
  });
}

export function weeksPassed(originalDate, newDate) {
  let seconds = secondsPassed(originalDate, newDate)
  return Math.round(seconds/(7 * 60 * 60 * 24));
}

export function daysPassed(originalDate, newDate) {
  let seconds = secondsPassed(originalDate, newDate)
  return Math.round(seconds/(60 * 60 * 24));
}

export function secondsPassed(originalDate, newDate) {
  let originalDateDatified = new Date(originalDate);
  let newDateDatified = new Date(newDate);

  if(newDateDatified == 'Invalid Date' || originalDateDatified == 'Inavlid Date') return ""

  return (newDateDatified - originalDateDatified) / 1000
}

export function validateArrayPropertyIsLessThan(array, path, value) {
  array.forEach((object) => {
    setCreate(object, [...path.slice(0, path.length-1), '_valid'], get(object, ...path) <= value);
  });
}

export function setCreate(object, path, value) {
  let jsonToSet = path.slice(0,path.length-1).reduce(
    (accumulator, property) => {
      if (accumulator[property]) {
        return accumulator[property];
      } else {
        accumulator[property] = {}
        return accumulator[property];
      }
    },
    object
  );

  jsonToSet[path[path.length-1]] = value;
  return object;
}

export function set(object, property, value) {
  object[property] = value;
}

export function get(object, ...properties) {
  return properties.reduce(
    (accumulator, property) => {
      if (accumulator && accumulator[property])
      {
        return accumulator[property];
      } else {
        return null;
      }
    },
    object
  );
}

export function calculateVariance(value1, value2) {
  let result = (value1 / value2) * 100;

  return Math.round(result * 100) / 100;
}

export function combineArrays(array1, array2) {
  if (!array1) return array2;
  if (!array2) return array1;
  return array1.concat(array2)
};

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
