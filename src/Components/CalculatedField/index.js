import "../../Polyfills/Array/flat";
import React from "react";

export function sumArray(array) {
  if (array === undefined) return;
  return array.reduce((value, total) => Number(total)+value, 0);
}

export function select(array, path) {
  if (array === undefined) return;
  return array.map((object) => get(object, path));
}

export function date(dateString) {
  return new Date(dateString).getTime();
}

export function path(...args) {
  return args;
}

export function filterForNos(array, path) {
  if (array) {
    return array.filter(i => get(i, ...path) === "No");
  }
  return [];
}

export function parseMoney(value) {
  if (value) {
    let cleanedString = value.replace(/[^0-9.-]/g, "");
    return Number(cleanedString);
  }
  return 0;
}

export function setInPreviousQuarter(formData, formContext, quarterObject, value) {
  if (formContext.returnStatus === "Submitted") return;
  let date = new Date
  let month = date.getMonth()
  let quarter
  if(month < 3) {
    quarter = 3
  } else if (month < 6) {
    quarter = 4
  } else if (month < 9) {
    quarter = 1
  } else {
    quarter = 2
  }
  setCreate(formData, [quarterObject, `quarter${quarter}`], value)
}

export function accumulateMoney(array, property, decimalPlaces) {
  if (!array) return null;
  return array
    .reduce((total, object) => parseMoney(object[property]) + total, 0)
    .toFixed(decimalPlaces);
}

export function sum(data, ...keys) {
  keys = keys.flat();
  return keys.reduce((total, key) => parseMoney(data[key]) + total, 0);
}

export function add(value1, value2) {
  let parsed1 = parseMoney(value1);
  let parsed2 = parseMoney(value2);
  return (parsed1 + parsed2).toString();
}

export function subtract(value1, value2) {
  value1 = parseMoney(value1);
  value2 = parseMoney(value2);
  return (value1 - value2).toString();
}

export function periodTotal(object, totalPath, property, ...keys) {
  if (!object[property]) return;
  return object[property].forEach((value, index) => {
    setCreate(object[property][index], totalPath, sum(value, keys).toFixed(2));
    return sum(value, keys).toFixed(2);
  });
}

export function setArrayVariance(
  originalArray,
  originalArrayProperty,
  newArray,
  newArrayProperty,
  varianceField
) {
  if (!newArray || !originalArray) return;
  newArray.map((value, index) => {
    if (!value[newArrayProperty]) return (value[varianceField] = "");
    value[varianceField] =
      parseMoney(value[newArrayProperty]) -
      parseMoney(originalArray[index][originalArrayProperty]);
  });
}

export function weeksPassed(originalDate, newDate) {
  let seconds = secondsPassed(originalDate, newDate);
  return Math.round(seconds / (7 * 60 * 60 * 24));
}

export function daysPassed(originalDate, newDate) {
  let seconds = secondsPassed(originalDate, newDate);
  return Math.round(seconds / (60 * 60 * 24));
}

export function secondsPassed(originalDate, newDate) {
  let originalDateDatified = new Date(originalDate);
  let newDateDatified = new Date(newDate);

  if (
    newDateDatified == "Invalid Date" ||
    originalDateDatified == "Invalid Date"
  )
    return "";

  return (newDateDatified - originalDateDatified) / 1000;
}

export function validateCumulativeArrayPropertyIsLessThan(array, path, value) {
  let grandTotal = array
  .reduce((total, object) => parseMoney(get(object, ...path)) + total, 0)

  let validity = value > grandTotal
  array.forEach(object => {
    setCreate(
      object,
      [...path.slice(0, path.length - 1), "_valid"],
      validity
    );
  });
}

export function validateDatesSequential(object, ...dates) {
  dates = dates.map(currentValue => [
    currentValue,
    (new Date(get(object, currentValue)))
  ]);

  dates.forEach((dateInfo, index) => {
    if (index === 0) return;

    let key = dateInfo[0].slice(0, dateInfo[0].length - 1);
    let valid = dateInfo[1] >= dates[index - 1][1] || dateInfo[1] == "Invalid Date";

    setCreate(object, [...key, "_valid"], valid);
  });
}

export function setArrayField(
  copyFromArray,
  copyFromFieldPath,
  copyToArray,
  copyToFieldPath
) {
  if (!copyFromArray || copyFromArray.constructor !== Array) return;
  try {
    copyFromArray.forEach((item, index) => {
      if (!copyToArray) copyToArray = [{}];
      if (copyToArray.length < index + 1) copyToArray.push({});

      let getValue = copyFromFieldPath.reduce((accumulator, property) => {
        if (accumulator && accumulator[property]) {
          return accumulator[property];
        } else {
          return undefined;
        }
      }, item);

      setCreate(copyToArray[index], copyToFieldPath, getValue);
    });
  } catch (e) {
    return;
  }
  return copyToArray;
}

export function setCreate(object, path, value) {
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

export function set(object, property, value) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("CalculatedField: set() is deprecated, prefer setCreate()");
  }
  object[property] = value;
}

export function get(object, ...properties) {
  return properties.flat().reduce((accumulator, property) => {
    if (accumulator) {
      if (accumulator[property]) {
        return accumulator[property];
      } else if (accumulator[accumulator.length+property]) {
        return accumulator[accumulator.length+property];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }, object);
}

export function percentageDifference(valueAgainst, valueNew) {
  if (!valueAgainst) return;
  let difference = valueNew - valueAgainst;
  return calculateVariance(difference, valueAgainst);
}

export function calculateVariance(value1, value2) {
  let result = (value1 / value2) * 100;

  let variance = Math.round(result * 100) / 100;
  if (isNaN(variance)) return 0;
  return variance;
}

export function combineArrays(array1, array2) {
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
    let formContext = this.props.formContext
    eval(this.props.schema.calculation);
    this.state.formData = formData;
  }

  onChange = formData => {
    let formContext = this.props.formContext
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
